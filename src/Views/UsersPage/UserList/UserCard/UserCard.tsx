import React from 'react';

import { Avatar } from '../../../../components/avatar/Avatar';
import { Card } from '../../../../components/card/Card';
import { Typography } from '../../../../components/typograph/Typography';
import { User } from '../../../../types';
import { formatDate } from '../../../../utils/dates';
import './UserCard.scss';
import UserEdit from './UserEdit/UserEdit';

interface UserCardProps {
  user: User
}

const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <Card className="user-card">
    <div className="user-card-avatar-wrapper">
      <Avatar url={user.imageUrl} alt={`Image of ${user.name}`} />
    </div>
    <div className="user-card-info">
      <Typography variant="h2" className="user-card-info-name">{user.name}</Typography>
      <Typography variant="paragraph" className="user-card-info-created-at">
        created
        {' '}
        <span>{formatDate(user.createdAt)}</span>
      </Typography>
    </div>
    <div className="user-card-description">
      <Typography variant="paragraph">{user.description}</Typography>
    </div>
    <UserEdit user={user} className="user-card-edit-button" />
  </Card>
);

export default React.memo(UserCard);
