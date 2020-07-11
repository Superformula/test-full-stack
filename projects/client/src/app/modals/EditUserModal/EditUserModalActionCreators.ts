import { APIUserModel } from "../../../api/api-types";
import { EditUserModalShowAction, EditUserModalActionTypes, EditUserModalAction, EditUserModalEditAction, EditUserModalSaveAction, EditUserModalEdits, EditUserModalUpdateLocationAction } from "./EditUserModalRedux";
import { AsynchronousActionStatus } from "../../../store/AsynchronousRedux";
import { fetchUpdateUser } from "../../../api/graphql/fetch-update-user";
import { getUpdateCachedUser } from '../../views/UsersList/UsersListActionCreators';

import { FetchGeoCodeResult, fetchGeocode } from '../../../api/rest/fetch-geocode'

export function getEditUserName(name: string) : EditUserModalEditAction {
    return {
        type: EditUserModalActionTypes.EDIT,
        name: name
    };
}

export function getEditUserLocation(location: string) : EditUserModalEditAction {
    return {
        type: EditUserModalActionTypes.EDIT,
        address: location
    };
}

export function getEditUserDescription(description: string) : EditUserModalEditAction {
    return {
        type: EditUserModalActionTypes.EDIT,
        description: description
    };
}

export function getShowUser(user: APIUserModel) : EditUserModalShowAction {
    return {
        type: EditUserModalActionTypes.SHOW,
        user: user
    };
}

export function getHide() : EditUserModalAction {
    return {
        type: EditUserModalActionTypes.HIDE
    };
}


function getSaveUserSuccess(user: APIUserModel) : EditUserModalSaveAction {
    return {
        status: AsynchronousActionStatus.SUCCESS,
        type: EditUserModalActionTypes.SAVE,
        user: user
    }
}

function getSaveUserFailure() : EditUserModalSaveAction {
    return {
        status: AsynchronousActionStatus.FAILURE,
        type: EditUserModalActionTypes.SAVE
    };
}

function getSaveUserInProgress() : EditUserModalSaveAction {
    return {
        status: AsynchronousActionStatus.IN_PROGRESS,
        type: EditUserModalActionTypes.SAVE
    };
}

export function getSaveUser(user: APIUserModel, edits: EditUserModalEdits) {
    return (dispatch) => {
        dispatch(getSaveUserInProgress());

        const errorTimeout = setTimeout(() => {
            dispatch(getSaveUserFailure());
        }, 6000);

        const updateUser: APIUserModel = {
            ...user,
        };

        if (edits.name !== null) {
            updateUser.name = edits.name;
        }

        if (edits.address !== null) {
            updateUser.address = edits.address;
        }

        if (edits.description !== null) {
            updateUser.description = edits.description;
        }

        return fetchUpdateUser(updateUser).then((resp: APIUserModel) => {
            clearTimeout(errorTimeout);
            
            dispatch(getSaveUserSuccess(resp));
            dispatch(getUpdateCachedUser(resp));
        }).catch((err) => {
            console.error(err);

            dispatch(getSaveUserFailure());
        });
    }
}


function getFetchLocationSuccess(loc: FetchGeoCodeResult) : EditUserModalUpdateLocationAction {
    return {
        status: AsynchronousActionStatus.SUCCESS,
        type: EditUserModalActionTypes.UPDATE_LOCATION,
        location: loc
    }
}

function getFetchLocationFailure() : EditUserModalUpdateLocationAction {
    return {
        status: AsynchronousActionStatus.FAILURE,
        type: EditUserModalActionTypes.UPDATE_LOCATION
    };
}

function getFetchLocationInProgress() : EditUserModalUpdateLocationAction {
    return {
        status: AsynchronousActionStatus.IN_PROGRESS,
        type: EditUserModalActionTypes.UPDATE_LOCATION
    };
}

export function getFetchLocation(address: string) {
    return (dispatch) => {
        dispatch(getFetchLocationInProgress());

        const errorTimeout = setTimeout(() => {
            dispatch(getFetchLocationFailure());
        }, 6000);

        return fetchGeocode(address).then((resp) => {
            clearTimeout(errorTimeout);

            dispatch(getFetchLocationSuccess(resp));
        }).catch((err) => {
            console.error(err);

            dispatch(getFetchLocationFailure());
        });
    }
}