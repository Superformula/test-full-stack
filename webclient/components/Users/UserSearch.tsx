import {
  useState,
  useCallback,
  Dispatch,
  ReactElement,
  ChangeEvent
} from 'react'

import SearchBox from '../generic/SearchBox'

import { handleSearchUsers } from '../../models/user'
import { ActionType } from '../../interfaces'
import { useDebouncedFunction } from '../../hooks/useDebouncedFunction'

interface Props {
  dispatch: Dispatch<ActionType>;
}

export default function UserSearch({ dispatch }: Props): ReactElement {
  const [searchTerm, setSearchTerm] = useState('')

  const memoizedSearchHandler = useCallback(
    () => handleSearchUsers(dispatch, searchTerm),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchTerm]
  )

  useDebouncedFunction(memoizedSearchHandler, searchTerm, 450)

  const handleSearchTermChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value)
  }

  return (
    <SearchBox value={searchTerm} onSearchTermChange={handleSearchTermChange} />
  )
}
