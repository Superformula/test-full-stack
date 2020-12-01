import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Location {
  @Field()
  lat: number;

  @Field()
  long: number;
}
