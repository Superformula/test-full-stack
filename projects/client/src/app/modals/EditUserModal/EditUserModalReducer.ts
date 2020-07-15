import { EditUserModalActionTypes, EditUserModalEditAction, EditUserModalSaveAction, EditUserModalUpdateLocationAction } from './EditUserModalRedux';

import type { EditUserModalState, EditUserModalAction, EditUserModalShowAction } from './EditUserModalRedux';
import { AsynchronousActionStatus } from '../../../store/AsynchronousRedux';

export function reduceEditUserModal(state: EditUserModalState, action: EditUserModalAction) : EditUserModalState {
    switch(action.type) {
        case EditUserModalActionTypes.SHOW:
            const showAction = action as EditUserModalShowAction;
            return {
                ...state,
                user: showAction.user
            };
        case EditUserModalActionTypes.HIDE:
            return {
                ...state,
                user: null,
                editUser: {
                    name: null,
                    description: null,
                    address: null
                }
            };
        case EditUserModalActionTypes.EDIT:
            const editAction = action as EditUserModalEditAction;
            const newState = {
                ...state,
                editUser: { ...state.editUser }
            };

            if (typeof editAction.name === 'string') {
                newState.editUser.name = editAction.name;
            }
            if (typeof editAction.address === 'string') {
                newState.editUser.address = editAction.address;
            }
            if (typeof editAction.description === 'string') {
                newState.editUser.description = editAction.description;
            }

            return newState;
        case EditUserModalActionTypes.SAVE:
            const saveAction = action as EditUserModalSaveAction;
            if (saveAction.status === AsynchronousActionStatus.IN_PROGRESS) {
                return {
                    ...state,
                    isSaving: true,
                    editUser: {
                        name: null,
                        description: null,
                        address: null
                    }
                };
            }
            else if (saveAction.status === AsynchronousActionStatus.SUCCESS) {
                return {
                    ...state,
                    isSaving: false,
                    user: null,
                };
            }
            else {
                return {
                    ...state,
                    isSaving: false
                };
            }
        case EditUserModalActionTypes.UPDATE_LOCATION:
            const updateLocationAction = action as EditUserModalUpdateLocationAction;
            if (updateLocationAction.status === AsynchronousActionStatus.IN_PROGRESS) {
                return {
                    ...state,
                    isUpdatingLocation: true
                };
            }
            else if (updateLocationAction.status === AsynchronousActionStatus.SUCCESS) {
                return {
                    ...state,
                    displayLocation: updateLocationAction.location,
                    isUpdatingLocation: false
                };
            }
            else {
                return {
                    ...state,
                    displayLocation: null,
                    isUpdatingLocation: false
                };
            }
        default:
            if (state === undefined) {
                return {
                    user: null,
                    isSaving: false,
                    editUser: {
                        name: null,
                        address: null,
                        description: null
                    },
                    displayLocation: null,
                    isUpdatingLocation: false
                };
            }
            else {
                return state;
            }
    }
}