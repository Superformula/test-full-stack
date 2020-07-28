import React, { ReactElement, useCallback } from 'react'
import { ReactComponent as TrashIcon } from '../../assets/trash-2-outline.svg'
import { Icon } from '../../components/icon/Icon'
import { useDeleteUserMutation } from '../../generated/graphql'

interface UserDeleteButtonProps {
  userId: string
  onDeleteSuccess: VoidFunction
}

export const UserDeleteButton = ({ userId, onDeleteSuccess }: UserDeleteButtonProps): ReactElement => {
  const [deleteUser] = useDeleteUserMutation({ variables: { id: userId } })

  const onDeleteClick = useCallback(() => {
    deleteUser().then(onDeleteSuccess)
  }, [deleteUser, onDeleteSuccess])

  return (
    <button onClick={onDeleteClick} aria-roledescription="Delete User">
      <Icon Component={TrashIcon} size={32} />
    </button>
  )
}
