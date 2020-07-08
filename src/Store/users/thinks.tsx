import gql from "graphql-tag";
import { Thunk } from "Store";
import {
  USERS_GET_REQUEST_START,
  USERS_GET_REQUEST_SUCCESS,
  USERS_GET_REQUEST_ERROR,
} from "./reducer";
import { listUsers } from "graphql/queries";

export const getUsers = (page: number | undefined): Thunk => async (
  dispatch,
  getState,
  client
): Promise<any> => {
  dispatch({
    type: USERS_GET_REQUEST_START,
  });

  try {
    const result: any = await client.query({ query: gql(listUsers) });
    const { data } = result;

    console.log(result);

    dispatch({
      type: USERS_GET_REQUEST_SUCCESS,
      payload: data.listUsers.items,
    });
  } catch (e) {
    dispatch({
      type: USERS_GET_REQUEST_ERROR,
      payload: e.message,
    });
  }
};
