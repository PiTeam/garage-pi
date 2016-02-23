import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';

import { fetchUsers, fetchDoors } from 'actions';

export function requireAdminAuth(Component) {
  class AdminAuthenticated extends React.Component {
    displayName: 'AdminAuthenticated';

    constructor(props) {
      super(props);
      this.checkAuth = this.checkAuth.bind(this);
    }

    state = {
      ready: false,
      trying: false,
    };

    componentWillMount() {
      this.checkAuth(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps);
    }

    checkAuth(props) {
      if (!props.auth.token || props.auth.token.status !== 'valid') {
        const { location } = props;
        return browserHistory.push(`/login?next=${location.pathname}`);
      }

      if (props.doors.status === 'done' && props.users.status === 'done') {
        return this.setState({ ready: true });
      }

      if (!this.state.ready && !this.state.trying) {
        props.fetchUsers(props.auth.token.value);
        props.fetchDoors(props.auth.token.value);
      }

      return this.setState({ trying: true });
    }

    render() {
      return (
        <div>
          {this.state.ready
            ? <Component {...this.props} />
            : null
          }
        </div>
      );
    }
  }

  function mapStateToProps({ auth, users, doors }) {
    return { auth, users, doors };
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchUsers, fetchDoors }, dispatch);
  }

  AdminAuthenticated.propTypes = {
    auth: React.PropTypes.shape({
      token: React.PropTypes.shape({
        status: React.PropTypes.string,
        value: React.PropTypes.string,
      }),
      status: React.PropTypes.string,
    }),
    fetchDoors: React.PropTypes.func.isRequired,
    fetchUsers: React.PropTypes.func.isRequired,
    location: React.PropTypes.shape({
      state: React.PropTypes.shape({
        nextPathname: React.PropTypes.string,
      }),
    }),
    users: React.PropTypes.shape({
      status: React.PropTypes.string.isRequired,
      data: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
        }),
      ),
    }),
  };

  return connect(mapStateToProps, mapDispatchToProps)(AdminAuthenticated);
}
