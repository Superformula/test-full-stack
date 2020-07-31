import { InputType } from 'type-graphql';
import { BaseUser } from './user';

@InputType({
  description: 'Object that represents a user creation request',
})
export class CreateUserInput extends BaseUser {}
