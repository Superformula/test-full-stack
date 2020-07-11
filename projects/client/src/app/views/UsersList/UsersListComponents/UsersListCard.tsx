import * as React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { getShowUser } from "../../../modals/EditUserModal/EditUserModalActionCreators";
import UserCard from '../../../../components/user-card/UserCard';
import { APIUserModel } from '../../../../api/api-types';


import type { RootState } from '../../../../store/configure-store'

import './users-list-body.css';

const mapStateToProps = (state: RootState) => {
    return {};
};

const mapDispatchToProps = {
    getShowUser: getShowUser
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface UsersListCardBaseProps {
    user: APIUserModel;
}

type UsersListCardProps = PropsFromRedux & UsersListCardBaseProps;

const UsersListCard: React.FunctionComponent<UsersListCardProps> = (props: UsersListCardProps) => {
    const { getShowUser, user } = props;
    return (
        <UserCard 
            name={user.name} 
            description={user.description} 
            avatarUrl={""} 
            onClick={(e) => {
                getShowUser(user);
            }}/>
    );
}

const UsersListCardComponent = connector(UsersListCard);
export default UsersListCardComponent;