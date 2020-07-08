export interface User {
  UserID: string;
  name: string;
  dob?: string;
  address: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsersState {
  data: Array<User>;
  errors: Array<string>;
  isGetRequestLoading: boolean;
  isMutationRequestLoading: boolean;
}

const initialState: UsersState = {
  data: [],
  errors: [],
  isGetRequestLoading: false,
  isMutationRequestLoading: false,
};

export const USERS_GET_REQUEST_START = "USERS_GET_REQUEST_START";
export const USERS_GET_REQUEST_SUCCESS = "USERS_GET_REQUEST_SUCCESS";
export const USERS_GET_REQUEST_ERROR = "USERS_GET_REQUEST_ERROR";
export const USER_MUTATION_REQUEST_START = "USER_MUTATION_REQUEST_START";
export const USER_MUTATION_REQUEST_SUCCESS = "USER_MUTATION_REQUEST_SUCCESS";
export const USER_MUTATION_REQUEST_ERROR = "USER_MUTATION_REQUEST_ERROR";
export const DISMISS_ERRORS = "DISMISS_ERRORS";

export type UsersActions =
  | { type: typeof USERS_GET_REQUEST_START }
  | {
      type: typeof USERS_GET_REQUEST_SUCCESS;
      payload: Array<User>;
    }
  | {
      type: typeof USERS_GET_REQUEST_ERROR;
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
    case USERS_GET_REQUEST_START:
      return {
        ...state,
        isGetRequestLoading: true,
      };

    case USERS_GET_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isGetRequestLoading: false,
      };

    case USERS_GET_REQUEST_ERROR:
      return {
        ...state,
        errors: state.errors.concat([action.payload]),
        isGetRequestLoading: false,
      };

    case USER_MUTATION_REQUEST_START:
      return {
        ...state,
        isMutationRequestLoading: true,
      };

    case USER_MUTATION_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.payload,
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
