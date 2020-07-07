import getAppSyncClient from "./getAppSyncClient.js";
import gql from "graphql-tag";
import { UsersActions } from "../redux/Users/UsersActions.js";

class AppSyncUserServiceProvider {
  async init(store) {
    if (this.hasBeenCall) {
      return;
    }
    this.hasBeenCall = true;
    this._store = store;
    this._client = await getAppSyncClient();
    await this.listUsers(null, 100, null);
    initSubscription(this._client, this._store);
  }

  async doSearch(searchTerm) {
    this._store.dispatch(UsersActions.clearAllUsers());
    this._store.dispatch(UsersActions.setCurrentSearchTerm(searchTerm));
    return this.listUsers(searchTerm, 100, null);
  }

  async loadMore() {
    let currentSearchTerm = this._store.getState().currentSearchTerm;
    let startKey = null;
    if (this._store.getState().users.length > 0) {
      startKey = {
        id: this._store.getState().users[
          this._store.getState().users.length - 1
        ].id,
      };
    }
    return this.listUsers(currentSearchTerm, 100, startKey);
  }

  async listUsers(filter, limit, startKey) {
    const getUsers = gql`
      query getUsersQuery(
        $filter: String
        $limit: Int
        $startKey: StartKeyInput
      ) {
        getUsers(filter: $filter, limit: $limit, startKey: $startKey) {
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
      variables: { filter: filter, limit: limit, startKey: startKey },
      fetchPolicy: "network-only",
    });
    this._store.dispatch(UsersActions.setUsers(result.data.getUsers.items));
  }

  async addUser(input) {
    const addUser = gql`
      mutation addUserMutation(
        $name: String
        $dateOfBirth: Float
        $address: String
        $description: String
      ) {
        addUser(
          input: {
            name: $name
            dateOfBirth: $dateOfBirth
            address: $address
            description: $description
          }
        ) {
          id
          name
          address
          dateOfBirth
          description
          createdAt
          updatedAt
        }
      }
    `;
    return this._client.mutate({
      mutation: addUser,
      fetchPolicy: "no-cache",
      variables: {
        name: input.name,
        dateOfBirth: input.dateOfBirth,
        address: input.address,
        description: input.description,
      },
    });
  }

  async deleteUser(input) {
    const deleteUser = gql`
      mutation deleteUserMutation($id: ID) {
        deleteUser(input: { id: $id }) {
          id
        }
      }
    `;
    return this._client.mutate({
      mutation: deleteUser,
      fetchPolicy: "no-cache",
      variables: {
        id: input.id,
      },
    });
  }

  async updateUser(input) {
    const updateUser = gql`
      mutation updateUserMutation(
        $id: ID
        $name: String
        $dateOfBirth: Float
        $address: String
        $description: String
      ) {
        updateUser(
          input: {
            id: $id
            name: $name
            dateOfBirth: $dateOfBirth
            address: $address
            description: $description
          }
        ) {
          id
          name
          address
          dateOfBirth
          description
          createdAt
          updatedAt
        }
      }
    `;

    return this._client.mutate({
      mutation: updateUser,
      fetchPolicy: "no-cache",
      variables: {
        id: input.id,
        name: input.name,
        dateOfBirth: input.dateOfBirth,
        address: input.address,
        description: input.description,
      },
    });
  }
}

const initSubscription = (client, store) => {
  attachUpdateSub(client, store);
  attachAddSub(client, store);
  attachDeleteSub(client, store);
};

const attachUpdateSub = (client, store) => {
  const updateUserSub = gql`
    subscription UpdateUserSub {
      updatedUser {
        id
        name
        address
        dateOfBirth
        description
        createdAt
        updatedAt
      }
    }
  `;

  const updateUserObservable = client.subscribe({
    query: updateUserSub,
    fetchPolicy: "no-cache",
  });

  updateUserObservable.subscribe({
    next: (response) => {
      store.dispatch(UsersActions.setUsers([response.data.updatedUser]));
    },
    complete: console.log,
    error: console.log,
  });
};

const attachAddSub = (client, store) => {
  const addUserSub = gql`
    subscription AddUserSub {
      addedUser {
        id
        name
        address
        dateOfBirth
        description
        createdAt
        updatedAt
      }
    }
  `;

  const addUserObservable = client.subscribe({
    query: addUserSub,
    fetchPolicy: "no-cache",
  });

  addUserObservable.subscribe({
    next: (response) => {
      store.dispatch(UsersActions.setUsers([response.data.addedUser]));
    },
    complete: console.log,
    error: console.log,
  });
};

const attachDeleteSub = (client, store) => {
  const deleteUserSub = gql`
    subscription DeleteUserSub {
      deletedUser {
        id
        name
        address
        dateOfBirth
        description
        createdAt
        updatedAt
      }
    }
  `;

  const deleteUserObservable = client.subscribe({
    query: deleteUserSub,
    fetchPolicy: "no-cache",
  });

  deleteUserObservable.subscribe({
    next: (response) => {
      store.dispatch(UsersActions.removeUser(response.data.deletedUser));
    },
    complete: console.log,
    error: console.log,
  });
};

export default new AppSyncUserServiceProvider();
