import Fetch from 'node-fetch';
import { LocationAPI, LocationBasicData } from './location';

if (!process.env.MAPBOX_ACCESS_TOKEN) {
  throw new Error('MapBox Access token is required');
}

const BASE_URL = 'https://api.mapbox.com';
const FORWARD_GEOCODING_SERVICE_URL = 'geocoding/v5/mapbox.places';

export class MapBoxAPI implements LocationAPI {
  async getLocationData(rawAddress: string):Promise<LocationBasicData[]> {
    const url = `${BASE_URL}/${FORWARD_GEOCODING_SERVICE_URL}`;
    const urlWithAddress = `${url}/${encodeURIComponent(rawAddress)}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&autocomplete=true`;
    const response = await Fetch(urlWithAddress);
    const data = await response.json();
    const locations:LocationBasicData[] = [];
    const features = data.features || [];
    features.slice(0, 10).forEach((feature:any) => {
      const properties = feature.properties || {};
      locations.push({
        name: properties.place_name,
        category: properties.category,
        isLandmark: !!properties.landmark,
        address: properties.address,
        coordinates: feature.center
      });
    });
    return locations;
  }
}