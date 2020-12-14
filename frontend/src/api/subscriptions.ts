import { gql } from '@apollo/client';

export const onUpdateUser = gql`
  subscription {
    onUpdateUser {
      id
      name
      dob
      description
      longitude
      latitude
      updatedAt
      createdAt
      avatar
      address
    }
  }
`;

export type onDeleteUserData = {
  id: string;
};

export const onDeleteUser = gql`
  subscription {
    onDeleteUser {
      id
    }
  }
`;
