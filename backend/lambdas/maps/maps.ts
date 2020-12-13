import axios from 'axios';
import { AddressLocation, AddressSuggestions, PlaceDetailsResponse, PlacePrediction, PlacesApiResponse } from './types';
import * as fs from 'fs';
import { AppSyncResolverEvent } from 'aws-lambda';
import { GetCoordinatesArgument, SearchAddressArgument } from '../elasticWriter/types';

require('dotenv').config();

const baseUrl = 'https://maps.googleapis.com/maps/api/place';

const suggestionsEndpoint = `${baseUrl}/autocomplete/json`;
const detailsEndpoint = `${baseUrl}/details/json`;

const KEY = process.env.GMAPS_KEY;

export const getAddressSuggestions = async (
  evt: AppSyncResolverEvent<SearchAddressArgument>,
): Promise<AddressSuggestions[]> => {
  if (!evt.arguments || !evt.arguments.input) {
    const err = 'Input argument not provided to the function';
    console.error(err, evt);
    throw new Error(err);
  }

  const response = await axios.get<PlacesApiResponse>(suggestionsEndpoint, {
    params: {
      input: evt.arguments.input,
      type: 'address',
      language: 'en-US',
      key: KEY,
    },
  });

  console.log('Status found:', response.status);

  const { data } = response;

  //OK and ZERO_RESULTS are the only successful status according to the documentation, so the lambda should fail fast
  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    console.error('Address Suggestion API returned an error:', data);
    throw new Error(`Address Suggestion API returned an error status: ${data.status}`);
  }

  return data.predictions.map(
    (p: PlacePrediction): AddressSuggestions => ({
      description: p.description,
      placeId: p.place_id,
    }),
  );
};

export const getCoordinates = async (evt: AppSyncResolverEvent<GetCoordinatesArgument>): Promise<AddressLocation> => {
  if (!evt.arguments || !evt.arguments.placeId) {
    const err = 'placeId argument not provided to the function';
    console.error(err, evt);
    throw new Error(err);
  }

  const placeId = evt.arguments.placeId;
  const { data } = await axios.get<PlaceDetailsResponse>(detailsEndpoint, {
    params: {
      placeid: evt.arguments.placeId,
      key: KEY,
    },
  });

  fs.writeFile('placeDetail.json', JSON.stringify(data), (f) => {});

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
