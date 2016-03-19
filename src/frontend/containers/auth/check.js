import React from 'react';
import { connect } from 'react-redux';
import { checkAuthToken } from 'actions';
import { bindActionCreators } from 'redux';
import { getAuthPropType, getDoorPropType, getUserPropType } from 'proptypes';

import { fetchUsers, fetchDoors, fetchUserDoors } from 'actions';

export function checkAuth() {
  class CheckAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.checkAuth = this.checkAuth.bind(this);
      this.state = {
        ready: false,
        isAuthenticating: false,
        isFetching: false,
      };
    }

    componentWillMount() {
      this.checkAuth(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps);
    }

    getStyles() {
      return {
        main: {
          textAlign: 'center',
          minHeight: '100%',
          position: 'relative',
        },
      };
    }

    checkAuth(props) {
      if (props.auth.get('status') === 'success') {
        if (!this.state.isFetching) {
          if (props.auth.get('admin')) {
            props.fetchUsers(props.auth.get('token'));
            props.fetchDoors(props.auth.get('token'));
          } else {
            props.fetchUserDoors(props.auth.get('token'));
          }
          return this.setState({ isFetching: true });
        }

        if (props.auth.get('admin') &&
            props.doors.get('status') === 'success' &&
            props.users.get('status') === 'success') {
          return this.setState({ ready: true });
        }

        if (!props.auth.get('admin') && props.doors.get('status') === 'success') {
          return this.setState({ ready: true });
        }
      } else if (props.auth.get('status') === 'error') {
        return this.setState({ ready: true });
      }

      if (!this.state.isAuthenticating) {
        this.props.checkAuthToken();
      }

      return this.setState({ isAuthenticating: true });
    }

    render() {
      const styles = this.getStyles();
      return (
        <div style={styles.main}>
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
    return bindActionCreators({ checkAuthToken, fetchDoors, fetchUsers, fetchUserDoors }, dispatch);
  }

  CheckAuthentication.propTypes = {
    auth: getAuthPropType(),
    checkAuthToken: React.PropTypes.func,
    doors: getDoorPropType(),
    users: getUserPropType(),
  };

  return connect(mapStateToProps, mapDispatchToProps)(CheckAuthentication);
}
