import * as React from 'react';
import {useState} from 'react';
import InputText from '../../../../components/text-input/TextInput';
import { connect, ConnectedProps } from "react-redux";
import { getEditUserDescription, getEditUserLocation, getEditUserName } from '../EditUserModalActionCreators';

import type { RootState } from '../../../../store/configure-store'

import './edit-user-modal-body.css';

const mapStateToProps = (state: RootState) => {
    return {};
};

const mapDispatchToProps = {
    getEditUserDescription,
    getEditUserLocation,
    getEditUserName
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
        which, value
    } = props;

    const [textValue, setTextValue] = useState(value);
    const [intialValue, setInitialValue] = useState(value);

    if (value !== intialValue) {
        setInitialValue(value);
        setTextValue(value);
    }

    let dispatchFunction;
    switch (which) {
        case 'location':
            dispatchFunction = getEditUserLocation;
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