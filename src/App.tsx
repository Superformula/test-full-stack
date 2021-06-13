import { ApolloClientProvider } from './commons/ApolloClientProvider/ApolloClientProvider';
import { UserListPage } from './pages/UserList';
import { UserEditModalProvider } from './pages/UserEdit/modal/ModalComponent';
import { QueryParamProvider } from 'use-query-params';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <ApolloClientProvider>
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          <UserEditModalProvider>
            <UserListPage />
          </UserEditModalProvider>
        </QueryParamProvider>
      </Router>
    </ApolloClientProvider>
  );
}

export default App;
