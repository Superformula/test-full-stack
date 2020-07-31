import { Service, Token } from "typedi";
import envConfig from "../envConfig";
import { GeocodeResult } from "../graphql/geocode-result";
import { createContextLogger, toMeta } from "../logging/logger";
import { GeocodeService } from "./geocode-service";
import mapboxGeocodeServiceFactory, {
  GeocodeService as MapboxGeocodeService,
} from "@mapbox/mapbox-sdk/services/geocoding";
import retry from "async-retry";

const log = createContextLogger({ appModule: "GeocodeService" });

export const GeocodeServiceComponent = new Token<GeocodeService>();

/**
 * User Data Access Layer service
 */
@Service(GeocodeServiceComponent)
export class GeocodeServiceImpl implements GeocodeService {
  readonly mapboxGeocodeService: MapboxGeocodeService;

  constructor() {
    this.mapboxGeocodeService = mapboxGeocodeServiceFactory({
      accessToken: envConfig.mapboxApiToken,
    });
  }

  async geocodeAddress(address: string): Promise<GeocodeResult> {
    try {
      // Retry up to the configured amount of attempts
      const res = await retry(
        async () => {
          return await this.mapboxGeocodeService
            .forwardGeocode({
              query: address,
              mode: "mapbox.places",
              limit: 1,
            })
            .send();
        },
        {
          retries: envConfig.mapboxApiRequestRetries,
          onRetry: (_e, attempt) =>
            attempt > 1 &&
            log.error(
              `Error during last attempt - retrying attempt ${attempt} for geocode operation`
            ),
        }
      );

      const match = res.body;
      const features = match?.features;
      const coordinates =
        features && Array.isArray(features) && features[0]?.center;

      if (log.isDebugEnabled()) {
        log.debug(JSON.stringify(coordinates));
      }

      const coordinatesFound = coordinates?.length === 2;

      if (!coordinatesFound) {
        log.error(
          `Coordinates not returned for address ${address}: match: ${JSON.stringify(
            match
          )}`
        );
        return {
          error: `Coordinates not returned for address ${address}`,
        };
      }

      return {
        longitude: coordinates[0],
        latitude: coordinates[1],
      };
    } catch (e) {
      log.error(`Error geocoding address ${address}`, toMeta(e));
      throw e;
    }
  }
}
