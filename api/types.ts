import { Context } from 'aws-lambda'

export interface AppSyncEvent {
  resolver: string
  arguments: { [key: string]: any }
}

export type AppSyncResolver<T> = (event: AppSyncEvent, context: Context) => Promise<T>

export interface AddressResponse {
  text: string
  placeId: string
}

export interface GooglePrediction {
  description: string
  id: string
  matched_substrings: { length: number; offset: number }[]
  place_id: string
  reference: string
  structured_formatting: {
    main_text: string
    main_text_matched_substrings: { length: number; offset: number }[]
    secondary_text: string
  }
  terms: { offset: number; value: string }[]
  types: string[]
}

export interface GooglePlaceResponse {
  status: string
  predictions: GooglePrediction[]
}

export interface LatLng {
  latitude: number
  longitude: number
}
