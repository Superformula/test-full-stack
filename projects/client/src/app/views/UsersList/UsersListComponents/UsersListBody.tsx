import * as React from 'react';
import { useEffect } from 'react';
import { connect, ConnectedProps } from "react-redux";
import { getPages } from "../UsersListActionCreators";
import { getPageStateQuery } from "../../../../state/page-state-query";
import UsersListCard from "./UsersListCard";

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
    const { getPages, users, isLoadMoreAvailable, filter } = props;
    useEffect(() => {
        if (Object.keys(users).length === 0 && isLoadMoreAvailable) {
            getPages(getPageStateQuery(), filter);
        }
    });
    
    const altFilter = filter.toLowerCase();
    const filteredUsers = Object.keys(users).filter((id) => {
        const user = users[id];
        return !filter || user.name.toLowerCase().startsWith(altFilter);
    }).map((id) => users[id]);

    return (
        <div className="users-list-body">
            {filteredUsers.map((user) => {
                return (
                    <UsersListCard key={user.id} user={user}/>
                );
            })}
        </div>
    );
}

const UsersListBodyComponent = connector(UsersListBody);
export default UsersListBodyComponent;