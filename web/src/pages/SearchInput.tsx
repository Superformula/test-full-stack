import { useDebounceCallback } from '@react-hook/debounce'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { StringParam, useQueryParam } from 'use-query-params'
import { Input } from '../components/input/Input'

export const SearchInput = (): ReactElement => {
  const intl = useIntl()
  const [querySearch, setQuerySearch] = useQueryParam<string | null | undefined>('name', StringParam)
  const [search, setSearch] = useState(querySearch ?? '')
  const applySearch = useDebounceCallback(setQuerySearch, 800)
  const onTextChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const value = evt.target.value
      setSearch(value)
      applySearch(value)
    },
    [setSearch, applySearch],
  )

  // important to link query changes (if the user changes the query by navigating
  useEffect(() => setSearch(querySearch ?? ''), [querySearch])

  return (
    <Input
      type="text"
      placeholder={intl.formatMessage({ id: 'search' })}
      placeholderOnTop={false}
      value={search}
      onChange={onTextChange}
    />
  )
}
