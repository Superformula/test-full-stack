import * as React from 'react';
import { useEffect } from 'react';
import { connect, ConnectedProps } from "react-redux";
import { getPages } from "../UsersListActionCreators";
import { getPageStateQuery } from "../../../../state/page-state-query";
import UserCard from '../../../../components/user-card/UserCard';

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
        if (users.length === 0 && isLoadMoreAvailable) {
            getPages(getPageStateQuery(), filter);
        }
    });

    const filteredUsers = users.filter((user) => {
        return !filter || user.name.toLowerCase().startsWith(filter)
    })

    return (
        <div className="users-list-body">
            {filteredUsers.map((user) => {
                return (
                    <UserCard key={user.id} name={user.name} description={user.description} avatarUrl={""}/>
                );
            })}
        </div>
    );
}

const UsersListBodyComponent = connector(UsersListBody);
export default UsersListBodyComponent;