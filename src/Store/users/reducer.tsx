import { CreateUserInput } from "API";

export type User = CreateUserInput;

export interface UsersState {
  limit: number;
  nextToken: string | undefined;
  items: Array<User>;
  errors: Array<string>;
  isGetRequestLoading: boolean;
  isGetMoreRequestLoading: boolean;
  isMutationRequestLoading: boolean;
}

const initialState: UsersState = {
  limit: 6,
  nextToken: undefined,
  items: [],
  errors: [],
  isGetRequestLoading: false,
  isGetMoreRequestLoading: false,
  isMutationRequestLoading: false,
};

export const USERS_GET_INITIAL_REQUEST_START =
  "USERS_GET_INITIAL_REQUEST_START";
export const USERS_GET_INITIAL_REQUEST_SUCCESS =
  "USERS_GET_INITIAL_REQUEST_SUCCESS";
export const USERS_GET_INITIAL_REQUEST_ERROR =
  "USERS_GET_INITIAL_REQUEST_ERROR";
export const USERS_GET_MORE_REQUEST_START = "USERS_GET_MORE_REQUEST_START";
export const USERS_GET_MORE_REQUEST_SUCCESS = "USERS_GET_MORE_REQUEST_SUCCESS";
export const USERS_GET_MORE_REQUEST_ERROR = "USERS_GET_MORE_REQUEST_ERROR";
export const USER_MUTATION_REQUEST_START = "USER_MUTATION_REQUEST_START";
export const USER_MUTATION_REQUEST_SUCCESS = "USER_MUTATION_REQUEST_SUCCESS";
export const USER_MUTATION_REQUEST_ERROR = "USER_MUTATION_REQUEST_ERROR";
export const USERS_RELOAD_REQUESTS_START = "USERS_RELOAD_REQUESTS_START";
export const USERS_RELOAD_REQUESTS_SUCCESS = "USERS_RELOAD_REQUESTS_SUCCESS";
export const USERS_RELOAD_REQUESTS_ERROR = "USERS_RELOAD_REQUESTS_ERROR";
export const DISMISS_ERRORS = "DISMISS_ERRORS";

export type UsersActions =
  | { type: typeof USERS_GET_INITIAL_REQUEST_START }
  | {
      type: typeof USERS_GET_INITIAL_REQUEST_SUCCESS;
      payload: { items: Array<User>; nextToken: string };
    }
  | {
      type: typeof USERS_GET_INITIAL_REQUEST_ERROR;
      payload: string;
    }
  | { type: typeof USERS_GET_MORE_REQUEST_START }
  | {
      type: typeof USERS_GET_MORE_REQUEST_SUCCESS;
      payload: { items: Array<User>; nextToken: string };
    }
  | {
      type: typeof USERS_GET_MORE_REQUEST_ERROR;
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
    };

export default (
  state: UsersState = initialState,
  action: UsersActions
): UsersState => {
  switch (action.type) {
    case USERS_GET_INITIAL_REQUEST_START:
      return {
        ...state,
        isGetRequestLoading: true,
      };

    case USERS_GET_INITIAL_REQUEST_SUCCESS:
      return {
        ...state,
        items: action.payload.items,
        nextToken: action.payload.nextToken,
        isGetRequestLoading: false,
      };

    case USERS_GET_INITIAL_REQUEST_ERROR:
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
        isGetMoreRequestLoading: false,
      };

    case USERS_GET_MORE_REQUEST_ERROR:
      return {
        ...state,
        errors: state.errors.concat([action.payload]),
        isGetMoreRequestLoading: false,
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
