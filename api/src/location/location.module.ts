import { Module } from '@nestjs/common';

import { LocationResolver } from './resolver/location.resolver';
import { LocationService } from './service/location.service';
import { LocationController } from './controller/location.controller';

@Module({
  providers: [LocationResolver, LocationService],
  controllers: [LocationController],
})
export class LocationModule { }
