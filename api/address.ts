import { Context } from 'aws-lambda'
import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { AddressResponse, AppSyncEvent, AppSyncResolver, GooglePlaceResponse, GooglePrediction, LatLng } from './Types'

const googleMapsToken: string = process.env.GOOGLE_MAPS_TOKEN
const googleMaps: AxiosInstance = axios.create({ baseURL: 'https://maps.googleapis.com' })

export const searchAddress: AppSyncResolver<AddressResponse[]> = async (
  event: AppSyncEvent,
): Promise<AddressResponse[]> => {
  const text: string = event.arguments.text
  const { data }: AxiosResponse<GooglePlaceResponse> = await googleMaps.get('/maps/api/place/autocomplete/json', {
    params: {
      input: text,
      language: 'en-US',
      type: 'address',
      key: googleMapsToken,
    },
  })
  return data?.predictions?.map(
    (prediction: GooglePrediction): AddressResponse => ({
      text: prediction.description,
      placeId: prediction.place_id,
    }),
  )
}

export const getCoordinates: AppSyncResolver<LatLng> = async (event: AppSyncEvent): Promise<LatLng> => {
  const { data } = await googleMaps.get('/maps/api/place/details/json', {
    params: { placeid: event.arguments.placeId, key: googleMapsToken },
  })

  if (data?.status !== 'OK') return null

  return {
    latitude: data?.result?.geometry?.location?.lat,
    longitude: data?.result?.geometry?.location?.lng,
  }
}

const resolvers: { [key: string]: AppSyncResolver<any> } = {
  searchAddress,
  getCoordinates,
}

export const handler: AppSyncResolver<any> = async (event: AppSyncEvent, context: Context): Promise<any> => {
  const resolver: AppSyncResolver<any> = resolvers[event.resolver]
  if (resolver) return resolver(event, context)
}
