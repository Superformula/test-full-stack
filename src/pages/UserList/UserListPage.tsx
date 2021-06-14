import { ChangeEventHandler, memo } from 'react';

import { Button } from '../../components/button/Button';
import { Input } from '../../components/input/input';
import { User } from '../../generated/graphql';
import { UserCard } from './UserCard';
import classes from './UserListPage.module.scss';

interface UserListPageProps {
  errorMessage?: string;
  data: User[];
  hasMore: boolean;
  loading: boolean;
  onEditClick: (user: User) => void;
  onLoadMoreClick: () => void;
  onSearch: ChangeEventHandler;
}

function UserListPageComponent(props: UserListPageProps) {
  return (
    <div className={classes.userListPage}>
      <div className={classes.userListPage__header}>
        <h1>Users list</h1>
        <Input
          name='search'
          placeholder='Search...'
          onChange={props.onSearch}
        />
      </div>
      <div className={classes.userListPage__content}>
        {props.errorMessage}
        {props.loading && props.data.length === 0 && <div>Loading...</div>}
        {props.data?.map((item) => {
          return (
            <UserCard
              user={item}
              key={item.id}
              onEditClick={props.onEditClick}
            />
          );
        })}
      </div>
      {props.hasMore && (
        <div className={classes.userListPage__loadMore}>
          <Button onClick={props.onLoadMoreClick}>
            {props.loading ? 'Loading...' : 'LOAD MORE'}
          </Button>
        </div>
      )}
    </div>
  );
}

export const UserListPage = memo(UserListPageComponent);
