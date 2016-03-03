import React from 'react';
import { connect } from 'react-redux';
import { checkAuthToken } from 'actions';
import { bindActionCreators } from 'redux';

export function checkAuth(Component) {
  class Authenticated extends React.Component {
    displayName: 'Authenticated';

    constructor(props) {
      super(props);
      this.checkAuth = this.checkAuth.bind(this);
    }

    state = {
      ready: false,
      isFetching: false,
    };

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
      if (props.auth.status === 'success' || props.auth.status === 'error') {
        return this.setState({ ready: true });
      }

      if (!this.state.isFetching) {
        this.props.checkAuthToken();
      }

      return this.setState({ isFetching: true });
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
    return bindActionCreators({ checkAuthToken }, dispatch);
  }

  Authenticated.propTypes = {
    auth: React.PropTypes.shape({
      token: React.PropTypes.string,
      status: React.PropTypes.string,
      username: React.PropTypes.string,
      message: React.PropTypes.string,
      admin: React.PropTypes.bool,
    }),
    checkAuthToken: React.PropTypes.func,
    location: React.PropTypes.shape({
      state: React.PropTypes.shape({
        nextPathname: React.PropTypes.string,
      }),
    }),
  };

  return connect(mapStateToProps, mapDispatchToProps)(Authenticated);
}
