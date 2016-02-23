import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';

import Home from 'containers/home';
import { authenticate } from 'actions';

export default class LoginDialog extends React.Component {
  displayName: 'LoginDialog';

  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._handleCloseErrorMessage = this._handleCloseErrorMessage.bind(this);
    this._handleSetRefUsername = this._handleSetRefUsername.bind(this);
    this._handleSetRefPassword = this._handleSetRefPassword.bind(this);
  }

  state = {
    open: true,
    showErrors: true,
  };

  componentWillMount() {
    if (this.props.auth.token && this.props.auth.token.status === 'valid') {
      const { location } = this.props;
      this.setState({ open: false });
      if (location && location.query && location.query.next) {
        return browserHistory.push(location.query.next);
      }
      return browserHistory.push('/');
    }
    return this.setState({ showErrors: true });
  }

  componentDidMount() {
    if (this.username) {
      this.username.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.token && nextProps.auth.token.status === 'valid') {
      const { location } = nextProps;
      this.setState({ open: false });
      if (location && location.query && location.query.next) {
        return browserHistory.push(location.query.next);
      }
      return browserHistory.push('/');
    }
    return this.setState({ showErrors: true });
  }

  getStyles() {
    const styles = {
      message: {
        textAlign: 'center',
        paddingTop: '1em',
        height: '2em',
      },
      dialog: {
        minHeight: '140px',
      },
    };
    return styles;
  }

  _handleClose() {
    this.setState({ open: false });
    browserHistory.push('/');
  }

  _handleSubmit(event) {
    event.preventDefault();

    const username = this.username.getValue();
    const password = this.password.getValue();

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
    const standardActions = (
      <div>
        <Link to="/"><FlatButton label="Close" /></Link>
        <FlatButton
          label="Login"
          onTouchTap={this._handleSubmit}
          primary
        />
      </div>
    );

    const styles = this.getStyles();

    return (
      <div>
        <Home />
        <Dialog
          actions={standardActions}
          bodyStyle={styles.dialog}
          modal={false}
          onRequestClose={this._handleClose}
          open={this.state.open}
          title="Authentication"
        >
          <TextField
            floatingLabelText="Username"
            focus
            fullWidth
            hintText="Username"
            onEnterKeyDown={this._handleSubmit}
            ref={this._handleSetRefUsername}
          />
          <TextField
            floatingLabelText="Password"
            fullWidth
            hintText="Password"
            onEnterKeyDown={this._handleSubmit}
            ref={this._handleSetRefPassword}
            type="password"
          />
          <div
            style={styles.message}
          >
            {this.props.auth.error && this.state.showErrors &&
              <RaisedButton
                label={this.props.auth.message}
                onTouchTap={this._handleCloseErrorMessage}
                primary
              />
            }
          </div>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ authenticate }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);

LoginDialog.propTypes = {
  auth: React.PropTypes.shape({
    error: React.PropTypes.bool,
    message: React.PropTypes.string,
    username: React.PropTypes.string,
    admin: React.PropTypes.bool,
    token: React.PropTypes.shape({
      status: React.PropTypes.string,
      value: React.PropTypes.string,
    }),
  }),
  authenticate: React.PropTypes.func.isRequired,
  location: React.PropTypes.shape({
    state: React.PropTypes.shape({
      pathname: React.PropTypes.string,
    }),
  }),
};
