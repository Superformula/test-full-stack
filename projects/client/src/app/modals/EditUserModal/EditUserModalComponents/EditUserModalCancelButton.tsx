import * as React from 'react';
import Button from '../../../../components/button/Button';
import LoadingIndicator from '../../../../components/loading-indicator/LoadingIndicator';
import { connect, ConnectedProps } from "react-redux";
import { getHide } from '../EditUserModalActionCreators';
import type { RootState } from '../../../../store/configure-store'

import './edit-user-modal-body.css';

const mapStateToProps = (state: RootState) => {
    return { };
};

const mapDispatchToProps = {
    getHide: getHide
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const EditUserModalCancelButton: React.FunctionComponent<PropsFromRedux> = (props: PropsFromRedux) => {
    const { getHide } = props;
    return (
        
        <Button className="modal-input-cancel-button modal-input-button" onClick={(e) => {
            getHide();
        }}>
            Cancel
        </Button>
    );
}

const EditUserModalCancelButtonComponent = connector(EditUserModalCancelButton);
export default EditUserModalCancelButtonComponent;