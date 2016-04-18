import React from 'react';
import {
  browserHistory,
  Router,
  Route,
  IndexRoute,
} from 'react-router';

import Main from 'components/main';
import Login from 'containers/login';
import Logout from 'containers/logout';
import Door from 'containers/door/list';
import AddUser from 'containers/user/admin/add';
import ActivateUser from 'containers/user/admin/activate';
import ListUsers from 'containers/user/admin/list';
import ListDoors from 'containers/door/admin/list';
import ManageDoorDetail from 'containers/door/admin/detail';
import ManageUserDetail from 'containers/user/admin/detail';
import PageNotFound from 'components/notfound';
import ManageMenu from 'components/manage';

import {
  TokenAuth,
  requireUserAuth,
  requireAdminAuth,
  checkAuth,
} from 'containers/auth';

export const Routes = () => (
  <Router history={browserHistory}>
    <Route
      component={Logout}
      path="logout"
    />
    <Route
      component={checkAuth(Main)}
      path="/"
    >
      <IndexRoute component={requireUserAuth(Door)} />
      <Route
        component={TokenAuth}
        path="activate/user/:token"
      />
      <Route
        component={Login}
        path="login"
      />
      <Route
        component={requireUserAuth(Door)}
        path="door"
      />
      <Route
        component={requireAdminAuth(ManageMenu)}
        path="manage"
      />
      <Route
        component={requireAdminAuth(ListUsers)}
        path="manage/user"
      />
      <Route
        component={requireAdminAuth(AddUser)}
        path="manage/user/add"
      />
      <Route
        component={requireAdminAuth(ActivateUser)}
        path="manage/user/:userName/activate"
      />
      <Route
        component={requireAdminAuth(ManageUserDetail)}
        path="manage/user/:userId"
      />
      <Route
        component={requireAdminAuth(ListDoors)}
        path="manage/door"
      />
      <Route
        component={requireAdminAuth(ManageDoorDetail)}
        path="manage/door/:doorId"
      />
      <Route
        component={PageNotFound}
        path="*"
      />
    </Route>
  </Router>
);

export default Routes;
