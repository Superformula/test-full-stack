import { ErrorFactory, ERROR_TYPE } from './error';
import { AppSyncEvent } from './event';
import { LocationAPI } from './location';
import { MapBoxAPI } from './MapBoxAPI';

export const LocationService:LocationAPI = new MapBoxAPI();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async (event:AppSyncEvent, _context?:any) => {
  if (!event.arguments) {
    return [];
  }
  const { address } = event.arguments;
  try {
    const locations = await LocationService.getLocationData(address);
    return locations;
  } catch (err) {
    const error = ErrorFactory.create(err, event, ERROR_TYPE.ERROR);
    console.log(error);
    return [];
  }
};