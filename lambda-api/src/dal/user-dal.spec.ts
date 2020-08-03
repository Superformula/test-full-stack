import { mock, mockReset } from 'jest-mock-extended';
const mockLogger = mock<Logger>();
jest.mock('../logging/logger', () => ({
  createContextLogger: (_ctx) => mockLogger,
  toMeta: jest.requireActual('../logging/logger').toMeta,
}));
import { Logger } from 'winston';
import { DynamoDocumentClientProvider } from '../dynamodb/dynamodb-docclient-factory';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import envConfig from '../envConfig';
import { userFactory } from '../test-fixtures/user-generator';
import * as AWSMock from 'aws-sdk-mock';
import * as AWS from 'aws-sdk';

import { UserDalImpl } from './user-dal-impl';

// eslint-disable-next-line
const buildScanFragment = (fetchSize): any => ({
  TableName: envConfig.userTableName,
  IndexName: envConfig.userTableNameIndex,
  ReturnConsumedCapacity: 'TOTAL',
  Limit: fetchSize,
});

class FakeDocumentClientSupplier extends DynamoDocumentClientProvider {
  public get(): DocumentClient {
    return new AWS.DynamoDB.DocumentClient();
  }
}

describe('user-dal tests', () => {
  beforeEach(() => {
    mockReset(mockLogger);

    AWSMock.setSDKInstance(AWS);
  });

  it('test calculateFetchSize', () => {
    expect(UserDalImpl.calculateFetchSize({ limit: 20 }, undefined)).toEqual(
      20
    );
    expect(
      UserDalImpl.calculateFetchSize({ limit: 20 }, { nameFilter: 'joe' })
    ).toEqual(100);
  });

  it('test slicePageResult', () => {
    const limit = 9;
    const res1 = UserDalImpl.slicePageResult({ limit }, [...Array(10).keys()]);
    expect(res1[res1.length - 1]).toEqual(limit - 1);

    const res2 = UserDalImpl.slicePageResult({ limit }, [...Array(23).keys()]);
    expect(res2[res2.length - 1]).toEqual(limit - 1);
  });

  it('test scanForUsers no name filter no start key', async () => {
    const scanParams = buildScanFragment(10);
    const expected = userFactory.buildList(10);

    AWSMock.mock('DynamoDB.DocumentClient', 'scan', function (
      params,
      callback
    ) {
      expect(params).toEqual(scanParams);
      callback(null, { Items: expected });
    });

    const testedApi = new UserDalImpl(new FakeDocumentClientSupplier());

    const res = await testedApi.scanForUsers(10, undefined, undefined);

    expect(res.Items).toEqual(expected);

    AWSMock.restore('DynamoDB.DocumentClient', 'scan');
  });

  it('test scanForUsers start key', async () => {
    const startKeyCursor = { some: 'Cursor' };
    const scanParams = {
      ...buildScanFragment(10),
      ExclusiveStartKey: startKeyCursor,
    };
    const expected = userFactory.buildList(10);

    AWSMock.mock('DynamoDB.DocumentClient', 'scan', function (
      params,
      callback
    ) {
      expect(params).toEqual(scanParams);
      callback(null, { Items: expected });
    });

    const testedApi = new UserDalImpl(new FakeDocumentClientSupplier());

    const res = await testedApi.scanForUsers(10, undefined, startKeyCursor);

    expect(res.Items).toEqual(expected);

    AWSMock.restore('DynamoDB.DocumentClient', 'scan');
  });

  it('test scanForUsers start key and filter', async () => {
    const startKeyCursor = { some: 'Cursor' };
    const searchCriteria = { nameFilter: 'joe' };
    const scanParams = {
      ...buildScanFragment(10),
      ExclusiveStartKey: startKeyCursor,

      FilterExpression: 'contains(#name, :nameFragment)',
      ExpressionAttributeNames: {
        '#name': 'name',
      },
      ExpressionAttributeValues: {
        ':nameFragment': searchCriteria.nameFilter,
      },
    };
    const expected = userFactory.buildList(10);

    AWSMock.mock('DynamoDB.DocumentClient', 'scan', function (
      params,
      callback
    ) {
      expect(params).toEqual(scanParams);
      callback(null, { Items: expected });
    });

    const testedApi = new UserDalImpl(new FakeDocumentClientSupplier());

    const res = await testedApi.scanForUsers(
      10,
      searchCriteria,
      startKeyCursor
    );

    expect(res.Items).toEqual(expected);

    AWSMock.restore('DynamoDB.DocumentClient', 'scan');
  });

  it('test batchScanForUsers - uneven batch', async () => {
    const batch1 = userFactory.buildList(10);
    const batch2 = userFactory.buildList(3);
    const cursor = 'abc123';

    let iter = 0;
    AWSMock.mock('DynamoDB.DocumentClient', 'scan', function (
      _params,
      callback
    ) {
      callback(null, {
        Items: iter == 0 ? batch1 : batch2,
        LastEvaluatedKey: iter == 0 ? cursor : undefined,
      });
      iter++;
    });

    const tested = new UserDalImpl(new FakeDocumentClientSupplier());

    const spied = jest.spyOn(tested, 'scanForUsers');

    const res = await tested.batchScanForUsers(
      undefined,
      undefined,
      { limit: 20 },
      10
    );

    expect(res).toEqual(batch1.concat(batch2));
    expect(spied.mock.calls[0][2]).toBeUndefined();
    expect(spied.mock.calls[1][2]).toEqual(cursor);

    AWSMock.restore('DynamoDB.DocumentClient', 'scan');
  });

  it('test batchScanForUsers - exact batch', async () => {
    const batch1 = userFactory.buildList(10);

    AWSMock.mock('DynamoDB.DocumentClient', 'scan', function (
      _params,
      callback
    ) {
      callback(null, {
        Items: batch1,
      });
    });

    const tested = new UserDalImpl(new FakeDocumentClientSupplier());

    const res = await tested.batchScanForUsers(
      undefined,
      undefined,
      { limit: 10 },
      10
    );

    expect(res).toEqual(batch1);

    AWSMock.restore('DynamoDB.DocumentClient', 'scan');
  });
});
