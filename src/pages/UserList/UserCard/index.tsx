import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { memo, useCallback } from 'react';
import { User } from '../../../generated/graphql';
import { UserCard as Element } from './UserCard';

interface UserCardProps {
  user: User;
  onEditClick?: (user: User) => void;
}

function UserCardComponent(props: UserCardProps) {
  const createdAt = format(parseISO(props.user.createdAt), 'dd MMM yyyy');
  const onEditClick = useCallback(() => {
    props.onEditClick && props.onEditClick(props.user);
  }, [props]);

  return (
    <Element
      description={props.user.description}
      imageUrl={props.user.imageUrl}
      name={props.user.name}
      onEditClick={onEditClick}
      createdAt={createdAt}
    />
  );
}

export const UserCard = memo(UserCardComponent);
