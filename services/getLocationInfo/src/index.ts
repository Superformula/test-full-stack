import { MapBoxAPI } from './MapBoxAPI';

const LocationService = new MapBoxAPI();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async (event:any, _context:any) => {
  const { address } = (event.arguments || {});
  try {
    const locations = await LocationService.getLocationData(address);
    return locations;
  } catch (err) {
    console.log(err);
    return [];
  }
};