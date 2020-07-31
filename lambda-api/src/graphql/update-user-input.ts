import { Field, InputType } from 'type-graphql';
import { BaseUser } from './user';

@InputType('UpdateUserInput', { description: 'Object that represents a user update request' })
export class UpdateUserInput extends BaseUser {
  @Field({ nullable: false, description: 'User id' })
  id: string;
}
