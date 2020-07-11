import type { APINextToken, APIUserModel } from "../../../api/api-types";
import { UsersListActionTypes } from './UsersListRedux';
import type { UsersListState, UsersListAction, UsersListFetchAction } from './UsersListRedux';
import { AsynchronousActionStatus } from "../../../store/AsynchronousRedux";

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
        case UsersListActionTypes.FETCH_PAGES:
            let event = action as UsersListFetchAction;
            if (event.status === AsynchronousActionStatus.IN_PROGRESS) {
                return {
                    ...state,
                    isLoadingUsers: true,
                };
            }
            else if (event.status === AsynchronousActionStatus.SUCCESS) {
                return {
                    ...state,
                    users: state.users.concat(event.users || []) || [],
                    nextToken: event.nextToken,
                    isLoadingUsers: false,
                    // If we made a request but got no results
                    isLoadMoreAvailable: !!(event?.users?.length)
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