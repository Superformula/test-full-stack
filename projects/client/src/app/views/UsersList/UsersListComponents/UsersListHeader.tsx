import * as React from 'react';
import UsersListSearch from './UsersListSearch';

import './users-list-body.css';

const UsersListHeader: React.FunctionComponent = () => {
    return (
        <div className="users-list-body-header">
            <div className="user-card-grid-element">
                <h1 className="users-list-body-header-title">Users list</h1>
            </div>
            <div className="user-card-grid-element users-list-header-spacer">
            </div>
            <div className="user-card-grid-element users-list-header-search">
                <div className="users-list-header-search-center">
                    <UsersListSearch/>
                </div>
            </div>
        </div>
    );
}

export default UsersListHeader;