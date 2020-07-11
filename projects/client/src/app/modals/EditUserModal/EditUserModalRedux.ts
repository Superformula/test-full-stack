import { AsynchronousActionStatus, AsynchronousAction } from "../../../store/AsynchronousRedux";
import type { APIUserModel } from "../../../api/api-types";
import type { FetchGeoCodeResult } from "../../../api/rest/fetch-geocode";

export enum EditUserModalActionTypes {
    SHOW = "EDIT_USER_MODAL_SHOW",
    HIDE = "EDIT_USER_MODAL_HIDE",
    EDIT = "EDIT_USER_MODAL_EDIT",
    SAVE = "EDIT_USER_MODAL_SAVE",
    UPDATE_LOCATION = "EDIT_USER_MODAL_UPDATE_LOCATION"
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
    displayLocation: {
        lat: number;
        lng: number;
    } | null;
    isUpdatingLocation: boolean;
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

export interface EditUserModalUpdateLocationAction extends EditUserModalAction, AsynchronousAction {
    location?: FetchGeoCodeResult; // On success
}