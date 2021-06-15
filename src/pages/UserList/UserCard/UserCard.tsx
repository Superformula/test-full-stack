import { memo, MouseEventHandler } from 'react';

import { Avatar } from '../../../components/avatar/Avatar';
import { Card } from '../../../components/card/Card';
import classes from './UserCard.module.scss';

interface UserCardProps {
  createdAt: string;
  imageUrl: string;
  name: string;
  description: string;
  onEditClick: MouseEventHandler;
}

function UserCardComponent(props: UserCardProps) {
  return (
    <Card className={classes.element}>
      <img
        src='assets/edit-icon.svg'
        alt='Edit icon'
        className={classes.editIcon}
        onClick={props.onEditClick}
      />
      <Avatar
        title={'avatar'}
        src={props.imageUrl}
        className={classes.avatar}
      />
      <div className={classes.name}>
        <h2>{props.name}</h2>
        <p>
          created <span>{props.createdAt}</span>
        </p>
      </div>
      <p className={classes.description}>{props.description}</p>
    </Card>
  );
}

export const UserCard = memo(UserCardComponent);
