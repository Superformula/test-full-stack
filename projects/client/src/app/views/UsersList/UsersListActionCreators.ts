import { UsersListActionTypes, UsersListFetchAction, UsersListFilterAction } from './UsersListRedux';
import { AsynchronousActionStatus } from '../../../store/AsynchronousRedux';

import { fetchGetPages } from "../../../api/graphql";
import { APIUserModel, APINextToken } from '../../../api/api-types';

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
        });

        return fetchGetPages(pageCount, filter).then((resp) => {
            clearTimeout(errorTimeout);

            dispatch(getPagesSuccess(resp.users, resp.nextToken));
        }).catch((err) => {
            console.error(err);

            dispatch(getPagesFailed());
        });
    }
}