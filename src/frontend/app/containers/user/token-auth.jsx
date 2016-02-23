import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { processActivateUser } from 'actions';

export default class TokenAuth extends Component {
  displayName: 'TokenAuth';

  constructor(props) {
    super(props);
    this.checkAuth = this.checkAuth.bind(this);
  }

  state = {
    trying: false,
  };

  componentWillMount() {
    this.checkAuth(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps);
  }

  checkAuth(props) {
    if (props.auth.token) {
      return browserHistory.push('/');
    }
    if (!this.state.trying) {
      props.processActivateUser(props.params.token);
    }
    return this.setState({ trying: true });
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
  auth: React.PropTypes.shape({
    token: React.PropTypes.shape({
      status: React.PropTypes.string,
      value: React.PropTypes.string,
    }),
    status: React.PropTypes.string,
  }),
};
