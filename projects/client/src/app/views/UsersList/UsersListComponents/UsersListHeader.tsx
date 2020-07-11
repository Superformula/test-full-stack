import * as React from 'react';
import UsersListSearch from './UsersListSearch';

import './users-list-body.css';

const UsersListHeader: React.FunctionComponent = () => {
    return (
        <div className="users-list-body-header">
            <div className="user-card-grid-element">
                <h1 className="users-list-body-header-title">Users list</h1>
            </div>
            <div className="user-card-grid-element">
                <div style={{ flexGrow: 1 }}></div>
            </div>
            <div className="user-card-grid-element">
                <UsersListSearch/>
            </div>
        </div>
    );
}

export default UsersListHeader;