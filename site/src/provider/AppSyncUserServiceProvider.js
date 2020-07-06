import AWSAppSyncClient from "aws-appsync";
import getAppSyncClient from "./getAppSyncClient.js";
import gql from "graphql-tag";
import { UsersActions } from "../redux/Users/UsersActions";

export default class AppSyncUserServiceProvider {
  constructor(store) {
    this._store = store;
    getAppSyncClient().then((client) => {
      this._client = client;
      this.listUsers(null, 6, null);
    });
  }

  async listUsers(filter, limit, startKey) {
    const filterParam = filter ? `"${filter}"` : null;
    const getUsers = gql`
      query {
        getUsers(filter: ${filterParam}, limit: ${limit}, startKey: ${startKey}) {
          items {
            id
            name
            dateOfBirth
            address
            description
            createdAt
            updatedAt
          }
          startKey {
            id
          }
        }
      }
    `;

    let result = await this._client.query({
      query: getUsers,
      fetchPolicy: "network-only",
    });
    this._store.dispatch(UsersActions.setUsers(result.data.getUsers.items));
  }

  async addUser(input) {}

  async deleteUser(input) {}

  async updateUser(input) {}
}
