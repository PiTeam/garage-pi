import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { getAuthPropType } from 'proptypes';

export function requireAdminAuth() {
  class AdminAuthenticated extends React.Component {
    constructor(props) {
      super(props);
      this.checkAuth = this.checkAuth.bind(this);
      this.state = {
        ready: false,
      };
    }

    componentWillMount() {
      this.checkAuth(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps);
    }

    checkAuth(props) {
      if (props.auth.get('status') !== 'success' || props.auth.get('admin') !== true) {
        const { location } = props;
        return browserHistory.push(`/login?next=${location.pathname}`);
      }

      return this.setState({ ready: true });
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

  function mapStateToProps({ auth }) {
    return { auth };
  }

  AdminAuthenticated.propTypes = {
    auth: getAuthPropType(),
    location: React.PropTypes.shape({
      state: React.PropTypes.shape({
        nextPathname: React.PropTypes.string,
      }),
    }),
  };

  return connect(mapStateToProps)(AdminAuthenticated);
}
