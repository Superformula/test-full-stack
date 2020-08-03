import React from 'react';
import {
  Route,
  Switch,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import UserManagementPage from 'pages/user-management';

export const RouteParams = {
  nameFilter: 'nameFilter',
  currentPage: 'currentPage',
};

export const Routes = { landingPage: '/' };

const RoutesComponent: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <>
      <Switch>
        {/* Landing page */}
        <Route
          exact
          path={Routes.landingPage}
          render={() => {
            // Pass down the optional URL parameters to the page
            const params = new URLSearchParams(location.search);
            const currentPageStr = params.get(RouteParams.currentPage);
            const currentPageVal = currentPageStr
              ? Number(currentPageStr)
              : undefined;
            return (
              <UserManagementPage
                nameFilter={params.get(RouteParams.nameFilter)}
                currentPage={currentPageVal}
              />
            );
          }}
        />
      </Switch>
    </>
  );
};

export default withRouter(RoutesComponent);
