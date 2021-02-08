import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import { SearchBar } from '../common/SearchBar';
import { GET_USERS } from './queries/users';
import { DashboardUserList } from './DashboardUserList';
import { Button } from '../common/Button';

const DEFAULT_LIMIT = 10

export const Dashboard = () => {
  const [searchValue, setSearchValue] = useState('')
  const [lastKey, setLastKey] = useState('')

  const { loading, error, data } = useQuery(GET_USERS, {
    variables: { limit: DEFAULT_LIMIT, lastKey: lastKey, name: searchValue }
  })

  const handleOnClick = () => {
    if (data.getUsers.data.length && data.getUsers.lastKey) {
      setLastKey(data.getUsers.lastKey)
    }
  }

  if (error) {
    return <p>Error</p>
  }

  return (
    <div>
      <SearchBar value={searchValue} label={'User list'} placeholder={'Search...'} onChange={setSearchValue} />
      <DashboardUserList currentSearch={searchValue} users={data ? data.getUsers.data : []} loading={loading}/>
      <Button label={'Load more'} onClick={handleOnClick}/>
    </div>
  )
}
