import * as React from 'react';
import Button from '../../../../components/button/Button';


import './users-list-body.css';

const UsersListFooter: React.FunctionComponent = () => {
    return (
        <div className="users-list-body-footer">
            <div className="users-list-body-footer-inner">
                <Button>Load More</Button>
            </div>
        </div>
    );
}

export default UsersListFooter;