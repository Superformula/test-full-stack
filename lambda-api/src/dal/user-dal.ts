import { CreateUserInput } from "../graphql/create-user-input";
import { PageRequest } from "../graphql/page-request";
import { PagedUserResult } from "../graphql/paged-user-result";
import { UpdateUserInput } from "../graphql/update-user-input";
import { UserSearchCriteria } from "../graphql/user-search-criteria";
import { User } from "../graphql/user";

export interface UserDal {
  /**
   * Find users by search criteria and paging specification.
   *
   * @param searchCriteria The search criteria to use (optional)
   * @param pageRequest The page specification to use (optional)
   * @return A {@link PagedUserResult} containing the page of results and page information
   */
  find(
    searchCriteria: UserSearchCriteria,
    pageRequest: PageRequest
  ): Promise<PagedUserResult>;

  /**
   * Find a user by id.
   *
   * @param id The user id of interest
   * @return The {@link User} if found, undefined otherwise
   */
  findOne(id: string): Promise<User | undefined>;

  /**
   * Create a user
   *
   * @param createUserInput The create user input - an id will be assigned at creation time.
   * @return The created {@link User}
   */
  create(createUserInput: CreateUserInput): Promise<User>;

  /**
   * Update a user
   *
   * @param updateUserInput The update user input.
   * @return The updated {@link User}
   */
  update(updateUserInput: UpdateUserInput): Promise<User>;

  /**
   * Delete a user
   *
   * @param id The user id to delete
   * @return true if found and deleted, false otherwise
   */
  delete(id: string): Promise<boolean>;
}
