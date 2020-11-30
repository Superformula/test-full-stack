import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserStatus } from './user.enum';
import { CreateUserInput } from './create-user.input';

export type UserKey = {
  id: string;
};

@ObjectType({ implements: CreateUserInput })
export class User extends CreateUserInput {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field(() => UserStatus)
  status: UserStatus;
}
