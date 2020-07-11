import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

// Normally I flip this pattern around - where the reducer 'add itself' to the root reducer, 
// but this app is small enough where this is ok
import { reduceUsersList } from '../app/views/UsersList/UsersListReducer';
import { reduceEditUserModal } from "../app/modals/EditUserModal/EditUserModalReducer";

const rootReducer = combineReducers({
    usersList: reduceUsersList,
    editUser: reduceEditUserModal
});
export type RootState = ReturnType<typeof rootReducer>;

const withMiddleware = applyMiddleware(thunkMiddleware);

export function configureStore() {

    const store = createStore(rootReducer, {}, withMiddleware);

    return store;
}