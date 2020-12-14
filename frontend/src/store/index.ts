import { CombinedState, combineReducers, Reducer } from 'redux';
import userListReducer from './userList/reducer';
import { UserListAction, UserListState } from './userList/types';

export type RootState = {
  usersRoot: UserListState;
};

const rootReducer: Reducer<CombinedState<RootState>, UserListAction> = combineReducers({
  usersRoot: userListReducer,
});

export default rootReducer;
