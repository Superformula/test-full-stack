import { useCallback, Dispatch, ReactElement } from 'react'

import UserCard from './UserCard'

import { StateUsers, handleDeleteUser } from '../../models/user'
import { ActionType } from '../../interfaces'

import styles from './UserGrid.module.css'

interface Props {
  users: StateUsers;
  dispatch: Dispatch<ActionType>;
}

export default function UserGrid({ users, dispatch }: Props): ReactElement {
  const handleUserDelete = useCallback(
    (userId: string): Promise<void> => handleDeleteUser(dispatch, userId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <div className={styles.grid}>
      {users.map(user => (
        <UserCard key={user.id} user={user} onUserDelete={handleUserDelete} />
      ))}
    </div>
  )
}
