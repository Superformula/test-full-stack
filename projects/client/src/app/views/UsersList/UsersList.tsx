import * as React from 'react';
import UsersListBody from './UsersListComponents/UsersListBody';
import UsersListHeader from './UsersListComponents/UsersListHeader';
import UsersListFooter from './UsersListComponents/UsersListFooter';

import './users-list.css';

const UsersList: React.FunctionComponent = () => {
    return (
        <div className="users-list">
            <div className="users-list-infinite-scroll-container">
                <UsersListHeader></UsersListHeader>
                <UsersListBody></UsersListBody>
                <UsersListFooter></UsersListFooter>
            </div>
        </div>
    );
}

export default UsersList;