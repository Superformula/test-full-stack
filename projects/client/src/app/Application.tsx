import * as React from 'react';
import { Provider } from 'react-redux';

import UsersList from './views/UsersList/UsersList';

import './application.css';

import { configureStore } from '../store/configure-store';
const store = configureStore();

const Application: React.FunctionComponent = () => {
    return (
        <Provider store={store}>
            <div className="application-container">
                <UsersList>

                </UsersList>
            </div>
        </Provider>
    );
}

export default Application;