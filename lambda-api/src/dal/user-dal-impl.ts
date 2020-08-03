import { LocalDate } from '@js-joda/core';
import {
  DynamoDocumentClientProvider,
  DynamoDocumentClientProviderComponent,
} from '../dynamodb/dynamodb-docclient-factory';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { Inject, Service, Token } from 'typedi';
import { CreateUserInput } from '../graphql/create-user-input';
import { LocalDateScalar } from '../graphql/custom-scalars';
import { PageRequest } from '../graphql/page-request';
import { PagedUserResult } from '../graphql/paged-user-result';
import { UpdateUserInput } from '../graphql/update-user-input';
import { User } from '../graphql/user';
import { UserSearchCriteria } from '../graphql/user-search-criteria';
import { createContextLogger, toMeta } from '../logging/logger';
import { decodeCursor, encodeCursor, toCursor } from './fetch-util';
import { UserDal } from './user-dal';
import { v4 as uuidV4 } from 'uuid';
import envConfig from '../envConfig';

const log = createContextLogger({ appModule: 'UserDal' });

export const UserDalComponent = new Token<UserDal>();

const tableNameFragment = { TableName: envConfig.userTableName };

/**
 * User Data Access Layer service
 */
@Service(UserDalComponent)
export class UserDalImpl implements UserDal {
  readonly documentClient: DocumentClient;

  constructor(
    @Inject(DynamoDocumentClientProviderComponent)
    documentClientSupplier: DynamoDocumentClientProvider
  ) {
    this.documentClient = documentClientSupplier?.get();
  }

  /**
   * Build a table/id criteria object for query/delete.
   *
   * @param id The user id of interest
   * @return The object representing the id criteria
   */
  private static buildIdCriteria(id: string): DocumentClient.GetItemInput {
    return {
      ...tableNameFragment,
      Key: { id: id },
    };
  }

  /**
   * Map a user map to a {@link User} including necessary transformation.
   *
   * @param userMap The key/value map containing user data from DynamoDB
   * @return The {@link User} created from the mapped/transformed attribute map
   */
  private static toUser(userMap: DocumentClient.AttributeMap): User {
    return {
      ...userMap,
      dob: LocalDate.parse(userMap.dob),
      createdAt: new Date(Date.parse(userMap.createdAt)),
      updatedAt: new Date(Date.parse(userMap.updatedAt)),
    } as User;
  }

  /**
   * Map an array of result attribute maps representing users in DynamoDB to {@link User}s
   *
   * @param userMapArr
   * @return The array of {@link User} created from the mapped/transformed array of attribute map
   */
  private static toUsers(userMapArr: DocumentClient.AttributeMap[]) {
    return userMapArr.map((curItem) => this.toUser(curItem));
  }

  /**
   * Calculate a fetch size for the give page spec and user search criteria
   *
   * @param pageRequest The page request
   * @param searchCriteria The search criteria
   * @return The fetch size calculated for the input params
   */
  static calculateFetchSize(
    pageRequest: PageRequest,
    searchCriteria: UserSearchCriteria
  ): number {
    // Over fetch when filtering by name since the results are filtered *after* scanning in DynamoDB.  This will
    // allow for less round trips to Dynamo when filtering :/
    return pageRequest.limit * (searchCriteria?.nameFilter ? 5 : 1);
  }

  /**
   * Slice the appropriate result page from the results.  This function will slice starting at the first record
   * for the requested page and clip at the page size.  This is necessary as overfetching is possible while filtering.
   *
   * @param pageRequest The page request specifying the page number and limit
   * @param resultArr The result array to slice
   * @return A sliced copy of the result array
   */
  static slicePageResult<T>(pageRequest: PageRequest, resultArr: T[]): T[] {
    // We may have overfetched when filtering so limit to the actual requested page size by slicing
    return resultArr.slice(0, pageRequest.limit);
  }

  /**
   * Scan for users for a given fetch size and search criteria.  Utilize a start key if provided.
   *
   * @param fetchSize The fetch size for this scan
   * @param searchCriteria The search criteria for this scan (optional)
   * @param startKey The start key for this scan (optional)
   * @return The result of the scan operation
   */
  async scanForUsers(
    fetchSize: number,
    searchCriteria: UserSearchCriteria,
    startKey: DocumentClient.Key
  ) {
    const nameFilterFragment = searchCriteria?.nameFilter
      ? {
          FilterExpression: 'contains(#name, :nameFragment)',
          ExpressionAttributeNames: {
            '#name': 'name',
          },
          ExpressionAttributeValues: {
            ':nameFragment': searchCriteria.nameFilter,
          },
        }
      : {};

    const startKeyFragment = startKey ? { ExclusiveStartKey: startKey } : {};

    // Filter during scanning - note that the data is filtered *after* the scan/limit operation so the result set
    // size can be less that the requested fetch size when filtering by UserSearchCriteria.
    const params = {
      ...tableNameFragment,
      IndexName: envConfig.userTableNameIndex,
      ReturnConsumedCapacity: 'TOTAL',
      Limit: fetchSize,
      // results are filtered *after* scanning in DynamoDB so overfetch to try to hit the intended page size in one scan
      ...startKeyFragment,
      ...nameFilterFragment,
    };

    return await this.documentClient.scan(params).promise();
  }

  /**
   * Scan for users in batches until either the requested page size is satisfied or no more results are found
   *
   * @param initialCursorValue Initial cursor value for the first scan
   * @param searchCriteria The search criteria for this scan (optional)
   * @param pageRequest The page request for this batch scan
   * @param batchFetchSize The fetch size per batch
   */
  async batchScanForUsers(
    initialCursorValue: DocumentClient.Key,
    searchCriteria: UserSearchCriteria,
    pageRequest: PageRequest,
    batchFetchSize: number
  ) {
    // Loop and fetch in batches until we hit the requested page size or run out of data
    const scannedResults = [];
    let hasMoreData = true;
    let iter = 1;
    let lastEvaluatedKey = initialCursorValue;
    while (hasMoreData && scannedResults.length < pageRequest.limit) {
      log.debug(
        `Scanning for results to satisfy limit - attempt ${iter} - lastEvaluatedKey is ${
          lastEvaluatedKey && JSON.stringify(lastEvaluatedKey)
        }`
      );

      // Scan and continue where we left off on the previous pass through this loop
      const currScanRes = await this.scanForUsers(
        batchFetchSize,
        searchCriteria,
        lastEvaluatedKey
      );
      scannedResults.push(...currScanRes.Items);

      // Keep track of the last evaluated key for the current batch
      lastEvaluatedKey = currScanRes.LastEvaluatedKey;

      log.debug(
        `Last evaluated key: ${
          lastEvaluatedKey && JSON.stringify(lastEvaluatedKey)
        }`
      );

      if (!lastEvaluatedKey) {
        hasMoreData = false;
      }
      iter++;
    }
    return scannedResults;
  }

  /**
   * Find users by search criteria and paging specification.
   *
   * This implementation utilizes a cursor so as to not perform full table scans in order to page data.
   *
   * @param searchCriteria The search criteria to use (optional)
   * @param pageRequest The page specification to use (optional)
   * @return A {@link PagedUserResult} containing the page of results and page information
   */
  async find(
    searchCriteria: UserSearchCriteria,
    pageRequest: PageRequest = { cursor: undefined, limit: 10 }
  ): Promise<PagedUserResult> {
    // If a cursor is passed, base64 decode it
    const cursorVal = decodeCursor(pageRequest.cursor);

    log.debug(`Name filter: "${searchCriteria?.nameFilter ?? ''}"`);
    log.debug(`Request limit: ${pageRequest.limit} cursor value: ${cursorVal}`);

    // Calculate the fetch size - small optimization when scanning for partial key matches as DynamoDB filters
    // after fetching a page of data
    const calculatedFetchSize = UserDalImpl.calculateFetchSize(
      pageRequest,
      searchCriteria
    );
    log.debug(`fetch size is ${calculatedFetchSize}`);

    const scannedResults = await this.batchScanForUsers(
      cursorVal,
      searchCriteria,
      pageRequest,
      calculatedFetchSize
    );

    // Slice the results to only return the requested page size
    const pageResults = UserDalImpl.slicePageResult(
      pageRequest,
      scannedResults
    );
    log.debug(
      `Found returned from scan: ${scannedResults.length} results: ${pageResults.length}`
    );

    const isLastPage = pageResults.length < pageRequest.limit;
    const count = pageResults.length;
    const values = UserDalImpl.toUsers(pageResults);
    const lastUser = count > 0 && values[values.length - 1];

    // Base64 encode the cursor before returning to the user
    const cursor = count > 0 ? encodeCursor(toCursor(lastUser)) : undefined;

    return {
      isLastPage,
      count,
      values,
      cursor,
    };
  }

  /**
   * Find a user by id.
   *
   * @param id The user id of interest
   * @return The {@link User} if found, undefined otherwise
   */
  async findOne(id: string): Promise<User | undefined> {
    const res = await this.documentClient
      .get(UserDalImpl.buildIdCriteria(id))
      .promise();
    return res?.Item?.id ? UserDalImpl.toUser(res.Item) : undefined;
  }

  /**
   * Create a user
   *
   * @param createUserInput The create user input - an id will be assigned at creation time.
   * @return The created {@link User}
   */
  async create(createUserInput: CreateUserInput): Promise<User> {
    const nowStr = new Date().toISOString();
    const newUser = {
      ...tableNameFragment,
      Item: {
        id: uuidV4(),
        ...createUserInput,
        dob: LocalDateScalar.serialize(createUserInput.dob),
        createdAt: nowStr,
        updatedAt: nowStr,
      },
    };

    // Put is destructive so no need to protect against creating more than once - last one in wins
    await this.documentClient.put(newUser).promise();

    //...and fetch it back since the new values aren't returned
    return await this.findOne(newUser.Item.id);
  }

  /**
   * Update a user
   *
   * @param updateUserInput The update user input.
   * @return The updated {@link User}
   */
  async update(updateUserInput: UpdateUserInput): Promise<User> {
    // The put API will overwrite the object entirely if the key exists, so fetch the previous version so we can
    // spread the previous object values to fill in the holes
    const oldUser = await this.findOne(updateUserInput.id);

    if (!oldUser) {
      throw new Error(
        `User to be updated does not exist for id ${updateUserInput.id}`
      );
    }

    const updateUser = {
      ...tableNameFragment,
      Item: {
        ...oldUser,
        ...updateUserInput,
        dob: LocalDateScalar.serialize(updateUserInput.dob),
        createdAt: oldUser.createdAt.toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    await this.documentClient.put(updateUser).promise();

    //...and fetch it back since the new values aren't returned
    return await this.findOne(updateUserInput.id);
  }

  /**
   * Delete a user
   *
   * @param id The user id to delete
   * @return true if found and deleted, false otherwise
   */
  async delete(id: string): Promise<boolean> {
    try {
      await this.documentClient
        .delete(UserDalImpl.buildIdCriteria(id))
        .promise();
      return true;
    } catch (e) {
      log.error(`Error deleting user for id ${id}`, toMeta(e));
      return false;
    }
  }
}
