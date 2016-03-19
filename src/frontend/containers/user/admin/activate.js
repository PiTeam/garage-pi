import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import qr from 'qr-image';
import base64 from 'base-64';

import { fetchUsers, activateUser } from 'actions';
import { getAuthPropType, getUserPropType } from 'proptypes';

class ActivateUser extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchUsers(this.props.auth.get('token'));
    this.state = {
      user: undefined,
      isFetching: false,
      svg: undefined,
    };
  }

  componentWillMount() {
    this._selectUser(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._selectUser(nextProps);
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

  _selectUser(props) {
    const user = props.users.get('data').find(u => u.get('name') === this.props.params.userName);
    if (user) {
      if (user.get('activateToken')) {
        const url = this._getFullActivationURL(user.get('activateToken'));
        const qrcode = qr.imageSync(url, { type: 'svg' });
        this.setState({
          user,
          svg: base64.encode(qrcode),
        });
      }

      if (!this.state.isFetching) {
        this.props.activateUser(user);
        this.setState({ isFetching: true });
      }
    }
  }

  _getFullActivationURL(token) {
    const parser = document.createElement('a');
    parser.href = window.location.href;
    parser.pathname = `/activate/user/${token}`;
    return parser.href;
  }

  _getUser(name, users) {
    const selected = users.filter(user => user.name === name);
    return selected[0];
  }

  render() {
    const styles = this.getStyles();

    if (!this.state.user || !this.state.user.get('id')) {
      return <div />;
    }

    return (
      <div>
        <h1 style={styles.h1}>{`Activate user ${this.state.user.get('name')}`}</h1>
        <Paper style={styles.paper}>
          {this.state.user.get('activateToken') &&
            <div>
              <img
                src={`data:image/svg+xml;base64,${this.state.svg}`}
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
  return bindActionCreators({ fetchUsers, activateUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivateUser);

ActivateUser.propTypes = {
  activateUser: React.PropTypes.func.isRequired,
  auth: getAuthPropType(),
  fetchUsers: React.PropTypes.func.isRequired,
  params: React.PropTypes.shape({
    userName: React.PropTypes.string.isRequired,
  }),
  qrcode: React.PropTypes.shape({
    svg: React.PropTypes.string,
    text: React.PropTypes.string,
  }),
  users: getUserPropType(),
};
