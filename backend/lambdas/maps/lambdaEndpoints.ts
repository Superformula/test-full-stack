import { AppSyncResolverEvent } from 'aws-lambda';
import { AddressLocation, AddressSuggestion, GetCoordinatesArgument, SearchAddressArgument } from './types';
import { getAddressSuggestions, getCoordinates } from './maps';

export const getAddressHandler = async (
  event: AppSyncResolverEvent<SearchAddressArgument>,
): Promise<AddressSuggestion[]> => {
  if (!event.arguments || !event.arguments.input) {
    const err = 'Input argument not provided to the function';
    console.error(err, event);
    throw new Error(err);
  }

  return getAddressSuggestions(event.arguments.input);
};

export const getCoordinatesHandler = async (
  event: AppSyncResolverEvent<GetCoordinatesArgument>,
): Promise<AddressLocation> => {
  if (!event.arguments || !event.arguments.placeId) {
    const err = 'placeId argument not provided to the function';
    console.error(err, event);
    throw new Error(err);
  }

  return getCoordinates(event.arguments.placeId);
};
