import { memo, useCallback } from 'react';
import classes from './UserCard.module.scss';
import { Avatar } from '../../components/avatar/Avatar';
import { Card } from '../../components/card/Card';
import { User } from '../../generated/graphql';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

interface UserCardProps {
  user: User;
  onEditClick?: (user: User) => void;
}
function UserCardComponent(props: UserCardProps) {
  const createdAt = format(parseISO(props.user.createdAt), 'dd MMM yyyy');
  const editClick = useCallback(() => {
    props.onEditClick && props.onEditClick(props.user);
  }, [props]);

  return (
    <Card className={classes.element}>
      <img
        src="assets/edit-icon.svg"
        alt="Edit icon"
        className={classes.editIcon}
        onClick={editClick}
      />
      <Avatar
        title={'avatar'}
        src={props.user.imageUrl}
        className={classes.avatar}
      />
      <div className={classes.name}>
        <h2>{props.user.name}</h2>
        <p>
          created <span>{createdAt}</span>
        </p>
      </div>
      <p className={classes.description}>{props.user.description}</p>
    </Card>
  );
}

export const UserCard = memo(UserCardComponent);
