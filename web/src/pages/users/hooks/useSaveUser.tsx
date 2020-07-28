import { useCallback, useMemo } from 'react'
import { useCreateUserMutation, useUpdateUserMutation } from '../../../generated/graphql'
import { CompleteUser } from './useGetUser'

export interface SaveUserResult {
  save: (values: CompleteUser) => Promise<void>
}

export const useSaveUser = (): SaveUserResult => {
  const [create] = useCreateUserMutation()
  const [update] = useUpdateUserMutation()
  const save = useCallback(
    async (values: CompleteUser): Promise<void> => {
      const body = {
        name: values.name ?? '',
        address: values.address ?? '',
        description: values.description,
        dob: values.dob ?? '1989-11-01', // TODO add DOB in a future release
        latitude: values.latitude,
        longitude: values.longitude,
      }
      if (values.id) {
        // TODO add validations and error handling
        await update({ variables: { id: values.id, body } }).catch((err) => console.error(err))
      } else {
        // TODO add validations and error handling
        await create({ variables: { body } }).catch((err) => console.error(err))
      }
    },
    [create, update],
  )

  return useMemo(() => ({ save }), [save])
}
