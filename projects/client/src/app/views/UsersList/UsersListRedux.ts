import type { APINextToken, APIUserModel } from "../../../api/api-types";
import { AsynchronousAction } from "../../../store/AsynchronousRedux";

export enum UsersListActionTypes {
    FETCH_PAGES = "USERS_LIST_FETCH_PAGES"
}

export interface UsersListState {
    users: APIUserModel[];
    displayUsers: APIUserModel[];
    nextToken?: APINextToken;
    isLoadingUsers: boolean;
    isLoadMoreAvailable: boolean;
    filter: string;
}

export interface UsersListAction {
    type: UsersListActionTypes;
}

export interface UsersListFetchAction extends AsynchronousAction, UsersListAction {
    users?: APIUserModel[];
    nextToken?: APINextToken;
    error?: string;
}
