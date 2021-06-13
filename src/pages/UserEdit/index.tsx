import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { UserEditModal as Element } from './UserEditModal';
import { useUserEditModal } from './modal/ModalComponent';
import {
  useLookupAddressLazyQuery,
  User,
  useUpdateUserMutation,
} from '../../generated/graphql';

function UserEditModalComponent() {
  const { closeDialog, user } = useUserEditModal();
  const [userForm, setUserForm] = useState<any>({});
  const [fetchAddress, { data }] = useLookupAddressLazyQuery();
  const [updateUser, { loading }] = useUpdateUserMutation();
  const debounce = useRef<ReturnType<typeof setTimeout>>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const form: User | undefined = useMemo(() => {
    if (!user) {
      return undefined;
    }
    return {
      name: user.name,
      address: user.address,
      description: user.description,
      ...userForm,
    };
  }, [user, userForm]);

  useEffect(() => {
    if (form) {
      if (debounce.current) {
        clearTimeout(debounce.current);
      }
      debounce.current = setTimeout(() => {
        fetchAddress({
          variables: {
            address: form.address,
          },
        });
      }, 600);
    }
  }, [form, fetchAddress]);

  const onInputChange = useCallback(
    (name: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {
      evt.preventDefault();
      const value = evt.target.value;
      setUserForm((state: any) => ({ ...state, [name]: value }));
    },
    []
  );

  const onSubmit = useCallback(async () => {
    if (user && form) {
      const { id, dob, imageUrl } = user;
      const { name, address, description } = form;
      try {
        await updateUser({
          variables: {
            userId: id,
            data: {
              dob,
              imageUrl,
              name,
              address,
              description,
            },
          },
        });
        closeDialog();
      } catch (e) {
        setErrorMessage(e.message);
      }
    }
  }, [closeDialog, form, updateUser, user]);

  if (!form) {
    return null;
  }

  return (
    <Element
      errorMessage={errorMessage}
      loading={loading}
      onSubmit={onSubmit}
      latitude={data?.lookupAddress.latitude}
      longitude={data?.lookupAddress.longitude}
      onCancelCLick={closeDialog}
      form={form}
      onInputChange={onInputChange}
    />
  );
}

export const UserEditModal = memo(UserEditModalComponent);
