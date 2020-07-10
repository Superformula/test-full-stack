import * as React from 'react';
import Button from '../../../../components/button/Button';

import './users-list-body.css';

const UsersListBody: React.FunctionComponent = () => {
    return (
        <div className="users-list-body-infinite-scroll-container">
            <div className="users-list-body-infinite-scroll-container-inner">
                <div className="user-card-grid-element user-card-grid-element-row-element">
                    <div className="user-card">This is text</div>
                </div>
                <div className="user-card-grid-element user-card-grid-element-row-element">
                    <div className="user-card">This is text</div>
                </div>
                <div className="user-card-grid-element user-card-grid-element-row-element">
                    <div className="user-card">This is text</div>
                </div>
                <div className="user-card-grid-element user-card-grid-element-row-element">
                    <div className="user-card">This is text</div>
                </div>
                <div className="user-card-grid-element user-card-grid-element-row-element">
                    <div className="user-card">This is text</div>
                </div>
                <div className="user-card-grid-element user-card-grid-element-row-element">
                    <div className="user-card">This is text</div>
                </div>
                <div className="user-card-grid-element user-card-grid-element-row-element">
                    <div className="user-card">This is text</div>
                </div>
            </div>
            <div className="users-list-body-infinite-scroll-footer">
                <div className="users-list-body-infinite-scroll-footer-inner">
                    <Button>Load More</Button>
                </div>
            </div>
        </div>
    );
}

export default UsersListBody;