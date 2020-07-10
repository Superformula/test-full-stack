import * as React from 'react';
import Button from '../../../../components/button/Button';
import InputText from '../../../../components/text-input/TextInput';

import './users-list-body.css';

const UsersListBody: React.FunctionComponent = () => {
    return (
        <div className="users-list-body-infinite-scroll-container">
            <div className="application-header">
                <div className="user-card-grid-element">
                    <h1 className="application-header-title">Users list</h1>
                </div>
                <div className="user-card-grid-element">
                    <div style={{ flexGrow: 1 }}></div>
                </div>
                <div className="user-card-grid-element">
                    <InputText className="search-input" style={{margin: '32px 8px'}} placeholder="Search..."></InputText>
                </div>
            </div>
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