import { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { User } from '../api/types';
import { onDeleteUser, onDeleteUserData, onUpdateUser } from '../api/subscriptions';
import { deleteUser, updateUser } from '../store/userList/actions';

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

    return () => {
      updateSubscription.unsubscribe();
      deleteSubscription.unsubscribe();
    };
  }, [dispatch]);
};

export default useSubscribeToAppSync;
