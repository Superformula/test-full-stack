import { useApolloClient } from '@apollo/react-hooks'
import { useCallback } from 'react'
import { GetCoordinatesDocument } from '../../../generated/graphql'

export interface LatLng {
  latitude: number
  longitude: number
}

type GetCoordinatesFn = (placeId: string) => Promise<LatLng | null>

export const useGetCoordinates = (): GetCoordinatesFn => {
  const client = useApolloClient()
  return useCallback<GetCoordinatesFn>(
    async (placeId: string) => {
      const { data } = await client.query({
        fetchPolicy: 'no-cache',
        query: GetCoordinatesDocument,
        variables: { placeId },
      })
      return data.getCoordinates
    },
    [client],
  )
}
