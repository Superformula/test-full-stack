import { Location } from '../model/location.model';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { GetLocationInput } from '../model/get-location.input';
import { LocationService } from '../service/location.service';

@Resolver()
export class LocationResolver {
  constructor(private readonly locationService: LocationService) { }

  @Query(() => Location)
  public async getLocation(@Args('input') input: GetLocationInput) {
    return this.locationService.getGeocodeCoordinates(input.address);
  }
}
