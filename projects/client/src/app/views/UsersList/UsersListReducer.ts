import type { APINextToken, APIUserModel } from "../../../api/api-types";

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

export interface UsersListState {
    users: APIUserModel[];
    displayUsers: APIUserModel[];
    nextToken?: APINextToken;
    isLoadingUsers: boolean;
    isLoadMoreAvailable: boolean;
    filter: string;
}

export enum UsersListActionTypes {
}

export interface UsersListAction {
    type: UsersListActionTypes;
}

export function reduceUsersList(state: UsersListState, action: UsersListAction) : UsersListState{
    switch(action.type) {
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