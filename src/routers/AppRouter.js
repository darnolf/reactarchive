import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import RecordDashboardPage from '../components/RecordDashboardPage'
import RecordDashboardPageVisitor from '../components/RecordDashboardPageVisitor'
import AddRecordPage from '../components/AddRecordPage';
import EditRecordPage from '../components/EditRecordPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import GlobalSettings from '../components/settings';
import PrivateRoute from './PrivateRoute';
import VisitorRoute from './VisitorRoute';
import PublicRoute from './PublicRoute';


export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <VisitorRoute path="/recordsview" component={RecordDashboardPageVisitor} />
        <PrivateRoute path="/dashboard" component={RecordDashboardPage} />
        <PrivateRoute path="/create" component={AddRecordPage} />
        <PrivateRoute path="/edit/:id" component={EditRecordPage} />
        <PrivateRoute path="/settings" component={GlobalSettings} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
