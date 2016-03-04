import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { getAuthPropType } from 'proptypes';

export function requireUserAuth(Component) {
  class Authenticated extends React.Component {
    displayName: 'Authenticated';

    constructor(props) {
      super(props);
      this.checkAuth = this.checkAuth.bind(this);
    }

    state = {
      ready: false,
    };

    componentWillMount() {
      this.checkAuth(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps);
    }

    checkAuth(props) {
      if (props.auth.get('status') !== 'success') {
        const { location } = props;
        return browserHistory.push(`/login?next=${location.pathname}`);
      }

      if (props.auth.get('status') === 'success') {
        return this.setState({ ready: true });
      }

      return this.setState({ ready: false });
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

  Authenticated.propTypes = {
    auth: getAuthPropType(),
    location: React.PropTypes.shape({
      state: React.PropTypes.shape({
        nextPathname: React.PropTypes.string,
      }),
    }),
  };

  return connect(mapStateToProps)(Authenticated);
}
