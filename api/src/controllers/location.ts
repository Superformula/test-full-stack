import { fetchLocationInfo } from '../services/mapBox';
import { Logger } from '../utils';
import { ILocationInformation } from '../interfaces';
import errors from '../errors';

export const getLocation = async (
  address: string,
  log: Logger,
): Promise<ILocationInformation> => {
  log.info({ address }, 'Controller.getLocation()');

  try {
    return fetchLocationInfo(address, log);
  } catch (error) {
    if (errors.isBadRequest(error)) {
      throw error;
    }
    if (error.request) {
      throw errors.service('MapBox service failed', error);
    }
    log.error({ error, trace: error.stack }, 'Unknown error');
    throw error.service('Internal error', error);
  }
};
