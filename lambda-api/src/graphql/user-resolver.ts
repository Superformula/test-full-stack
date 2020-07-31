import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { UserDal } from "../dal/user-dal";
import { UserDalComponent } from "../dal/user-dal-impl";
import { createContextLogger, toMeta } from "../logging/logger";
import { CreateUserInput } from "./create-user-input";
import { PageRequest } from "./page-request";
import { PagedUserResult } from "./paged-user-result";
import { ScalarBooleanResult } from "./scalar-result";
import { UpdateUserInput } from "./update-user-input";
import { User } from "./user";
import { UserSearchCriteria } from "./user-search-criteria";

const log = createContextLogger({ appModule: "UserResolver" });

@Service()
@Resolver()
export class UserResolver {
  private readonly userDal: UserDal;

  constructor(@Inject(UserDalComponent) userDal: UserDal) {
    this.userDal = userDal;
  }

  @Query((_returns) => PagedUserResult, {
    description: "Find users optionally by name filter and page specification",
  })
  async users(
    @Arg("searchCriteria", { nullable: true })
    searchCriteria: UserSearchCriteria,
    @Arg("pageRequest", { nullable: true })
    pageRequest: PageRequest = { limit: 10 }
  ): Promise<PagedUserResult> {
    try {
      return await this.userDal.find(searchCriteria, pageRequest);
    } catch (e) {
      // eslint-disable-next-line max-len
      log.error(
        `Error finding users searchCriteria: ${
          searchCriteria ? JSON.stringify(searchCriteria) : ""
        } pageRequest: ${pageRequest ? JSON.stringify(pageRequest) : ""}`,
        toMeta(e)
      );
      throw e;
    }
  }

  @Query((_returns) => User, {
    description: "Find a user by id",
    nullable: true,
  })
  async user(
    @Arg("id", { nullable: false, description: "The id of the user to find" })
    id: string
  ): Promise<User | undefined> {
    try {
      return await this.userDal.findOne(id);
    } catch (e) {
      log.error(`Error finding user by id ${id}`, toMeta(e));
      throw e;
    }
  }

  @Mutation((_returns) => User, { description: "Create a user" })
  async createUser(
    @Arg("createUserInput", { nullable: false })
    createUserInput: CreateUserInput
  ): Promise<User> {
    try {
      return await this.userDal.create(createUserInput);
    } catch (e) {
      log.error(
        `Error creating user ${JSON.stringify(createUserInput)}`,
        toMeta(e)
      );
      throw e;
    }
  }

  @Mutation((_returns) => User, { description: "Update a user" })
  async updateUser(
    @Arg("updateUserInput", { nullable: false })
    updateUserInput: UpdateUserInput
  ): Promise<User> {
    try {
      return await this.userDal.update(updateUserInput);
    } catch (e) {
      log.error(
        `Error updating user ${JSON.stringify(updateUserInput)}`,
        toMeta(e)
      );
      throw e;
    }
  }

  @Mutation((_returns) => ScalarBooleanResult, { description: "Delete a user" })
  async deleteUser(
    @Arg("id", { nullable: false })
    id: string
  ): Promise<ScalarBooleanResult> {
    try {
      return { value: Boolean(await this.userDal.delete(id)) };
    } catch (e) {
      log.error(`Error deleting user ${id}`, toMeta(e));
      throw e;
    }
  }
}
