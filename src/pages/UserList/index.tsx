import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { UserListPage as Element } from './UserListPage';
import { useFetchUsersLazyQuery, User } from '../../generated/graphql';
import { useUserEditModal } from '../../components/modal/ModalComponent';
import { StringParam, useQueryParam } from 'use-query-params';

function UserListPageComponent() {
  const [fetch, { data, fetchMore, loading }] = useFetchUsersLazyQuery();
  const { openDialog } = useUserEditModal();
  const [isLoading, setLoading] = useState(false);
  const [nextPaginationKey, setNextPaginationKey] = useQueryParam(
    'key',
    StringParam
  );
  const [name, setName] = useQueryParam('name', StringParam);
  const debounce = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    fetch({
      variables: {
        nextPaginationKey,
        name,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEditClick = useCallback(
    (user: User) => {
      openDialog(user);
    },
    [openDialog]
  );

  const onLoadMoreClick = useCallback(() => {
    const nextKey = data?.users.nextPaginationKey;
    if (fetchMore && nextKey && !!data?.users && !loading) {
      setLoading(true);
      setNextPaginationKey(nextKey);
      fetchMore({
        updateQuery: (previousResult, { fetchMoreResult }) => {
          return {
            users: {
              list: [
                ...(previousResult?.users?.list || []),
                ...(fetchMoreResult?.users?.list || []),
              ],
              nextPaginationKey: fetchMoreResult?.users?.nextPaginationKey,
            },
          };
        },
        variables: {
          nextPaginationKey: nextKey,
        },
      }).finally(() => setLoading(false));
    }
  }, [data?.users, fetchMore, loading, setNextPaginationKey]);

  const onSearch = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const searchName = evt.target.value;
      if (debounce.current) {
        clearTimeout(debounce.current);
      }
      debounce.current = setTimeout(() => {
        setName(searchName?.length > 0 ? searchName : undefined);
        setNextPaginationKey(undefined);
        fetch({
          variables: {
            name: searchName,
          },
        });
      }, 600);
    },
    [fetch, setName, setNextPaginationKey]
  );

  const hasMore = !!data?.users.nextPaginationKey;

  return (
    <Element
      onSearch={onSearch}
      loading={isLoading || loading}
      hasMore={hasMore}
      onLoadMoreClick={onLoadMoreClick}
      data={data?.users.list || []}
      onEditClick={onEditClick}
    />
  );
}

export const UserListPage = memo(UserListPageComponent);
