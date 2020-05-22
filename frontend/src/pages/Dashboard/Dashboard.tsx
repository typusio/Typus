import React from 'react';
import { DashboardNavBar } from './DashboardNavBar';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { DashboardForm } from './Form/DashboardForm';
import { useRouter } from '../../util/hooks';
import { DashboardHome } from './Home/DashboardHome';
import { DashboardNew } from './New/DashboardNew';
import { RequireAuth } from '../../components/RequireAuth';

export const DashboardPage = () => {
  const { match } = useRouter();

  return (
    <div>
      <RequireAuth>
        <DashboardNavBar />
        <Switch>
          <Route path={`${match.url}/form/:id`}>
            <DashboardForm />
          </Route>

          <Route path={`${match.url}/new`}>
            <DashboardNew />
          </Route>

          <Route path={`${match.url}/`}>
            <DashboardHome />
          </Route>
        </Switch>
      </RequireAuth>
    </div>
  );
};
