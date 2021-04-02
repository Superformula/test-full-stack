import {
  useState,
  useCallback,
  Dispatch,
  ReactElement,
  ChangeEvent
} from 'react'

import SearchBox from '../generic/SearchBox'

import { handleSearchUsers } from '../../models/user'
import { useDebouncedFunction } from '../../hooks/useDebouncedFunction'

import { ActionType } from '../../interfaces'

interface Props {
  dispatch: Dispatch<ActionType>;
}

export default function UserSearch({ dispatch }: Props): ReactElement {
  const [searchTerm, setSearchTerm] = useState('')
  const [isPristine, setIsPristine] = useState(true)

  const memoizedSearchHandler = useCallback(
    () => handleSearchUsers(dispatch, searchTerm, isPristine),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchTerm]
  )

  useDebouncedFunction(memoizedSearchHandler, searchTerm, 450)

  const handleSearchTermChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value)
    setIsPristine(false)
  }

  return (
    <SearchBox value={searchTerm} onSearchTermChange={handleSearchTermChange} />
  )
}
