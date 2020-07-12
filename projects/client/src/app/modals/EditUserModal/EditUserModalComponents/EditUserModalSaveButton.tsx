import * as React from 'react';
import Button from '../../../../components/button/Button';
import LoadingIndicator from '../../../../components/loading-indicator/LoadingIndicator';
import { connect, ConnectedProps } from "react-redux";
import { getSaveUser, getHide } from '../EditUserModalActionCreators';
import type { RootState } from '../../../../store/configure-store'

import './edit-user-modal-body.css';

const mapStateToProps = (state: RootState) => {
    return { 
        editUser: state.editUser.editUser,
        user: state.editUser.user,
        isSaving: state.editUser.isSaving
    };
};

const mapDispatchToProps = {
    getSaveUser: getSaveUser,
    getHide: getHide
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const EditUserModalSaveButton: React.FunctionComponent<PropsFromRedux> = (props: PropsFromRedux) => {
    const { editUser, getSaveUser, getHide, user, isSaving  } = props;
    return (
        <Button id="user-save-button" className="modal-input-button" onClick={(e) => {
            getSaveUser(user, editUser);
        }}>
            {!isSaving ? "Save" : <LoadingIndicator style={{ width: '24px', height: '24px', margin: 'auto' }}/>}
        </Button>
    );
}

const EditUserModalSaveButtonComponent = connector(EditUserModalSaveButton);
export default EditUserModalSaveButtonComponent;