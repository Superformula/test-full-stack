import { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { User } from '../api/types';
import { onCreateUser, onDeleteUser, onDeleteUserData, onUpdateUser } from '../api/subscriptions';
import { addUser, deleteUser, updateUser } from '../store/userList/actions';

const useSubscribeToAppSync = (): void => {
  const apolloClient = useApolloClient();
  const dispatch = useDispatch();

  useEffect(() => {
    const updateSubscription = apolloClient
      .subscribe({
        fetchPolicy: 'no-cache',
        query: onUpdateUser,
      })
      .subscribe({
        next(value) {
          if (!value || !value.data || !value.data.onUpdateUser) return;

          const updated: User = value.data.onUpdateUser;
          if (!updated.id) return;

          dispatch(updateUser(updated));
        },
      });

    const deleteSubscription = apolloClient
      .subscribe({
        fetchPolicy: 'no-cache',
        query: onDeleteUser,
      })
      .subscribe({
        next(value) {
          if (!value || !value.data || !value.data.onDeleteUser) return;

          const deleted: onDeleteUserData = value.data.onDeleteUser;
          if (!deleted.id) return;

          dispatch(deleteUser(deleted.id));
        },
      });

    const createSubscription = apolloClient
      .subscribe({
        fetchPolicy: 'no-cache',
        query: onCreateUser,
      })
      .subscribe({
        next(value) {
          if (!value || !value.data || !value.data.onCreateUser) return;

          dispatch(addUser(value.data.onCreateUser));
        },
      });

    return () => {
      updateSubscription.unsubscribe();
      deleteSubscription.unsubscribe();
      createSubscription.unsubscribe();
    };
  }, [dispatch, apolloClient]);
};

export default useSubscribeToAppSync;
