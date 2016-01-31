import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchUsers, fetchQRCode } from 'actions';

export default class ActivateUser extends React.Component {
  displayName: 'ActivateUser';

  constructor(props) {
    super(props);
    this.props.fetchUsers(this.props.auth.token.value);
  }

  state = {
    user: undefined,
  };

  componentWillMount() {
    if (!this.state.user && this.props.users.status === 'done') {
      const user = this._getUser(this.props.params.userName, this.props.users.data);
      if (user) {
        this.setState({ user });
        this.props.fetchQRCode(user.id, this.props.auth.token.value);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.user && nextProps.users.status === 'done') {
      const user = this._getUser(this.props.params.userName, nextProps.users.data);
      if (user) {
        this.setState({ user });
        this.props.fetchQRCode(user.id, nextProps.auth.token.value);
      }
    }
  }

  getStyles() {
    return {
      h1: {
        marginBottom: '1em',
      },
      qrcode: {
        maxWidth: '100%',
        maxHeight: '100%',
      },
      paper: {
        padding: '2em',
        margin: '2em',
      },
      backButton: {
        float: 'left',
      },
      confirmButton: {
        float: 'right',
      },
      br: {
        clear: 'both',
      },
      h3: {
        marginTop: '2em',
        textAlign: 'left',
        marginBottom: '.2em',
      },
      bottomButtons: {
        bottom: '1em',
        left: '1em',
        right: '1em',
        position: 'absolute',
      },
    };
  }

  _getUser(name, users) {
    const selected = users.filter(user => {
      if (user.name === name) {
        return user;
      }
    });
    return selected[0];
  }

  render() {
    const styles = this.getStyles();

    if (!this.state.user || !this.state.user.id) {
      return <div />;
    }

    return (
      <div>
        <h1 style={styles.h1}>{`Activate user ${this.state.user.name}`}</h1>
        <Paper style={styles.paper}>
          {this.props.qrcode.text &&
            <div>
              <img
                src={`data:image/svg+xml;base64,${this.props.qrcode.svg}`}
              />
            </div>
          }
        </Paper>

        <div style={styles.bottomButtons}>
          <Link
            style={styles.link}
            to="/manage/user"
          >
            <RaisedButton
              label="Back"
              style={styles.backButton}
            />
          </Link>
          <Link
            style={styles.link}
            to="/"
          >
            <RaisedButton
              label="Done"
              primary
              style={styles.confirmButton}
            />
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    doors: state.doors,
    qrcode: state.qrcode,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUsers, fetchQRCode }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivateUser);

ActivateUser.propTypes = {
  auth: React.PropTypes.shape({
    token: React.PropTypes.shape({
      status: React.PropTypes.string,
      value: React.PropTypes.string,
    }),
    status: React.PropTypes.string,
  }),
  fetchQRCode: React.PropTypes.func.isRequired,
  fetchUsers: React.PropTypes.func.isRequired,
  params: React.PropTypes.shape({
    userName: React.PropTypes.string.isRequired,
  }),
  qrcode: React.PropTypes.shape({
    svg: React.PropTypes.string,
    text: React.PropTypes.string,
  }),
  users: React.PropTypes.shape({
    status: React.PropTypes.string,
    data: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        doors: React.PropTypes.arrayOf(React.PropTypes.string),
      }),
    ),
  }),
};
