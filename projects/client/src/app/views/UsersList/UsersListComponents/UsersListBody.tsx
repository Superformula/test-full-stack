import * as React from 'react';
import {useEffect} from 'react';
import { connect, ConnectedProps } from "react-redux";
import { getPages } from "../UsersListActionCreators";
import getPageStateQuery from "../../../../state/get-page-state-query";
import type { RootState } from '../../../../store/configure-store'

import './users-list-body.css';

const mapStateToProps = (state: RootState) => {
    return {
        users: state.usersList.users,
        isLoadMoreAvailable: state.usersList.isLoadMoreAvailable,
        filter: state.usersList.filter
    };
};

const mapDispatchToProps = {
    getPages: getPages
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const UsersListBody: React.FunctionComponent<PropsFromRedux> = (props: PropsFromRedux) => {
    const {getPages, users, isLoadMoreAvailable, filter} = props;
    useEffect(() => {
        if (users.length === 0 && isLoadMoreAvailable) {
            getPages(getPageStateQuery(), filter);
        }
    });

    return (
        <div className="users-list-body">
            {users.map((user) => {
                return (
                    <div className="user-card-grid-element user-card-grid-element-row-element">
                        <div className="user-card">{user.name}</div>
                    </div>
                )
            })}
        </div>
    );
}

const UsersListBodyComponent = connector(UsersListBody);
export default UsersListBodyComponent;