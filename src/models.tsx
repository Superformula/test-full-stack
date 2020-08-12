import { ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  avatar: String;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  createdAt: Date;
  version: Number;
}

export interface UserEdit {
  id: String;
  name: String;
  address: String;
  description: String;
  version: Number;
}

export interface QueryVariables {
  limit?: Number;
  nextToken?: String;
}

export interface QueryVariablesWithFilter extends QueryVariables {
  filter: {
    name: {
      contains: String;
    };
  };
}

export interface UpdateUserQueryVariables {
  id: String;
  name: String;
  address: String;
  latitude: number;
  longitude: number;
  description: String;
  expectedVersion: Number;
}

export interface CardProps {
  activeUser: User;
  propagateUser: any;
}

export interface EditModalProps {
  modalIsOpen: boolean;
  handleClose: any;
  user: User;
}

export interface EditFormProps {
  user: User;
  cancel: any;
}

export interface EditMapProps {
  children?: ReactNode;
  latitude?: number;
  longitude?: number;
  zoom?: number;
}

export interface EditUserProps {
  name: String;
  address: String;
  description: String;
}

export interface SearchProps {
  handleNameSearch: any;
}
