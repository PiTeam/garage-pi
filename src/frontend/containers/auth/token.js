import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { processActivateUser } from 'actions';
import { getAuthPropType } from 'proptypes';

class TokenAuth extends Component {
  constructor(props) {
    super(props);
    this.checkAuth = this.checkAuth.bind(this);
    this.state = {
      isFetching: false,
    };
  }

  componentWillMount() {
    this.checkAuth(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps);
  }

  checkAuth(props) {
    if (props.auth.get('token')) {
      return browserHistory.push('/');
    }
    if (!this.state.isFetching) {
      props.processActivateUser(props.params.token);
    }
    return this.setState({ isFetching: true });
  }

  render() {
    const styles = {
      h1: {
        color: '#00bcd4',
      },
    };

    return (
      <div>
        <div className="spinner" />
        <h1 style={styles.h1}>{'Loggin in...'}</h1>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ processActivateUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenAuth);

TokenAuth.propTypes = {
  auth: getAuthPropType(),
};
