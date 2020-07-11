import * as React from 'react';
import UsersListLoadMoreButton from './UsersListLoadMoreButton';


import './users-list-body.css';

const UsersListFooter: React.FunctionComponent = () => {
    return (
        <div className="users-list-body-footer">
            <div className="users-list-body-footer-inner">
                <UsersListLoadMoreButton>Load More</UsersListLoadMoreButton>
            </div>
        </div>
    );
}

export default UsersListFooter;