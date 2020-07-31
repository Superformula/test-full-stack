import { Field, InputType } from 'type-graphql';

/**
 * Class representing a page request.
 */
@InputType('UserSearchCriteria', {
  description: 'Object that represents user search criteria',
})
export class UserSearchCriteria {
  @Field({ nullable: true, description: 'Filter on partial or full user name' })
  nameFilter?: string;
}
