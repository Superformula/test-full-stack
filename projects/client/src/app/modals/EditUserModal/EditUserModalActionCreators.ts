import { APIUserModel } from "../../../api/api-types";
import { EditUserModalShowAction, EditUserModalActionTypes, EditUserModalAction, EditUserModalEditAction, EditUserModalSaveAction, EditUserModalEdits } from "./EditUserModalRedux";
import { AsynchronousActionStatus } from "../../../store/AsynchronousRedux";
import { fetchUpdateUser } from "../../../api/graphql/fetch-update-user";
import { getUpdateCachedUser } from '../../views/UsersList/UsersListActionCreators';

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

        let updateUser: APIUserModel = {
            ...user,
            ...edits
        };

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