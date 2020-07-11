import type { APIUserModel } from "../../../api/api-types";
import { AsynchronousActionStatus, AsynchronousAction } from "../../../store/AsynchronousRedux";

export enum EditUserModalActionTypes {
    SHOW = "EDIT_USER_MODAL_SHOW",
    HIDE = "EDIT_USER_MODAL_HIDE",
    EDIT = "EDIT_USER_MODAL_EDIT",
    SAVE = "EDIT_USER_MODAL_SAVE"
}

export interface EditUserModalEdits {
    name?: string,
    address?: string,
    description?: string
}

export interface EditUserModalState {
    user?: APIUserModel; 
    isSaving: boolean;
    editUser: EditUserModalEdits; // Used to store temp data before saving!
}

export interface EditUserModalAction {
    type: EditUserModalActionTypes;
}

export interface EditUserModalShowAction extends EditUserModalAction {
    user: APIUserModel;
}

export interface EditUserModalEditAction extends EditUserModalAction {
    name?: string; // Null is assumed to be unchanged.
    address?: string;
    description?: string;
}

export interface EditUserModalSaveAction extends EditUserModalAction, AsynchronousAction {
    user?: APIUserModel; // Only on success
}