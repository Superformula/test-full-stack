export interface User {
  id: String;
  name: String;
  avatar: String;
  address: String;
  description: String;
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
  }
}

export interface UpdateUserQueryVariables {
  id: String;
  name: String;
  address: String;
  description: String;
  expectedVersion: Number;
}

export interface EditModalProps {
  modalIsOpen: boolean;
  handleClose: any;
  user: UserEdit;
};

export interface SearchProps {
  handleNameSearch: any;
}