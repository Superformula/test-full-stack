import * as React from 'react';
import { useState } from 'react';
import InputText from '../../../../components/text-input/TextInput';
import { connect, ConnectedProps } from "react-redux";
import { getEditUserDescription, getEditUserLocation, getEditUserName, getFetchLocation } from '../EditUserModalActionCreators';

import type { RootState } from '../../../../store/configure-store'

import './edit-user-modal-body.css';
import AlertIcon from '../../../../components/icons/AlertIcon';

const mapStateToProps = (state: RootState) => {
    return {};
};

const mapDispatchToProps = {
    getEditUserDescription,
    getEditUserLocation,
    getEditUserName,
    getFetchLocation
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface EditUserModalInputBaseProps {
    which: 'location' | 'name' | 'description';
    value: string;
    id: string;
}

type EditUserModalInputProps = PropsFromRedux & EditUserModalInputBaseProps;

const EditUserModalInput: React.FunctionComponent<EditUserModalInputProps> = (props: EditUserModalInputProps) => {
    const { 
        getEditUserDescription,
        getEditUserLocation,
        getEditUserName, 
        getFetchLocation,
        which, value, id
    } = props;
    
    const [lastId, setLastId] = useState(id);
    const [textValue, setTextValue] = useState(value);
    const [debouncedTimeout, setDebouncedTimeout] = useState(null);

    const userViewChanged = id !== lastId;
    if (userViewChanged) {
        setTextValue(value);
        setLastId(id);
    }
    
    let dispatchFunction;
    switch (which) {
        case 'location':
            if (userViewChanged) {
                getFetchLocation(value);
            }
            dispatchFunction = (newLocation: string) => {
                getEditUserLocation(newLocation);
                clearTimeout(debouncedTimeout);
                const tm = setTimeout(() => {
                    // TODO: Cancel the promise; There is a library for this.
                    getFetchLocation(newLocation);
                }, 700);

                setDebouncedTimeout(tm);
            };
            break;
        case 'name':
            dispatchFunction = getEditUserName;
            break;
        case 'description':
            dispatchFunction = getEditUserDescription;
            break;
    }

    let indicator = null;
    if (textValue !== value) {
        indicator = (
            <AlertIcon className="modal-input-indicator" style={{
                width: '24px',
                height: '24px',
            }}></AlertIcon>
        );
    }

    return (
        <div className="modal-input-container">
            {indicator}  
            <InputText 
                id={which}
                onChange={(e) => {
                    setTextValue(e.target.value);
                    dispatchFunction(e.target.value);
                }}
                className="modal-input-text" 
                value={textValue}>

            </InputText>
        </div>
    );
}

const EditUserModalInputComponent = connector(EditUserModalInput);
export default EditUserModalInputComponent;