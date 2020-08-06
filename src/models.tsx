export interface User {
  id: string;
  name: string;
  avatar: String;
  address: string;
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
  }
}

export interface UpdateUserQueryVariables {
  id: String;
  name: String;
  address: String;
  description: String;
  expectedVersion: Number;
}

export interface CardProps {
  activeUser: any;
  propagateUser: any;
}

export interface EditModalProps {
  modalIsOpen: boolean;
  handleClose: any;
  user: User;
};

export interface EditFormProps {
  user: User;
  submit: any;
  cancel: any;
};

export interface EditUserProps {
  name: String,
  address: String,
  description: String,
}

export interface SearchProps {
  handleNameSearch: any;
}