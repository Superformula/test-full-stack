import gql from "graphql-tag";
import { Thunk } from "Store";
import { AppSyncClient } from "App";
import {
  User,
  USERS_GET_REQUEST_START,
  USERS_GET_REQUEST_SUCCESS,
  USERS_GET_REQUEST_ERROR,
  USERS_GET_MORE_REQUEST_START,
  USERS_GET_MORE_REQUEST_SUCCESS,
  USERS_GET_MORE_REQUEST_ERROR,
  FILTER_VALUE_CHANGED,
  USERS_FILTER_GET_REQUEST_START,
  USERS_FILTER_GET_REQUEST_SUCCESS,
  USERS_FILTER_GET_REQUEST_ERROR,
  USER_MUTATION_REQUEST_START,
  USER_MUTATION_REQUEST_SUCCESS,
  USER_MUTATION_REQUEST_ERROR,
  DISMISS_ERRORS,
} from "./reducer";
import { listUsers, getUser, getUserGeolocation } from "graphql/queries";
import { updateUser } from "graphql/mutations";

export const getUsers = (page: number): Thunk => async (
  dispatch,
  getState,
  APIClient
): Promise<any> => {
  const userReducerState = getState().users;
  const lastPageFetched =
    userReducerState.pagesFetched.length > 0
      ? userReducerState.pagesFetched[userReducerState.pagesFetched.length - 1]
      : 0;
  const additionalPagesNeeded = page - lastPageFetched;
  const limit = additionalPagesNeeded * userReducerState.limit;
  const pagesFetched = [
    ...Array.from(new Array(additionalPagesNeeded).keys()).map(
      (i) => i + 1 + lastPageFetched
    ),
  ];

  dispatch({
    type:
      lastPageFetched === 0
        ? USERS_GET_REQUEST_START
        : USERS_GET_MORE_REQUEST_START,
  });

  try {
    const resultData = await fetchUsers({
      APIClient,
      limit,
      nextToken: userReducerState.nextToken,
    });

    dispatch({
      type:
        lastPageFetched === 0
          ? USERS_GET_REQUEST_SUCCESS
          : USERS_GET_MORE_REQUEST_SUCCESS,
      payload: {
        items: resultData.items,
        nextToken: resultData.nextToken,
        pagesFetched,
      },
    });
  } catch (e) {
    dispatch({
      type:
        lastPageFetched === 0
          ? USERS_GET_REQUEST_ERROR
          : USERS_GET_MORE_REQUEST_ERROR,
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
    const formattedItems: Array<User> = data.listUsers.items.map(
      userItemFormatter
    );
    const formattedWithAvatars: Array<User> = await Promise.all(
      formattedItems.map(attachUserAvatar)
    );
    const formattedWithGeolocations: Array<User> = await Promise.all(
      formattedWithAvatars.map(attachUserGeolocation(APIClient))
    );
    const resultNextToken = data.listUsers.nextToken;

    return { items: formattedWithGeolocations, nextToken: resultNextToken };
  } catch (e) {
    throw e;
  }
};

const attachUserAvatar = async (user: User): Promise<User> => {
  const machoManAvatarData = {
    urls: {
      thumb:
        "https://popgun.blob.core.windows.net/popgunv3resize/macho-man-champion-2017-05-11.jpg",
    },
  };
  const avatarResult = await window.fetch(
    `https://api.unsplash.com/photos/random?client_id=LtRzXOc8vfRgfRE10dqHzXNNdHbvQ3ZF2LfVGV9nXDo&randomizer=${user.UserID}`
  );
  const avatarData = await (avatarResult.ok // rate limiting for unsplash free tier
    ? avatarResult.json()
    : Promise.resolve(machoManAvatarData));
  const avatarHref = avatarData.urls.thumb;

  return { ...user, avatarHref };
};

const attachUserGeolocation = (APIClient: AppSyncClient) => async (
  user: User
): Promise<User> => {
  const { address } = user;
  const query = gql(getUserGeolocation);
  const result: any = await APIClient.query({
    query,
    variables: { address },
    fetchPolicy: "network-only",
  });
  const { longitude, latitude } = result.data.getUserGeolocation;

  return {
    ...user,
    geolocation: [longitude, latitude],
  };
};

export const dismissErrors = () => ({
  type: DISMISS_ERRORS,
});

const userMutateItemFormatted = (user: User) => ({
  ...user,
  avatarHref: undefined,
  geolocation: undefined,
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
    const input = userMutateItemFormatted({ ...user, ...updatedData });

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
    const formattedWithAvatars: Array<User> = await Promise.all(
      resultsData.map(attachUserAvatar)
    );
    const formattedWithGeolocations: Array<User> = await Promise.all(
      formattedWithAvatars.map(attachUserGeolocation(APIClient))
    );

    dispatch({
      type: USER_MUTATION_REQUEST_SUCCESS,
      payload: formattedWithGeolocations,
    });

    callback();
  } catch (e) {
    dispatch({
      type: USER_MUTATION_REQUEST_ERROR,
      payload: e.message,
    });
  }
};

const getUniqueByUserID = (items: Array<User>): Array<User> =>
  items.reduce(
    (acc, item) => {
      const { accumulatedUserIDs, uniqueUsers } = acc;

      if (!accumulatedUserIDs.has(item.UserID)) {
        accumulatedUserIDs.add(item.UserID);

        return {
          accumulatedUserIDs, // @ts-ignore
          uniqueUsers: uniqueUsers.concat([item]),
        };
      }

      return {
        accumulatedUserIDs,
        uniqueUsers,
      };
    },
    { accumulatedUserIDs: new Set(), uniqueUsers: [] }
  ).uniqueUsers;

export const setFilterInputValue = (value: string): Thunk => async (
  dispatch,
  getState,
  APIClient
): Promise<any> => {
  const trimmedSearchValue = value.trim();

  dispatch({ type: FILTER_VALUE_CHANGED, payload: value });

  if (trimmedSearchValue) {
    dispatch({ type: USERS_FILTER_GET_REQUEST_START });

    try {
      const query = gql(listUsers);
      const [
        nameResult,
        descriptionResult,
        addressResult,
      ]: any = await Promise.all([
        APIClient.query({
          query,
          variables: {
            filter: {
              name: { contains: trimmedSearchValue },
            },
          },
          fetchPolicy: "network-only",
        }),
        APIClient.query({
          query,
          variables: {
            filter: {
              description: { contains: trimmedSearchValue },
            },
          },
          fetchPolicy: "network-only",
        }),
        APIClient.query({
          query,
          variables: {
            filter: {
              address: { contains: trimmedSearchValue },
            },
          },
          fetchPolicy: "network-only",
        }),
      ]);
      const items = getUniqueByUserID(
        nameResult.data.listUsers.items.concat(
          descriptionResult.data.listUsers.items.concat(
            addressResult.data.listUsers.items
          )
        )
      );
      const formattedItems: Array<User> = items.map(userItemFormatter);
      const formattedWithAvatars: Array<User> = await Promise.all(
        formattedItems.map(attachUserAvatar)
      );
      const formattedWithGeolocations: Array<User> = await Promise.all(
        formattedWithAvatars.map(attachUserGeolocation(APIClient))
      );

      dispatch({
        type: USERS_FILTER_GET_REQUEST_SUCCESS,
        payload: formattedWithGeolocations,
      });
    } catch (e) {
      dispatch({
        type: USERS_FILTER_GET_REQUEST_ERROR,
        payload: e.message,
      });
    }
  }
};
