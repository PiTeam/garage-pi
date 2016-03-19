import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { resetAuth } from 'actions';

class Logout extends React.Component {
  componentWillMount() {
    this.props.resetAuth();
    browserHistory.push('/');
  }

  render() {
    return null;
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ resetAuth }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);

Logout.propTypes = {
  resetAuth: React.PropTypes.func.isRequired,
};
