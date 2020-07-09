import { CreateUserInput } from "API";

export interface User extends CreateUserInput {
  avatarHref: string | undefined;
  geolocation: [number, number] | undefined;
}

export interface UsersState {
  pagesFetched: Array<number>;
  filter: string;
  limit: number;
  nextToken: string | undefined;
  items: Array<User>;
  apiFilteredItems: Array<User>;
  errors: Array<string>;
  isGetRequestLoading: boolean;
  isGetMoreRequestLoading: boolean;
  isGetFilteredRequestLoading: boolean;
  isMutationRequestLoading: boolean;
}

const initialState: UsersState = {
  pagesFetched: [],
  filter: "",
  limit: 6,
  nextToken: undefined,
  items: [],
  apiFilteredItems: [],
  errors: [],
  isGetRequestLoading: false,
  isGetMoreRequestLoading: false,
  isGetFilteredRequestLoading: false,
  isMutationRequestLoading: false,
};

export const USERS_GET_REQUEST_START = "USERS_GET_REQUEST_START";
export const USERS_GET_REQUEST_SUCCESS = "USERS_GET_REQUEST_SUCCESS";
export const USERS_GET_REQUEST_ERROR = "USERS_GET_REQUEST_ERROR";
export const USERS_GET_MORE_REQUEST_START = "USERS_GET_MORE_REQUEST_START";
export const USERS_GET_MORE_REQUEST_SUCCESS = "USERS_GET_MORE_REQUEST_SUCCESS";
export const USERS_GET_MORE_REQUEST_ERROR = "USERS_GET_MORE_REQUEST_ERROR";
export const FILTER_VALUE_CHANGED = "FILTER_VALUE_CHANGED";
export const USERS_FILTER_GET_REQUEST_START = "USERS_FILTER_GET_REQUEST_START";
export const USERS_FILTER_GET_REQUEST_SUCCESS =
  "USERS_FILTER_GET_REQUEST_SUCCESS";
export const USERS_FILTER_GET_REQUEST_ERROR = "USERS_FILTER_GET_REQUEST_ERROR";
export const USER_MUTATION_REQUEST_START = "USER_MUTATION_REQUEST_START";
export const USER_MUTATION_REQUEST_SUCCESS = "USER_MUTATION_REQUEST_SUCCESS";
export const USER_MUTATION_REQUEST_ERROR = "USER_MUTATION_REQUEST_ERROR";
export const USERS_RELOAD_REQUESTS_START = "USERS_RELOAD_REQUESTS_START";
export const USERS_RELOAD_REQUESTS_SUCCESS = "USERS_RELOAD_REQUESTS_SUCCESS";
export const USERS_RELOAD_REQUESTS_ERROR = "USERS_RELOAD_REQUESTS_ERROR";
export const DISMISS_ERRORS = "DISMISS_ERRORS";

export type UsersActions =
  | { type: typeof USERS_GET_REQUEST_START }
  | {
      type: typeof USERS_GET_REQUEST_SUCCESS;
      payload: {
        items: Array<User>;
        nextToken: string;
        pagesFetched: Array<number>;
      };
    }
  | {
      type: typeof USERS_GET_REQUEST_ERROR;
      payload: string;
    }
  | { type: typeof USERS_GET_MORE_REQUEST_START }
  | {
      type: typeof USERS_GET_MORE_REQUEST_SUCCESS;
      payload: {
        items: Array<User>;
        nextToken: string;
        pagesFetched: Array<number>;
      };
    }
  | {
      type: typeof USERS_GET_MORE_REQUEST_ERROR;
      payload: string;
    }
  | { type: typeof USERS_FILTER_GET_REQUEST_START }
  | {
      type: typeof USERS_FILTER_GET_REQUEST_SUCCESS;
      payload: Array<User>;
    }
  | {
      type: typeof USERS_FILTER_GET_REQUEST_ERROR;
      payload: string;
    }
  | { type: typeof USER_MUTATION_REQUEST_START }
  | {
      type: typeof USER_MUTATION_REQUEST_SUCCESS;
      payload: Array<User>; // prob should be just one
    }
  | {
      type: typeof USER_MUTATION_REQUEST_ERROR;
      payload: string;
    }
  | {
      type: typeof DISMISS_ERRORS;
    }
  | {
      type: typeof FILTER_VALUE_CHANGED;
      payload: string;
    };

export default (
  state: UsersState = initialState,
  action: UsersActions
): UsersState => {
  switch (action.type) {
    case USERS_GET_REQUEST_START:
      return {
        ...state,
        isGetRequestLoading: true,
      };

    case USERS_GET_REQUEST_SUCCESS:
      return {
        ...state,
        items: state.items.concat(action.payload.items),
        nextToken: action.payload.nextToken,
        pagesFetched: state.pagesFetched
          .concat(action.payload.pagesFetched)
          .sort((a: number, b: number): number => a - b),
        isGetRequestLoading: false,
      };

    case USERS_GET_REQUEST_ERROR:
      return {
        ...state,
        errors: state.errors.concat([action.payload]),
        isGetRequestLoading: false,
      };

    case USERS_GET_MORE_REQUEST_START:
      return {
        ...state,
        isGetMoreRequestLoading: true,
      };

    case USERS_GET_MORE_REQUEST_SUCCESS:
      return {
        ...state,
        items: state.items.concat(action.payload.items),
        nextToken: action.payload.nextToken,
        pagesFetched: state.pagesFetched
          .concat(action.payload.pagesFetched)
          .sort((a: number, b: number): number => a - b),
        isGetMoreRequestLoading: false,
      };

    case USERS_GET_MORE_REQUEST_ERROR:
      return {
        ...state,
        errors: state.errors.concat([action.payload]),
        isGetMoreRequestLoading: false,
      };

    case FILTER_VALUE_CHANGED:
      return action.payload.trim()
        ? {
            ...state,
            filter: action.payload,
          }
        : {
            ...state,
            filter: action.payload,
            apiFilteredItems: [],
          };

    case USERS_FILTER_GET_REQUEST_START:
      return {
        ...state,
        isGetFilteredRequestLoading: true,
      };

    case USERS_FILTER_GET_REQUEST_SUCCESS:
      return {
        ...state,
        apiFilteredItems: action.payload,
        isGetFilteredRequestLoading: false,
      };

    case USERS_FILTER_GET_REQUEST_ERROR:
      return {
        ...state,
        errors: state.errors.concat([action.payload]),
        isGetFilteredRequestLoading: false,
      };

    case USER_MUTATION_REQUEST_START:
      return {
        ...state,
        isMutationRequestLoading: true,
      };

    case USER_MUTATION_REQUEST_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isMutationRequestLoading: false,
      };

    case USER_MUTATION_REQUEST_ERROR:
      return {
        ...state,
        errors: state.errors.concat([action.payload]),
        isMutationRequestLoading: false,
      };

    case DISMISS_ERRORS:
      return {
        ...state,
        errors: [],
      };

    default:
      return state;
  }
};
