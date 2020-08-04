import { EditIcon } from 'components/edit-icon';
import {
  DescriptionLabel,
  NameLabel,
  UserCardDiv,
  StyledAvatar,
  EditIconContainer,
} from 'components/user-card/styles';
import React from 'react';

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
    <UserCardDiv>
      <EditIconContainer>
        <EditIcon onClick={onEdit} />
      </EditIconContainer>
      <StyledAvatar imageUrl={imageUrl} />
      <NameLabel>{userName}</NameLabel>
      <DescriptionLabel>{userDescription}</DescriptionLabel>
    </UserCardDiv>
  );
};

export const UserCard = UserCardComponent;
