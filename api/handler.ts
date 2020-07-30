import { Logger } from './src/utils';
import { getLocation } from './src/controllers/location';

export const locationHandler = async (event: any) => {
  const log = new Logger();
  log.info({ event }, 'getLocation Handler!');

  try {
    const { address } = event;
    return getLocation(address, log);
  } catch (error) {
    log.error({ error }, 'Location handler failed');
    throw error;
  }
};
