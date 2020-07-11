import { UsersListActionTypes, UsersListFetchAction, UsersListFilterAction, UsersListUpdateCachedUserAction } from './UsersListRedux';
import { AsynchronousActionStatus } from '../../../store/AsynchronousRedux';
import { incrementPageStateQuery, initializePageState } from '../../../state/page-state-query';
import { fetchGetPages } from "../../../api/graphql/fetch-get-pages";
import { fetchGetNextPage } from "../../../api/graphql/fetch-get-next-page";
import { APIUserModel, APINextToken } from '../../../api/api-types';

export function getUpdateCachedUser(user: APIUserModel) : UsersListUpdateCachedUserAction {
    return {
        type: UsersListActionTypes.UPDATE_CACHED_USER,
        user: user
    };
}

export function getUpdateFilter(filter: string) : UsersListFilterAction {
    return {
        type: UsersListActionTypes.FILTER,
        filter: filter
    }
}

function getPagesSuccess(users: APIUserModel[], nextToken: APINextToken) : UsersListFetchAction {
    return {
        status: AsynchronousActionStatus.SUCCESS,
        type: UsersListActionTypes.FETCH_PAGES,
        users: users,
        nextToken: nextToken
    }
}

function getPagesFailed() : UsersListFetchAction {
    return {
        status: AsynchronousActionStatus.FAILURE,
        type: UsersListActionTypes.FETCH_PAGES
    };
}

function getPagesInProgress() : UsersListFetchAction {
    return {
        status: AsynchronousActionStatus.IN_PROGRESS,
        type: UsersListActionTypes.FETCH_PAGES
    };
}

export function getPages(pageCount: number, filter: string) {
    return (dispatch) => {
        dispatch(getPagesInProgress());

        const errorTimeout = setTimeout(() => {
            dispatch(getPagesFailed());
        }, 6000);

        return fetchGetPages(pageCount, filter).then((resp) => {
            clearTimeout(errorTimeout);

            dispatch(getPagesSuccess(resp.users, resp.nextToken));
            initializePageState();
        }).catch((err) => {
            console.error(err);

            dispatch(getPagesFailed());
        });
    }
}

export function getNextPage(nextToken: APINextToken, filter: string) {
    return (dispatch) => {
        dispatch(getPagesInProgress());

        const errorTimeout = setTimeout(() => {
            dispatch(getPagesFailed());
        }, 6000);

        return fetchGetNextPage(nextToken, filter).then((resp) => {
            clearTimeout(errorTimeout);

            dispatch(getPagesSuccess(resp.users, resp.nextToken));
            incrementPageStateQuery();
        }).catch((err) => {
            console.error(err);

            dispatch(getPagesFailed());
        });
    }
}