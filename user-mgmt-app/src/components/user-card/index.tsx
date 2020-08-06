import { EditIcon } from 'components/edit-icon';
import {
  DescriptionLabel,
  NameLabel,
  UserCardDiv,
  StyledAvatar,
  EditIconContainer,
} from 'components/user-card/styles';
import { User } from 'graphql/user-api/@types';
import React from 'react';
import { color } from 'theme/token';

export interface UserCardProps {
  imageUrl: string;
  user: User;
  onEdit: (user: User) => void;
}

const UserCardComponent: React.FC<UserCardProps> = ({
  imageUrl,
  user,
  onEdit,
}) => {
  const { name, description } = user;
  return (
    <UserCardDiv bg={color.secondary}>
      <EditIconContainer>
        <EditIcon onClick={() => onEdit(user)} />
      </EditIconContainer>
      <StyledAvatar imageUrl={imageUrl} />
      <NameLabel title={name}>{name}</NameLabel>
      <DescriptionLabel title={description}>{description}</DescriptionLabel>
    </UserCardDiv>
  );
};

export const UserCard = UserCardComponent;
