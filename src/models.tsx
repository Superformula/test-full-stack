export interface User {
  id: String;
  name: String;
  avatar: String;
  address: String;
  description: String;
  createdAt: Date;
}

export interface UserEdit {
  id: String;
  name: String;
  address: String;
  description: String;
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

export interface Search {
  handleNameSearch: any;
}