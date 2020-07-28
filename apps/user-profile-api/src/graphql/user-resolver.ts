import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Container, Inject, Service } from 'typedi';
import { UserDal } from '../dal/user-dal';
import { UserDalComponent, UserDalImpl } from '../dal/user-dal-impl';
import { createContextLogger } from '../logging/logger';
import { CreateUserInput } from './create-user-input';
import { PageRequest } from './page-request';
import { PagedUserResult } from './paged-user-result';
import { ScalarBooleanResult } from './scalar-result';
import { UpdateUserInput } from './update-user-input';
import { User } from './user';
import { UserSearchCriteria } from './user-search-criteria';

const log = createContextLogger({ appModule: 'UserResolver' });

log.info('container has it ' + Container.has(UserDalImpl));

@Service()
@Resolver()
export class UserResolver {
  private readonly userDal: UserDal;

  constructor(@Inject(UserDalComponent) userDal: UserDal) {
    this.userDal = userDal;
  }

  @Query((_returns) => PagedUserResult, {
    description: 'Find users optionally by name filter and page specification',
  })
  async users(
    @Arg('searchCriteria', { nullable: true })
    searchCriteria: UserSearchCriteria,
    @Arg('pageRequest', { nullable: true })
    pageRequest: PageRequest = { limit: 10 }
  ): Promise<PagedUserResult> {
    return this.userDal.find(searchCriteria, pageRequest);
  }

  @Query((_returns) => User, { description: 'Find a user by id' })
  async user(
    @Arg('id', { nullable: false, description: 'The id of the user to find' })
    id: string
  ): Promise<User | null> {
    return this.userDal.findOne(id);
  }

  @Mutation((_returns) => User, { description: 'Create a user' })
  async createUser(
    @Arg('createUserInput', { nullable: false })
    createUserInput: CreateUserInput
  ): Promise<User> {
    return this.userDal.create(createUserInput);
  }

  @Mutation((_returns) => User, { description: 'Update a user' })
  async updateUser(
    @Arg('updateUserInput', { nullable: false })
    updateUserInput: UpdateUserInput
  ): Promise<User> {
    return this.userDal.update(updateUserInput);
  }

  @Mutation((_returns) => ScalarBooleanResult, { description: 'Delete a user' })
  async deleteUser(
    @Arg('id', { nullable: false })
    id: string
  ): Promise<ScalarBooleanResult> {
    return { value: Boolean(this.userDal.delete(id)) };
  }
}
