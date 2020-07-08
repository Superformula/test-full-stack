import gql from "graphql-tag";
import { Thunk } from "Store";
import {
  User,
  USERS_GET_REQUEST_START,
  USERS_GET_REQUEST_SUCCESS,
  USERS_GET_REQUEST_ERROR,
  USER_MUTATION_REQUEST_START,
  USER_MUTATION_REQUEST_SUCCESS,
  USER_MUTATION_REQUEST_ERROR,
  DISMISS_ERRORS,
} from "./reducer";
import { listUsers, getUser } from "graphql/queries";
import { updateUser } from "graphql/mutations";

export const getUsers = (): Thunk => async (
  dispatch,
  getState,
  client
): Promise<any> => {
  const { limit, nextToken } = getState().users;

  dispatch({
    type: USERS_GET_REQUEST_START,
  });

  try {
    const query = gql(listUsers);
    const result: any = await client.query({
      query,
      variables: { limit, nextToken },
      fetchPolicy: "network-only",
    });
    const { data } = result;
    const formattedItems = data.listUsers.items.map((item: User) => ({
      ...item,
      __typename: undefined,
    }));
    const resultNextToken = data.listUsers.nextToken;

    dispatch({
      type: USERS_GET_REQUEST_SUCCESS,
      payload: { items: formattedItems, nextToken: resultNextToken },
    });
  } catch (e) {
    dispatch({
      type: USERS_GET_REQUEST_ERROR,
      payload: e.message,
    });
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
}): Thunk => async (dispatch, getState, client): Promise<any> => {
  dispatch({
    type: USER_MUTATION_REQUEST_START,
  });

  try {
    const mutation = gql(updateUser);
    const input = { ...user, ...updatedData };

    await client.mutate({
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
  client
): Promise<any> => {
  const { items } = getState().users;

  try {
    const query = gql(getUser);
    const result: any = await Promise.all(
      items.map(({ UserID }: { UserID: string }) =>
        client.query({
          query,
          variables: { UserID },
          fetchPolicy: "network-only",
        })
      )
    );
    const resultsData = result.map(({ data }: any) => ({
      ...data.getUser,
      __typename: undefined,
    }));

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
