import * as React from 'react';
import { useState } from 'react';
import InputText from '../../../../components/text-input/TextInput';
import { connect, ConnectedProps } from "react-redux";
import { getEditUserDescription, getEditUserLocation, getEditUserName, getFetchLocation } from '../EditUserModalActionCreators';

import type { RootState } from '../../../../store/configure-store'

import './edit-user-modal-body.css';

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
}

type EditUserModalInputProps = PropsFromRedux & EditUserModalInputBaseProps;

const EditUserModalInput: React.FunctionComponent<EditUserModalInputProps> = (props: EditUserModalInputProps) => {
    const { 
        getEditUserDescription,
        getEditUserLocation,
        getEditUserName, 
        getFetchLocation,
        which, value
    } = props;

    const [textValue, setTextValue] = useState(value);
    const [intialValue, setInitialValue] = useState(value);
    const [debouncedTimeout, setDebouncedTimeout] = useState(null);
    const userViewChanged = value !== intialValue;

    if (userViewChanged) {
        setInitialValue(value);
        setTextValue(value);
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

    return (
        <InputText 
            onChange={(e) => {
                setTextValue(e.target.value);
                dispatchFunction(e.target.value);
            }}
            className="modal-input-text" 
            value={textValue}>

        </InputText>
    );
}

const EditUserModalInputComponent = connector(EditUserModalInput);
export default EditUserModalInputComponent;