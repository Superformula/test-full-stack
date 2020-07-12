import * as React from 'react';
import { Provider } from 'react-redux';

import UsersList from './views/UsersList/UsersList';

import './application.css';

import { configureStore } from '../store/configure-store';
import EditUserModal from './modals/EditUserModal/EditUserModal';

const store = configureStore();
(window as any).store = store; // For testing purposes

const Application: React.FunctionComponent = () => {
    return (
        <Provider store={store}>
            <div className="application-container">
                <EditUserModal/>
                <UsersList/>
            </div>
        </Provider>
    );
}

export default Application;