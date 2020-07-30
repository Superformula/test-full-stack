const {
  LOG_ENABLED,
  LOG_LEVEL,

  MAPBOX_API_TOKEN,
} = process.env;

export default {
  log: {
    enabled: LOG_ENABLED === 'true',
    level: LOG_LEVEL,
  },
  mapBox: {
    accessToken: MAPBOX_API_TOKEN,
  },
};
