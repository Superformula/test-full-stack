import { EditUserModalActionTypes, EditUserModalEditAction, EditUserModalSaveAction } from './EditUserModalRedux';

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
                user: null
            };
        case EditUserModalActionTypes.EDIT:
            const editAction = action as EditUserModalEditAction;
            const newState = {
                ...state,
                editUser: { ...state.editUser }
            };

            if (editAction.name) {
                newState.editUser.name = editAction.name;
            }
            if (editAction.address) {
                newState.editUser.address = editAction.address;
            }
            if (editAction.description) {
                newState.editUser.description = editAction.description;
            }

            return newState;
        case EditUserModalActionTypes.SAVE:
            const saveAction = action as EditUserModalSaveAction;
            if (saveAction.status === AsynchronousActionStatus.IN_PROGRESS) {
                return {
                    ...state,
                    isSaving: true,
                };
            }
            else if (saveAction.status === AsynchronousActionStatus.SUCCESS) {
                return {
                    ...state,
                    isSaving: false
                };
            }
            else {
                return {
                    ...state,
                    isSaving: false
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
                    }
                };
            }
            else {
                return state;
            }
    }
}