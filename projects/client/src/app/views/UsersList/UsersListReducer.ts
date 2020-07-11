import { UsersListActionTypes, UsersListFilterAction, UsersListStateUserMap, UsersListUpdateCachedUserAction } from './UsersListRedux';
import { AsynchronousActionStatus } from "../../../store/AsynchronousRedux";
import { APIUserModel } from '../../../api/api-types';

import type { UsersListState, UsersListAction, UsersListFetchAction } from './UsersListRedux';
import { EditUserModalActionTypes, EditUserModalSaveAction } from '../../modals/EditUserModal/EditUserModalRedux';

function mergeUserMaps(users: UsersListStateUserMap, newUsers?: APIUserModel[]) : UsersListStateUserMap {
    let result = {
        ...users
    };

    if (!newUsers) {
        return result;
    }

    for(let newUser of newUsers) {
        result[newUser.id] = newUser;
    }

    return result;
}


export function reduceUsersList(state: UsersListState, action: UsersListAction) : UsersListState{
    switch(action.type) {
        case UsersListActionTypes.FILTER:
            const filterAction = action as UsersListFilterAction;
            return {
                ...state,
                filter: filterAction.filter
            };
        case UsersListActionTypes.UPDATE_CACHED_USER:
            const updateCacheAction = action as UsersListUpdateCachedUserAction;
            let users = {
                ...state.users
            };
            users[updateCacheAction.user.id] = updateCacheAction.user;
            return {
                ...state,
                users: users
            };
        case UsersListActionTypes.FETCH_PAGES:
            const fetchAction = action as UsersListFetchAction;
            if (fetchAction.status === AsynchronousActionStatus.IN_PROGRESS) {
                return {
                    ...state,
                    isLoadingUsers: true,
                };
            }
            else if (fetchAction.status === AsynchronousActionStatus.SUCCESS) {
                return {
                    ...state,
                    users: mergeUserMaps(state.users, fetchAction.users),
                    nextToken: fetchAction.nextToken,
                    isLoadingUsers: false,
                    // If we made a request but got no results
                    isLoadMoreAvailable: !!(fetchAction?.users?.length) && !!fetchAction.nextToken
                };
            }
            else {
                // TODO: Error here.
                return {
                    ...state,
                    isLoadingUsers: false
                };
            }
        default:
            if (state === undefined) {
                return {
                    users: {},
                    nextToken: null,
                    isLoadMoreAvailable: true,
                    isLoadingUsers: false,
                    filter: ""
                };
            }
            else {
                return state;
            }
    }
}