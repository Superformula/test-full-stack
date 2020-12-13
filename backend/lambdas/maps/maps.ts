import axios from 'axios';
import {
  AddressLocation,
  AddressSuggestion,
  GetCoordinatesArgument,
  PlaceDetailsResponse,
  PlacePrediction,
  PlacesApiResponse,
  SearchAddressArgument,
} from './types';
require('dotenv').config();

const baseUrl = 'https://maps.googleapis.com/maps/api/place';

const suggestionsEndpoint = `${baseUrl}/autocomplete/json`;
const detailsEndpoint = `${baseUrl}/details/json`;

const KEY = process.env.GMAPS_KEY;

export const getAddressSuggestions = async (input: string): Promise<AddressSuggestion[]> => {
  const { data } = await axios.get<PlacesApiResponse>(suggestionsEndpoint, {
    params: {
      input: input,
      type: 'address',
      language: 'en-US',
      key: KEY,
    },
  });

  //OK and ZERO_RESULTS are the only successful status according to the documentation, so the lambda should fail fast
  //It is worth nothing that google replies with HTTP OK even when it rejects requests for known reasons
  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    console.error('Address Suggestion API returned an error:', data);
    throw new Error(`Address Suggestion API returned an error status: ${data.status}`);
  }

  if (data.status === 'ZERO_RESULTS') return [];

  return data.predictions.map(
    (p: PlacePrediction): AddressSuggestion => ({
      description: p.description,
      placeId: p.place_id,
    }),
  );
};

export const getCoordinates = async (placeId: string): Promise<AddressLocation> => {
  const { data } = await axios.get<PlaceDetailsResponse>(detailsEndpoint, {
    params: {
      placeid: placeId,
      key: KEY,
    },
  });

  //When fetching coordinates, a ZERO_RESULTS also means error because the place no longer exists
  if (data.status !== 'OK') {
    console.error('Places detail API returned an error:', data);
    throw new Error(`Places detail API returned an error status: ${data.status}`);
  }

  if (!data.result || !data.result.geometry || !data.result.geometry.location) {
    const err = `Place with id ${placeId} does not contain a geolocation:`;
    console.error(`${err}:`, data);
    throw new Error(err);
  }

  return {
    latitude: data.result.geometry.location.lat,
    longitude: data.result.geometry.location.lng,
  };
};
