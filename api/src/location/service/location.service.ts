import { Injectable } from '@nestjs/common';
import mapboxGeocodeServiceFactory, { GeocodeService } from '@mapbox/mapbox-sdk/services/geocoding';

@Injectable()
export class LocationService {
  readonly geocodeService: GeocodeService;

  constructor() {
    this.geocodeService = mapboxGeocodeServiceFactory({
      accessToken: process.env.MAPBOX_API as string
    });
  }

  public async getGeocodeCoordinates(address: string) {
    const location = await this.geocodeService.forwardGeocode({
      query: address,
      mode: 'mapbox.places',
      limit: 1
    }).send()

    const feat = location.body?.features;
    const coordinates = feat && Array.isArray(feat) && feat[0]?.center;
    const coordinatesFound = coordinates?.length === 2;
    if (!coordinatesFound) throw 'Did not found any coordinate for the following address: ' + address;

    return { lat: coordinates[0], long: coordinates[1] };
  }
}
