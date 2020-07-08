import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware, {
  ThunkDispatch as ThunkDispatchType,
} from "redux-thunk";
import logger from "redux-logger";
import { combineReducers } from "redux";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { AppSyncClient } from "App";
// import App from './App/reducer';
import users from "./users/reducer";

const rootReducer = combineReducers({
  // App,
  users,
});

export type State = ReturnType<typeof rootReducer>;
export type Thunk<ReturnType = void> = ThunkAction<
  ReturnType,
  State,
  AppSyncClient,
  Action<string>
>;
export type ThunkDispatch = ThunkDispatchType<State, AppSyncClient, Action>;

export default ({ APIClient }: { APIClient: AppSyncClient }) =>
  createStore(
    rootReducer,
    composeWithDevTools({})(
      applyMiddleware(thunkMiddleware.withExtraArgument(APIClient), logger)
    )
  );
