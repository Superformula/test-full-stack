import { LocalDate } from '@js-joda/core';
import { Field, InputType, ObjectType } from 'type-graphql';
import { UserModel } from '../model';
import { LocalDateScalar } from './custom-scalars';

@InputType()
@ObjectType({ isAbstract: true })
export abstract class BaseUser implements Partial<UserModel> {
  @Field({ nullable: false, description: 'User name' })
  name: string;
  @Field((_type) => LocalDateScalar, {
    nullable: false,
    description: 'User date of birth - ISO 8601 format',
  })
  dob: LocalDate;
  @Field({ nullable: false, description: 'User address' })
  address: string;
  @Field({ nullable: false, description: 'User description' })
  description: string;
}

/**
 * Class representing a {@link User} decorated with type-graphql
 * in order to perform model-driven schema generation.
 */
@ObjectType('User', { description: 'Object that represents a user' })
export class User extends BaseUser implements UserModel {
  @Field({ nullable: false, description: 'User id' })
  id: string;
  @Field((_type) => Date, {
    nullable: false,
    description: 'Created at timestamp - ISO 8601 format',
  })
  createdAt: Date;
  @Field((_type) => Date, {
    nullable: false,
    description: 'Updated timestamp - ISO 8601 format',
  })
  updatedAt: Date;
}

export type UserCursor = Pick<User, 'name' | 'id' | 'createdAt'>;
