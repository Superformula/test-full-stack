import * as React from 'react';
import InputText from '../../../components/text-input/TextInput';
import UsersListBody from './UsersListBody/UsersListBody';

import './users-list.css';

const UsersList: React.FunctionComponent = () => {
    return (
        <div className="users-list">

            <UsersListBody></UsersListBody>
        </div>
    );
}

export default UsersList;