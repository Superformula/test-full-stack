import axios from 'axios';
import Config from '../../config';
import errors from '../../errors';
import { IMapBoxResponse, ILocationInformation } from '../../interfaces';
import { handleMapBoxException, Logger } from '../../utils';

/**
 * Fetch location information from the MapBox api based on address
 *
 * @param {String} address
 * @param {Logger} log Application Logger
 * @returns {Promise<ILocationInformation>}
 */
export const fetchLocationInfo = async (
  address: String,
  log: Logger,
): Promise<ILocationInformation> => {
  log.info({ address }, 'MapBox.getLocation()');

  try {
    // create search text escape the address information
    const searchText = escape(`${address}.json`);
    // build the api path with the search text
    const path = `${Config.mapBox.endpoints.places}${searchText}`;
    // call the api to get location information
    const { data } = await axios.get<IMapBoxResponse>(path, {
      baseURL: Config.mapBox.baseUrl,
      params: {
        access_token: Config.mapBox.accessToken,
      },
    });

    // if no features are returned, throw a not found exception
    if (!data.features.length) {
      throw errors.notFound('No location found based on address');
    }

    // get the first item in the features array (the most relevant)
    const mostRelevantFeature = data.features[0];

    // return the location information
    return {
      geometry: mostRelevantFeature.geometry,
    } as ILocationInformation;
  } catch (error) {
    log.error({ stack: error.stack }, 'MapBox request failed');
    if (error.response) {
      throw handleMapBoxException(error);
    }
    throw error;
  }
};
