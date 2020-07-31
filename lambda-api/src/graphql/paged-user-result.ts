import { ObjectType } from 'type-graphql';
import PagedResult from './paged-result';
import { User } from './user';

@ObjectType({ description: 'Page of User data' })
export class PagedUserResult extends PagedResult(User) {}
