import { ApolloClientProvider } from './commons/ApolloClientProvider/ApolloClientProvider';
import { UserListPage } from './pages/UserList';
import { UserEditModalProvider } from './components/modal/ModalComponent';
import { QueryParamProvider } from 'use-query-params';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { UserEditModal } from './pages/UserEdit';

function App() {
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

export default App;
