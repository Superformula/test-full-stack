import * as React from 'react';
import InputText from '../../../../components/text-input/TextInput';
import { connect, ConnectedProps } from "react-redux";
import { getUpdateFilter } from '../UsersListActionCreators';

import type { RootState } from '../../../../store/configure-store'

import './users-list-body.css';

const mapStateToProps = (state: RootState) => {
    return {};
};

const mapDispatchToProps = {
    getUpdateFilter: getUpdateFilter
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const UsersListSearch: React.FunctionComponent<PropsFromRedux> = (props: PropsFromRedux) => {
    const { getUpdateFilter } = props;
    return (
        <InputText 
            id="search-input"
            onChange={(e) => {
                getUpdateFilter(e.target.value);
            }}
            className="search-input" 
            style={{ margin: '32px 8px' }} 
            placeholder="Search...">

        </InputText>
    );
}

const UsersListSearchComponent = connector(UsersListSearch);
export default UsersListSearchComponent;