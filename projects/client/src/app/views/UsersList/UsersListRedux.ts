import type { APINextToken, APIUserModel } from "../../../api/api-types";
import { AsynchronousAction } from "../../../store/AsynchronousRedux";

export enum UsersListActionTypes {
    FETCH_PAGES = "USERS_LIST_FETCH_PAGES",
    FILTER = "USERS_LIST_FILTER",
    UPDATE_CACHED_USER = "USERS_LIST_UPDATE_CACHED_USER"
}

export interface UsersListStateUserMap {
    [x: string]: APIUserModel;
}

export interface UsersListState {
    users: UsersListStateUserMap; // Keep user in hash-map so we can quickly look them up.
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

export interface UsersListFilterAction extends UsersListAction {
    filter: string;
}

export interface UsersListUpdateCachedUserAction extends UsersListAction {
    user: APIUserModel
}