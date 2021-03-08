import fetch from 'node-fetch';
import { LocationAPI, LocationBasicData } from './location';

const BASE_URL = 'https://api.mapbox.com';
const FORWARD_GEOCODING_SERVICE_URL = 'geocoding/v5/mapbox.places';

export class MapBoxAPI implements LocationAPI {
  constructor() {
    if (!process.env.MAPBOX_ACCESS_TOKEN) {
      throw new Error('MapBox Access token is required');
    }
  }
  async getLocationData(rawAddress: string):Promise<LocationBasicData[]> {
    const url = `${BASE_URL}/${FORWARD_GEOCODING_SERVICE_URL}`;
    const urlWithAddress = `${url}/${encodeURIComponent(rawAddress)}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&autocomplete=true`;
    const response = await fetch(urlWithAddress);
    const data = await response.json();
    const locations:LocationBasicData[] = [];
    const features = data.features || [];
    features.forEach((feature:any) => {
      if (!feature.properties) {
        return;
      }
      locations.push({
        name: feature.properties.place_name,
        category: feature.properties.category,
        isLandmark: !!feature.properties.landmark,
        address: feature.properties.address,
        coordinates: feature.center
      });
    });
    return locations;
  }
}