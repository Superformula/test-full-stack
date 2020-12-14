import { combineReducers } from 'redux';
import userListReducer from './userList/reducer';

const rootReducer = combineReducers({
  users: userListReducer,
});

export default rootReducer;
