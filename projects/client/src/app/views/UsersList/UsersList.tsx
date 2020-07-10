import * as React from 'react';
import InputText from '../../../components/text-input/TextInput';
import UsersListBody from './UsersListBody/UsersListBody';

import './users-list.css';

const UsersList: React.FunctionComponent = () => {
    return (
        <div className="users-list">
            <div className="application-header">
                <div className="user-card-grid-element">
                    <h1 className="application-header-title">Users list</h1>
                </div>
                <div className="user-card-grid-element">
                    <div style={{ flexGrow: 1 }}></div>
                </div>
                <div className="user-card-grid-element">
                    <InputText className="search-input" style={{margin: 'auto'}} placeholder="Search..."></InputText>
                </div>
            </div>
            <UsersListBody></UsersListBody>
        </div>
    );
}

export default UsersList;