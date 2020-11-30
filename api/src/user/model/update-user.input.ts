import { Field, InputType } from '@nestjs/graphql';

import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  description: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  address: string;

  // TODO: if we want to implement a logic/soft delete we can toggle the status between active and inactive
  // @Field(() => UserStatus)
  // status?: UserStatus;
}
