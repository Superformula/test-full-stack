import React, { ReactElement, useCallback } from 'react'
import { useIntl } from 'react-intl'
import { useForm } from 'react-final-form'
import { LatLng } from '../../../../api/Types'
import { Autocomplete } from '../../components/autocomplete/Autocomplete'
import { useSearchAddressLazyQuery } from '../../generated/graphql'
import { useGetCoordinates } from './hooks/useGetCoordinates'

interface AddressAutocompleteFieldProps {
  name?: string
  value?: string
  onChange?: (value: string) => void
  onCoordinateFound: (latlng: LatLng) => void
}

export const AddressAutocomplete = ({
  name,
  value,
  onChange,
  onCoordinateFound,
}: AddressAutocompleteFieldProps): ReactElement => {
  const intl = useIntl()
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
      name={name}
      value={value}
      placeholder={intl.formatMessage({ id: 'address' })}
      keyProp="text"
      onChange={onChange}
      onSelect={onSelect}
      requestSuggestion={requestSuggestion}
      suggestions={data?.searchAddress ?? []}
      renderSuggestion={render}
    />
  )
}
