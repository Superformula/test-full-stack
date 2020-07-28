import { Service, Token } from 'typedi';
import { CreateUserInput } from '../graphql/create-user-input';
import { PageRequest } from '../graphql/page-request';
import { PagedUserResult } from '../graphql/paged-user-result';
import { UpdateUserInput } from '../graphql/update-user-input';
import { UserSearchCriteria } from '../graphql/user-search-criteria';
import { User } from '../graphql/user';
import { createContextLogger } from '../logging/logger';
import { resInvAllocationByExternalIdInputFactory } from '../test-fixtures/user-generator';
import { UserDal } from './user-dal';

const log = createContextLogger({ appModule: 'UserDal' });

export const UserDalComponent = new Token<UserDal>();

@Service(UserDalComponent)
export class UserDalImpl implements UserDal {
  async find(searchCriteria: UserSearchCriteria, pageRequest: PageRequest): Promise<PagedUserResult> {
    log.info(`Name filter: ${searchCriteria?.nameFilter}`);

    const values = resInvAllocationByExternalIdInputFactory.buildList(pageRequest.limit);

    return {
      nextToken: 'abc123',
      isLastPage: false,
      values,
    };
  }

  async findOne(id: string): Promise<User> {
    return resInvAllocationByExternalIdInputFactory.build();
  }

  async create(createUserInput: CreateUserInput) {
    return {
      id: 'abc123',
      ...createUserInput,
    };
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    return {
      id: 'abc123',
      ...updateUserInput,
    };
  }

  async delete(id: string): Promise<boolean> {
    return true;
  }
}
