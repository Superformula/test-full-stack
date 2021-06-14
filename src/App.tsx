import { BrowserRouter as Router, Route } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import { ApolloClientProvider } from './commons/ApolloClientProvider/ApolloClientProvider';
import { UserEditModalProvider } from './components/modal/ModalComponent';
import { UserEditModal } from './pages/UserEdit';
import { UserListPage } from './pages/UserList';

export function App() {
  return (
    <ApolloClientProvider>
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          <UserEditModalProvider modalComponent={<UserEditModal />}>
            <UserListPage />
          </UserEditModalProvider>
        </QueryParamProvider>
      </Router>
    </ApolloClientProvider>
  );
}
