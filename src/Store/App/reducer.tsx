export interface AppState {
  setupLoading: boolean;
  setupComplete: boolean;
  setupErrors: Array<string>;
}

const initialState: AppState = {
  setupLoading: false,
  setupComplete: false,
  setupErrors: [],
};

export const APP_SET_UP_START = "APP_SET_UP_START";
export const APP_SET_UP_SUCCESS = "APP_SET_UP_SUCCESS";
export const APP_SET_UP_ERROR = "APP_SET_UP_ERROR";
export const APP_SET_UP_ERRORS_DISMISSED = "APP_SET_UP_ERRORS_DISMISSED";

export type AppActions =
  | { type: typeof APP_SET_UP_START }
  | {
      type: typeof APP_SET_UP_SUCCESS;
    }
  | {
      type: typeof APP_SET_UP_ERROR;
      payload: string;
    }
  | {
      type: typeof APP_SET_UP_ERRORS_DISMISSED;
    };

export default (
  state: AppState = initialState,
  action: AppActions
): AppState => {
  switch (action.type) {
    case APP_SET_UP_START:
      return {
        ...state,
        setupLoading: true,
        setupComplete: false,
      };

    case APP_SET_UP_SUCCESS:
      return {
        ...state,
        setupLoading: false,
        setupComplete: true,
      };

    case APP_SET_UP_ERROR:
      return {
        ...state,
        setupLoading: false,
        setupComplete: true,
        setupErrors: state.setupErrors.concat([action.payload]),
      };

    case APP_SET_UP_ERRORS_DISMISSED:
      return {
        ...state,
        setupErrors: [],
      };

    default:
      return state;
  }
};
