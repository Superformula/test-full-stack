import { Module } from '@nestjs/common';

import { LocationResolver } from './resolver/location.resolver';
import { LocationService } from './service/location.service';

@Module({
  providers: [LocationResolver, LocationService],
})
export class LocationModule {}
