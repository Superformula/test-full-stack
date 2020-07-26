import { useCallback, useMemo } from 'react'
import { useCreatePersonMutation, useUpdatePersonMutation } from '../../../generated/graphql'
import { CompleteUser } from './useGetUser'

export interface SaveUserResult {
  save: (values: CompleteUser) => Promise<void>
}

export const useSaveUser = (): SaveUserResult => {
  const [create] = useCreatePersonMutation()
  const [update] = useUpdatePersonMutation()
  const save = useCallback(
    async (values: CompleteUser): Promise<void> => {
      const body = {
        name: values.name ?? '',
        address: values.address ?? '',
        description: values.description,
        dob: values.dob ?? '1989-11-01',
        lat: values.lat,
        lng: values.lng,
      }
      if (values.id) {
        await update({ variables: { id: values.id, body } })
      } else {
        await create({ variables: { body } })
      }
    },
    [create, update],
  )

  return useMemo(() => ({ save }), [save])
}
