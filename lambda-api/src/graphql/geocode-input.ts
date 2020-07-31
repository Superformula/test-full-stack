import { Field, InputType } from 'type-graphql';

@InputType('GeocodeInput', {
  description: 'Object that represents geocoding request',
})
export class GeocodeInput {
  @Field({ nullable: false, description: 'Address to geocode' })
  address: string;
}
