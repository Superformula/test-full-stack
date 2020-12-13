import axios from 'axios';
import { AddressSuggestions, PlacePrediction, PlacesApiResponse } from './types';

const api = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
const KEY = 'REDACTED';

export const getAddressSuggestions = async (input: string): Promise<AddressSuggestions[]> => {
  const { data } = await axios.get<PlacesApiResponse>(api, {
    params: {
      input: input,
      type: 'address',
      language: 'en-US',
      key: KEY,
    },
  });

  //OK and ZERO_RESULTS are the only successful status according to the documentation, so the lambda should fail fast
  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    console.error('Places API returned an error:', data);
    throw new Error(`Places API returned an error status: ${data.status}`);
  }

  return data.predictions.map(
    (p: PlacePrediction): AddressSuggestions => ({
      description: p.description,
      placeId: p.place_id,
    }),
  );
};

getAddressSuggestions('828 Ballard St').then((t) => console.log('OK'!));
