const fetch = require('node-fetch');
const Sentry = require('@sentry/serverless');

const { MAPBOX_ACCESS_TOKEN, SENTRY_DSN } = process.env;
const mapboxBaseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

Sentry.AWSLambda.init({ dsn: SENTRY_DSN });

exports.handler = async ({ address }) => {
  try {
    const searchText = escape(`${address}.json`);
    const response = await fetch(
      `${mapboxBaseUrl}${searchText}?access_token=${MAPBOX_ACCESS_TOKEN}`,
    );
    const data = await response.json();

    if (!Array.isArray(data.features) || !data.features.length) {
      return null;
    }

    const [firstFeature] = data.features;
    return firstFeature && firstFeature.geometry ? firstFeature.geometry : null;
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
};
