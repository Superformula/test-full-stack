import Fetch, { RequestInfo } from 'node-fetch';
import { LocationAPI, LocationBasicData } from './location';

if (!process.env.MAPBOX_ACCESS_TOKEN) {
  throw new Error('MapBox Access token is required');
}

const BASE_URL = 'https://api.mapbox.com';
const FORWARD_GEOCODING_SERVICE_URL = 'geocoding/v5/mapbox.places';

export class MapBoxAPI implements LocationAPI {
  async getLocationData(rawAddress: string):Promise<LocationBasicData[]> {
    const url = `${BASE_URL}/${FORWARD_GEOCODING_SERVICE_URL}`;
    const urlWithAddress = `${url}/${encodeURI(rawAddress)}?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&autocomplete=true`;
    const response = await Fetch({ url: urlWithAddress } as RequestInfo);
    const data = await response.json();
    const locations:LocationBasicData[] = [];
    try {
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
    } catch (err) {
      console.log(err);
    }
    return locations;
  }
}