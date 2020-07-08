import gql from "graphql-tag";
import { Thunk } from "Store";
import { AppSyncClient } from "App";
import {
  User,
  USERS_GET_INITIAL_REQUEST_START,
  USERS_GET_INITIAL_REQUEST_SUCCESS,
  USERS_GET_INITIAL_REQUEST_ERROR,
  USERS_GET_MORE_REQUEST_START,
  USERS_GET_MORE_REQUEST_SUCCESS,
  USERS_GET_MORE_REQUEST_ERROR,
  USER_MUTATION_REQUEST_START,
  USER_MUTATION_REQUEST_SUCCESS,
  USER_MUTATION_REQUEST_ERROR,
  DISMISS_ERRORS,
} from "./reducer";
import { listUsers, getUser } from "graphql/queries";
import { updateUser } from "graphql/mutations";

export const getInitialUsers = (): Thunk => async (
  dispatch,
  getState,
  APIClient
): Promise<any> => {
  const { limit, nextToken } = getState().users;

  dispatch({
    type: USERS_GET_INITIAL_REQUEST_START,
  });

  try {
    const resultData = await fetchUsers({ APIClient, limit, nextToken });

    dispatch({
      type: USERS_GET_INITIAL_REQUEST_SUCCESS,
      payload: { items: resultData.items, nextToken: resultData.nextToken },
    });
  } catch (e) {
    dispatch({
      type: USERS_GET_INITIAL_REQUEST_ERROR,
      payload: e.message,
    });
  }
};

export const getMoreUsers = (): Thunk => async (
  dispatch,
  getState,
  APIClient
): Promise<any> => {
  const { limit, nextToken } = getState().users;

  dispatch({
    type: USERS_GET_MORE_REQUEST_START,
  });

  try {
    const resultData = await fetchUsers({ APIClient, limit, nextToken });

    dispatch({
      type: USERS_GET_MORE_REQUEST_SUCCESS,
      payload: { items: resultData.items, nextToken: resultData.nextToken },
    });
  } catch (e) {
    dispatch({
      type: USERS_GET_MORE_REQUEST_ERROR,
      payload: e.message,
    });
  }
};

const userItemFormatter = (item: User) => ({
  ...item,
  __typename: undefined,
});

const fetchUsers = async ({
  APIClient,
  limit,
  nextToken,
}: {
  APIClient: AppSyncClient;
  limit: number;
  nextToken: string | undefined;
}) => {
  try {
    const query = gql(listUsers);
    const result: any = await APIClient.query({
      query,
      variables: { limit, nextToken },
      fetchPolicy: "network-only",
    });
    const { data } = result;
    const formattedItems = data.listUsers.items.map(userItemFormatter);
    const resultNextToken = data.listUsers.nextToken;

    return { items: formattedItems, nextToken: resultNextToken };
  } catch (e) {
    throw e;
  }
};

export const dismissErrors = () => ({
  type: DISMISS_ERRORS,
});

export const mutateUser = ({
  user,
  updatedData,
  callback,
}: {
  user: User;
  updatedData: { name: string; address: string; description: string };
  callback: Function;
}): Thunk => async (dispatch, getState, APIClient): Promise<any> => {
  dispatch({
    type: USER_MUTATION_REQUEST_START,
  });

  try {
    const mutation = gql(updateUser);
    const input = { ...user, ...updatedData };

    await APIClient.mutate({
      mutation,
      variables: { input },
      fetchPolicy: "no-cache",
    });

    dispatch(reloadAllUsers(callback));
  } catch (e) {
    dispatch({
      type: USER_MUTATION_REQUEST_ERROR,
      payload: e.message,
    });
  }
};

const reloadAllUsers = (callback: Function): Thunk => async (
  dispatch,
  getState,
  APIClient
): Promise<any> => {
  const { items } = getState().users;

  try {
    const query = gql(getUser);
    const result: any = await Promise.all(
      items.map(({ UserID }: { UserID: string }) =>
        APIClient.query({
          query,
          variables: { UserID },
          fetchPolicy: "network-only",
        })
      )
    );
    const resultsData = result.map(({ data }: any) =>
      userItemFormatter(data.getUser)
    );

    dispatch({
      type: USER_MUTATION_REQUEST_SUCCESS,
      payload: resultsData,
    });

    callback();
  } catch (e) {
    dispatch({
      type: USER_MUTATION_REQUEST_ERROR,
      payload: e.message,
    });
  }
};
