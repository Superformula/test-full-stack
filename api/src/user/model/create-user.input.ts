import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType, InterfaceType } from '@nestjs/graphql';

@InputType()
@InterfaceType('BaseUser')
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  dob: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  address: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  description: string;
}
