import * as React from 'react';
import EditUserModalCancelButton from './EditUserModalCancelButton';

import './edit-user-modal-body.css';
import EditUserModalSaveButton from './EditUserModalSaveButton';

const EditUserModalFooter: React.FunctionComponent = () => {
    return (
        <div className="modal-footer-container">
            <div className="modal-footer-empty-container">

            </div>
            <div className="modal-footer-button-container">
                <EditUserModalSaveButton/>
                <EditUserModalCancelButton/>
            </div>
        </div>
    );
}

export default EditUserModalFooter;