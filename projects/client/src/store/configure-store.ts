import { createStore, combineReducers } from 'redux';

// Normally I flip this pattern around - where the reducer 'add itself' to the root reducer, 
// but this app is small enough where this is ok
import { reduceUsersList } from '../app/views/UsersList/UsersListReducer';


const rootReducer = combineReducers({
    usersList: reduceUsersList
});

export type RootState = ReturnType<typeof rootReducer>;

export function configureStore() {
    const store = createStore(rootReducer, {})

    return store;
}