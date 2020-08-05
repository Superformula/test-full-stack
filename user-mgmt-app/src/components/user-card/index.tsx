import { EditIcon } from 'components/edit-icon';
import {
  DescriptionLabel,
  NameLabel,
  UserCardDiv,
  StyledAvatar,
  EditIconContainer,
} from 'components/user-card/styles';
import React from 'react';
import { color } from 'theme/token';

export interface UserCardProps {
  imageUrl: string;
  userName: string;
  userDescription: string;
  onEdit: () => void;
}

const UserCardComponent: React.FC<UserCardProps> = ({
  imageUrl,
  userName,
  userDescription,
  onEdit,
}) => {
  return (
    <UserCardDiv bg={color.secondary}>
      <EditIconContainer>
        <EditIcon onClick={onEdit} />
      </EditIconContainer>
      <StyledAvatar imageUrl={imageUrl} />
      <NameLabel title={userName}>{userName}</NameLabel>
      <DescriptionLabel title={userDescription}>
        {userDescription}
      </DescriptionLabel>
    </UserCardDiv>
  );
};

export const UserCard = UserCardComponent;
