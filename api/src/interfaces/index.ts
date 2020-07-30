export interface IUser {
  id?: string;
  name?: string;
  dob?: string;
  address?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ILoggerConfig {
  name?: string;
  level?: string;
  enabled?: string;
}

export interface ILocationInformation {
  geometry: IMapBoxGeometry;
}

export interface IMapBoxGeometry {
  type: string;
  coordinates: number[];
}

export interface IMapBoxContext {
  id: string;
  text: string;
  short_code?: string;
}

export interface IMapBoxFeature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  text: string;
  place_name?: string;
  matching_place_name?: string;
  center: number[];
  geometry: IMapBoxGeometry;
  context: IMapBoxContext;
}

export interface IMapBoxResponse {
  type: string;
  query: string[];
  features: IMapBoxFeature[];
  attribution: string;
}

export interface IMapBoxErrorResponse {
  message: string;
}
