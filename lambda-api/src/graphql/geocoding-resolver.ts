import { Arg, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';
import { GeocodeService } from '../geocode/geocode-service';
import { GeocodeServiceComponent } from '../geocode/geocode-service-impl';
import { createContextLogger, toMeta } from '../logging/logger';
import { GeocodeInput } from './geocode-input';
import { GeocodeResult } from './geocode-result';

const log = createContextLogger({ appModule: 'GeocodingResolver' });

@Service()
@Resolver()
export class GeocodingResolver {
  private readonly geocodeService: GeocodeService;

  constructor(@Inject(GeocodeServiceComponent) geocodeService: GeocodeService) {
    this.geocodeService = geocodeService;
  }

  @Query((_returns) => GeocodeResult, {
    description: 'Geocode an address',
  })
  async geocode(
    @Arg('geocodeInput', { nullable: false })
    geocodeInput: GeocodeInput
  ): Promise<GeocodeResult> {
    try {
      return await this.geocodeService.geocodeAddress(geocodeInput.address);
    } catch (e) {
      // eslint-disable-next-line max-len
      log.error(`Error geocoding address: ${geocodeInput.address}`, toMeta(e));
      throw e;
    }
  }
}
