export interface LooseObject {
  [key: string]: any;
}

export type ActionType = 'create' | 'update' | 'delete';

export type SearchAddressArgument = {
  input?: string;
};

export type GetCoordinatesArgument = {
  placeId?: string;
};
