import * as React from 'react';
import { connect, ConnectedProps } from "react-redux";
import { getShowUser } from "../../../modals/EditUserModal/EditUserModalActionCreators";
import UserCard from '../../../../components/user-card/UserCard';
import { APIUserModel } from '../../../../api/api-types';
import useHover from '../../../../hooks/useHover';
import Editicon from '../../../../components/icons/EditIcon';

import type { RootState } from '../../../../store/configure-store'

import './users-list-body.css';
import './users-list-card-icon.css';
import EditIcon from '../../../../components/icons/EditIcon';

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

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

function toDateDisplayFormat(timestamp: number) : string {
    if (!timestamp) {
        return "";
    }
    let date = (new Date(timestamp * 1000));
    return `${(date.getDate()).toString().padStart(2, '0')} ${MONTHS[date.getMonth()]} ${date.getFullYear().toString()} `
}

const UsersListCard: React.FunctionComponent<UsersListCardProps> = (props: UsersListCardProps) => {
    const { getShowUser, user } = props;
    const [hoverRef, isHovered] = useHover();
    
    let flareClassName = "users-list-card-flare"
    if (isHovered && user.createdAt){
        flareClassName += ` users-list-card-flare-hover`;
    }

    let userFlare = (
        <span className={flareClassName} style={{float: 'right'}}>
            <span style={{paddingRight: '6px'}}>created</span>
            <span className="user-card-emphasis">
                {toDateDisplayFormat(user.createdAt)}
            </span>
        </span>
    );

    return (
        <div className="user-card-grid-element user-card-grid-element-row-element">
            <EditIcon 
                className={isHovered ? "users-list-card-edit users-list-card-edit-visible" : "users-list-card-edit"}
            />
            <UserCard 
                cardRef={hoverRef}
                flare={userFlare}
                name={user.name} 
                description={user.description} 
                id={user.id} 
                onClick={(e) => {
                    getShowUser(user);
                }}/>
        </div>
    );
}

const UsersListCardComponent = connector(UsersListCard);
export default UsersListCardComponent;