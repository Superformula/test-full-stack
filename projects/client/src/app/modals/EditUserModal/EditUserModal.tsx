import * as React from 'react';
import { connect, ConnectedProps } from "react-redux";
import EditUserModalBody from "./EditUserModalComponents/EditUserModalBody";
import EditUserModalHeader from "./EditUserModalComponents/EditUserModalHeader";
import EditUserModalFooter from "./EditUserModalComponents/EditUserModalFooter";
import type { RootState } from '../../../store/configure-store'

import './edit-user-modal.css';

const mapStateToProps = (state: RootState) => {
    return {
        user: state.editUser.user
    };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const EditUserModal: React.FunctionComponent<PropsFromRedux> = (props: PropsFromRedux) => {
    const { user } = props;
    let overlayClasses = "modal-overlay";
    let modalClasses = "modal";

    if (user) {
        overlayClasses += ' modal-visible';
        modalClasses += ' modal-fade-in';
    }

    return (
        <div className={overlayClasses}>
            <div className={modalClasses}>
                <EditUserModalHeader/>
                <EditUserModalBody user={user}/>
                <EditUserModalFooter/>
            </div>
        </div>
    );
}

const EditUserModalComponent = connector(EditUserModal);
export default EditUserModalComponent;