import { GeocodeResult } from "../graphql/geocode-result";

export interface GeocodeService {
  geocodeAddress: (address: string) => Promise<GeocodeResult>;
}
