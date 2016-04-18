import React from 'react';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';

import { authenticate } from 'actions';
import { getAuthPropType } from 'proptypes';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleCloseErrorMessage = this._handleCloseErrorMessage.bind(this);
    this._handleSetRefUsername = this._handleSetRefUsername.bind(this);
    this._handleSetRefPassword = this._handleSetRefPassword.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this.state = {
      showErrors: false,
    };
  }

  componentWillMount() {
    this.checkProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkProps(nextProps);
  }

  getStyles() {
    const styles = {
      message: {
        textAlign: 'center',
        paddingTop: '1em',
        height: '2em',
        marginBottom: '1em',
      },
      paper: {
        height: '90%',
        width: '90%',
        margin: 'auto',
        padding: '2em',
      },
    };
    return styles;
  }

  checkProps(props) {
    if (props.auth.get('status') === 'success') {
      const { location } = props;
      if (location && location.query && location.query.next) {
        return browserHistory.push(location.query.next);
      }
      return browserHistory.push('/');
    }
    return this.setState({ showErrors: true });
  }

  _handleKeyDown(event) {
    if (event.keyCode === 13) {
      this._handleSubmit(event);
    }
  }

  _handleSubmit(event) {
    event.preventDefault();
    const username = this.username.getValue();
    const password = this.password.getValue();
    this.setState({ showErrors: true });
    this.props.authenticate({ username, password });
  }

  _handleCloseErrorMessage() {
    this.setState({ showErrors: false });
  }

  _handleSetRefUsername(c) {
    this.username = c;
  }

  _handleSetRefPassword(c) {
    this.password = c;
  }

  render() {
    const styles = this.getStyles();

    return (
      <Paper
        style={styles.paper}
      >
        <h1>Authentication</h1>
        <TextField
          floatingLabelText="Username"
          focus
          fullWidth
          hintText="Username"
          onKeyDown={this._handleKeyDown}
          ref={this._handleSetRefUsername}
        />
        <TextField
          floatingLabelText="Password"
          fullWidth
          hintText="Password"
          onKeyDown={this._handleKeyDown}
          ref={this._handleSetRefPassword}
          type="password"
        />
        <div
          style={styles.message}
        >
          {this.props.auth.get('status') === 'error' &&
            this.props.auth.get('message') && this.state.showErrors &&
            <RaisedButton
              label={this.props.auth.get('message')}
              onTouchTap={this._handleCloseErrorMessage}
              secondary
            />
          }
        </div>
        <div>
          <FlatButton
            label="Login"
            onTouchTap={this._handleSubmit}
            primary
          />
        </div>
      </Paper>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ authenticate }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


Login.propTypes = {
  auth: getAuthPropType(),
  authenticate: React.PropTypes.func.isRequired,
  location: React.PropTypes.shape({
    state: React.PropTypes.shape({
      pathname: React.PropTypes.string,
    }),
  }),
};
