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
import Home from 'containers/home';
import AddUser from 'containers/user/admin/add';
import ActivateUser from 'containers/user/admin/activate';
import ListUsers from 'containers/user/admin/list';
import ListDoors from 'containers/door/admin/list';
import ManageDoorDetail from 'containers/door/admin/detail';
import ManageUserDetail from 'containers/user/admin/detail';
import PageNotFound from 'components/notfound';
import ManageMenu from 'components/manage';
import TokenAuth from 'containers/user/token-auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { requireAuth } from 'components/auth';
import { requireAdminAuth } from 'components/admin-auth';
import { checkToken } from 'actions';

export default class Routes extends React.Component {
  displayName: 'Root';

  componentWillMount() {
    this.props.checkToken();
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route
          component={Logout}
          path="logout"
        />
        <Route
          component={Main}
          path="/"
        >
          <IndexRoute component={Home} />
          <Route
            component={TokenAuth}
            path="activate/user/:token"
          />
          <Route
            component={Login}
            path="login"
          />
          <Route
            component={requireAuth(Door)}
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
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ checkToken }, dispatch);
}

export default connect(null, mapDispatchToProps)(Routes);

Routes.propTypes = {
  checkToken: React.PropTypes.func.isRequired,
};
