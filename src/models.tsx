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
  limit: Number;
  nextToken?: String;
}