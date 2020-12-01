import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Location {
  @Field()
  lat: string;

  @Field()
  long: string;
}
