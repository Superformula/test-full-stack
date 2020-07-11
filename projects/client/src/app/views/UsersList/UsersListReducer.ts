import { UsersListActionTypes, UsersListFilterAction } from './UsersListRedux';
import { AsynchronousActionStatus } from "../../../store/AsynchronousRedux";

import type { APINextToken, APIUserModel } from "../../../api/api-types";
import type { UsersListState, UsersListAction, UsersListFetchAction } from './UsersListRedux';
/**
 * Store needs the following
 * 
 * 1. All cached users
 * 2. NextToken
 * 3. Filter
 * 4. Can load more? E.g. no more next token
 * 
 * 5. Is loading users?
 * 
 * 6. Is modal visible?
 */

export function reduceUsersList(state: UsersListState, action: UsersListAction) : UsersListState{
    switch(action.type) {
        case UsersListActionTypes.FILTER:
            const filterAction = action as UsersListFilterAction;
            return {
                ...state,
                filter: filterAction.filter
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
                    users: state.users.concat(fetchAction.users || []) || [],
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
                    users: [],
                    displayUsers: [],
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