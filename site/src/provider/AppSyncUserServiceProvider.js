import getAppSyncClient from "./getAppSyncClient.js";
import { UsersActions } from "../redux/Users/UsersActions.js";
import { toast } from "react-toastify";
import GraphQLUserQueries from "../graphqlQueries/GraphQLUserQueries.js";

class AppSyncUserServiceProvider {
  async init(store) {
    if (this._hasBeenCall) {
      return;
    }
    this._hasBeenCall = true;
    this._store = store;
    this._client = await getAppSyncClient();

    initSubscription(this._client, this._store, this);
  }

  async doSearch(searchTerm) {
    this._store.dispatch(UsersActions.clearAllUsers());
    this._store.dispatch(UsersActions.setCurrentSearchTerm(searchTerm));
    this._store.dispatch(UsersActions.setMaxUserLimit(getEnvUserLimit()));
    return this.loadUsers(searchTerm, null);
  }

  async loadMore() {
    let state = this._store.getState();
    let currentSearchTerm = state.currentSearchTerm;
    let startKey = null;

    if (state.users.length > 0) {
      startKey = {
        id: state.users[state.users.length - 1].id,
      };
    }
    this._store.dispatch(
      UsersActions.setMaxUserLimit(state.users.length + getEnvUserLimit())
    );
    let numberOfUsersLoaded = await this.loadUsers(currentSearchTerm, startKey);
    if (numberOfUsersLoaded === 0) {
      this._store.dispatch(
        UsersActions.setMaxUserLimit(state.users.length - getEnvUserLimit())
      );
    }
  }

  async loadUsersFromState(filter, limit) {
    this._store.dispatch(UsersActions.clearAllUsers());
    this._store.dispatch(UsersActions.setCurrentSearchTerm(filter));
    this._store.dispatch(UsersActions.setMaxUserLimit(limit));
    return this.loadUsers(filter, null, false);
  }

  async loadUsers(filter, startKey, pushToState = true) {
    let state = this._store.getState();
    let limit = state.userNumberLimit - state.users.length;
    try {
      let result = await this._client.query({
        query: GraphQLUserQueries.getUsers,
        variables: {
          filter: filter,
          limit: limit,
          startKey: startKey,
        },
        fetchPolicy: "network-only",
      });

      let numberOfUsersLoaded = result.data.getUsers.items.length;
      let users = mergeUsers(
        state.users,
        result.data.getUsers.items,
        state.currentSearchTerm,
        state.userNumberLimit
      );
      toast(`🦄 ${numberOfUsersLoaded} user(s) loaded`);
      this._store.dispatch(UsersActions.setUsers(users));
      if (pushToState) {
        pushUrlState(filter, state.userNumberLimit);
      }
      return numberOfUsersLoaded;
    } catch (e) {
      handleError(e);
    }
  }

  async addUser(input) {
    return this._client
      .mutate({
        mutation: GraphQLUserQueries.addUser,
        fetchPolicy: "no-cache",
        variables: {
          name: input.name,
          dateOfBirth: input.dateOfBirth,
          address: input.address,
          description: input.description,
        },
      })
      .catch(handleError);
  }

  async deleteUser(input) {
    return this._client
      .mutate({
        mutation: GraphQLUserQueries.deleteUser,
        fetchPolicy: "no-cache",
        variables: {
          id: input.id,
          name: input.name,
        },
      })
      .catch(handleError);
  }

  async updateUser(input) {
    return this._client
      .mutate({
        mutation: GraphQLUserQueries.updateUser,
        fetchPolicy: "no-cache",
        variables: {
          id: input.id,
          name: input.name,
          dateOfBirth: input.dateOfBirth,
          address: input.address,
          description: input.description,
        },
      })
      .catch(handleError);
  }
}

const initSubscription = (client, store, self) => {
  attachUpdateSub(client, store);
  attachAddSub(client, store);
  attachDeleteSub(client, store, self);
};

const attachUpdateSub = (client, store) => {
  const updateUserObservable = client.subscribe({
    query: GraphQLUserQueries.updateUserSub,
    fetchPolicy: "no-cache",
  });

  updateUserObservable.subscribe({
    next: (response) => {
      toast(`🦄 Update to ${response.data.updatedUser.name}!`);
      let state = store.getState();
      let users = mergeUsers(
        state.users,
        [response.data.updatedUser],
        state.currentSearchTerm,
        state.userNumberLimit
      );
      store.dispatch(UsersActions.setUsers(users));
    },
    complete: console.log,
    error: handleError,
  });
};

const attachAddSub = (client, store) => {
  const addUserObservable = client.subscribe({
    query: GraphQLUserQueries.addUserSub,
    fetchPolicy: "no-cache",
  });

  addUserObservable.subscribe({
    next: (response) => {
      toast(`🦄 ${response.data.addedUser.name} Added!`);
      let state = store.getState();
      let users = mergeUsers(
        state.users,
        [response.data.addedUser],
        state.currentSearchTerm,
        state.userNumberLimit
      );
      store.dispatch(UsersActions.setUsers(users));
    },
    complete: console.log,
    error: handleError,
  });
};

const attachDeleteSub = (client, store, self) => {
  const deleteUserObservable = client.subscribe({
    query: GraphQLUserQueries.deleteUserSub,
    fetchPolicy: "no-cache",
  });

  deleteUserObservable.subscribe({
    next: (response) => {
      toast(`🦄 ${response.data.deletedUser.name} Deleted!`);
      let state = store.getState();
      let users = state.users;
      let index = users.findIndex((item) => {
        return item.id === response.data.deletedUser.id;
      });

      if (index > -1) {
        let needToGrabNext = false;
        if (users.length > 0 && users.length % getEnvUserLimit() === 0) {
          needToGrabNext = true;
        }
        users.splice(index, 1);
        store.dispatch(UsersActions.setUsers([...users]));

        if (needToGrabNext && users.length > 1) {
          self.loadUsers(
            state.currentSearchTerm,
            {
              id: state.users[state.users.length - 1].id,
            },
            false
          );
        }
      }
    },
    complete: console.log,
    error: handleError,
  });
};

const mergeUsers = (currentUsers, users, currentSearchText, maxLimit) => {
  if (currentUsers.length === 0) {
    return users;
  }
  let newUsers = [];
  for (let i = 0; i < users.length; i++) {
    let donHaveUser = true;
    for (let j = 0; j < currentUsers.length; j++) {
      if (users[i].id === currentUsers[j].id) {
        donHaveUser = false;
        users[i].image = currentUsers[j].image;
        currentUsers[j] = users[i];
        break;
      }
    }
    if (donHaveUser) {
      if (
        !currentSearchText ||
        currentSearchText.trim() === "" ||
        users[i].name
          .toLowerCase()
          .includes(currentSearchText.toLowerCase().trim())
      ) {
        newUsers.push(users[i]);
      }
    }
  }

  return [...currentUsers, ...newUsers]
    .sort((a, b) => {
      return b.createdAt - a.createdAt;
    })
    .slice(0, maxLimit);
};

const getEnvUserLimit = () => {
  return parseInt(process.env.REACT_APP_USERS_NUMBER_LIMIT);
};

const pushUrlState = (filter, userNumberLimit) => {
  if (filter || userNumberLimit > 10) {
    window.history.pushState(
      "",
      "",
      `/#limit=${userNumberLimit}&filter=${
        filter ? encodeURIComponent(filter) : ""
      }`
    );
  } else {
    window.history.pushState("", "", "/");
  }
};
const handleError = (e) => {
  console.log(e);
  toast.error(e);
};

export default new AppSyncUserServiceProvider();
