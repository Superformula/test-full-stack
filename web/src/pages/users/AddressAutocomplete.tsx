import React, { ReactElement, useCallback } from 'react'
import { useForm } from 'react-final-form'
import { LatLng } from '../../../../api/Types'
import { Autocomplete } from '../../components/autocomplete/Autocomplete'
import { useSearchAddressLazyQuery } from '../../generated/graphql'
import { useGetCoordinates } from './hooks/useGetCoordinates'

interface AddressAutocompleteFieldProps {
  value?: string
  onChange?: (value: string) => void
  onCoordinateFound: (latlng: LatLng) => void
}

export const AddressAutocomplete = ({
  value,
  onChange,
  onCoordinateFound,
}: AddressAutocompleteFieldProps): ReactElement => {
  const [searchAddress, { data }] = useSearchAddressLazyQuery({ fetchPolicy: 'cache-first' })
  const getCoordinates = useGetCoordinates()
  const form = useForm()
  const requestSuggestion = useCallback((text) => searchAddress({ variables: { text } }), [searchAddress])
  const render = useCallback((suggestion) => suggestion.text, [])
  const onSelect = useCallback(
    async (address) => {
      const latLng: LatLng | null = await getCoordinates(address.placeId)
      if (latLng) {
        onCoordinateFound(latLng)
        form.change(`latitude`, latLng.latitude)
        form.change(`longitude`, latLng.longitude)
      }
    },
    [onCoordinateFound, getCoordinates, form],
  )
  return (
    <Autocomplete
      value={value}
      placeholder="Address"
      keyProp="text"
      onChange={onChange}
      onSelect={onSelect}
      requestSuggestion={requestSuggestion}
      suggestions={data?.searchAddress ?? []}
      renderSuggestion={render}
    />
  )
}
