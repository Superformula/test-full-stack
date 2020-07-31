import { Field, ObjectType } from 'type-graphql';

@ObjectType('GeocodeResult', {
  description: 'Object that represents a geocoding result',
})
export class GeocodeResult {
  @Field((_type) => String, { nullable: true, description: 'Latitude' })
  latitude?: string;
  @Field((_type) => String, { nullable: true, description: 'Longitude' })
  longitude?: string;
  @Field((_type) => String, {
    nullable: true,
    description: 'Error during geocoding attempt - null if no errors',
  })
  error?: string;
}
