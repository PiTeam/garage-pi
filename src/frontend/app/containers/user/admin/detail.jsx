import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import Dialog from 'material-ui/lib/dialog';
import { browserHistory } from 'react-router';
import FlatButton from 'material-ui/lib/flat-button';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';

import CustomCheckbox from 'components/custom-checkbox';
import { deleteUser, updateUser } from 'actions';

class UserDetail extends Component {
  displayName: 'UserDetail';

  constructor(props) {
    super(props);
    this._getActionButtons = this._getActionButtons.bind(this);
    this.handleCloseDeletionConfirmation = this.handleCloseDeletionConfirmation.bind(this);
    this.handleOpenDeletionConfirmation = this.handleOpenDeletionConfirmation.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this._handleUpdate = this._handleUpdate.bind(this);
    this._handleCheck = this._handleCheck.bind(this);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
  }

  state = {
    confirmDeletion: false,
    user: undefined,
  };

  componentWillMount() {
    if (!this.state.user &&
         this.props.users.status === 'success' &&
         this.props.doors.status === 'success') {
      const user = this._getUser(this.props.params.userId,
                                 this.props.users.data, this.props.doors.data);
      this.setState({ user });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.user &&
         nextProps.users.status === 'success' &&
         nextProps.doors.status === 'success') {
      const user = this._getUser(nextProps.params.userId,
                                 nextProps.users.data, nextProps.doors.data);
      this.setState({ user });
    }
  }

  getStyles() {
    return {
      h1: {
        marginBottom: '1em',
      },
      paper: {
        padding: '1em',
        minWidth: '50%',
        maxWidth: '80%',
        margin: 'auto',
        marginBottom: '2em',
      },
      link: {
        textDecoration: 'none',
      },
      name: {
        fontSize: '18px',
      },
      backButton: {
        float: 'left',
      },
      deleteButton: {
        float: 'right',
      },
      doors: {
        margin: '2em',
        marginBottom: '4em',
      },
      activateButton: {
        bottom: '5em',
        left: '1em',
        right: '1em',
        position: 'absolute',
      },
      bottomButtons: {
        bottom: '1em',
        left: '1em',
        right: '1em',
        position: 'absolute',
      },
    };
  }

  _handleUpdate() {
    const doors = Object.keys(this.state.user.doors).filter(
                                doorId => this.state.user.doors[doorId]);

    const user = Object.assign({}, this.state.user, { doors });
    this.props.updateUser(user, this.props.auth.token);
    browserHistory.push('/manage/user');
  }

  _handleTextFieldChange(e) {
    const user = Object.assign({}, this.state.user, { name: e.target.value });
    this.setState({ user });
  }

  handleDelete() {
    this.props.deleteUser(this.state.user.id, this.props.auth.token);
    browserHistory.push('/manage/user');
  }

  _getUser(id, users, doors) {
    const selected = users.filter(user => user.id === id);
    const userDoors = {};
    doors.forEach(door => {
      userDoors[door.id] = selected[0].doors instanceof Array &&
                           selected[0].doors.indexOf(door.id) !== -1;
    });

    return Object.assign({}, selected[0], { doors: userDoors });
  }

  _handleCheck(id, value) {
    const doors = Object.assign({}, this.state.user.doors);
    doors[id] = value;

    const user = Object.assign({}, this.state.user, { doors });
    this.setState({ user });
  }

  handleCloseDeletionConfirmation() {
    return this.setState({ confirmDeletion: false });
  }

  handleOpenDeletionConfirmation() {
    return this.setState({ confirmDeletion: true });
  }

  _getActionButtons() {
    return [
      <FlatButton
        key="cancel"
        label="Cancel"
        onTouchTap={this.handleCloseDeletionConfirmation}
        secondary
      />,
      <FlatButton
        key="delete"
        label="Submit"
        onTouchTap={this.handleDelete}
        primary
      />,
    ];
  }

  render() {
    const styles = this.getStyles();

    if (!this.state.user) {
      return <div />;
    }

    return (
      <div>
        <h1 style={styles.h1}>{'Manage User Details'}</h1>
        <TextField
          floatingLabelText="Username"
          hintText="Username"
          onChange={this._handleTextFieldChange}
          style={styles.name}
          value={this.state.user.name}
        />
        <div style={styles.doors}>
          <h3 style={styles.h3}>{'Allowed doors'}</h3>
          <Paper style={styles.paper}>
          {this.props.doors.data.map((door, i) => (
            <CustomCheckbox
              checked={this.state.user.doors[door.id]}
              key={i}
              label={door.name}
              name={door.key}
              item={door}
              onCheckFn={this._handleCheck}
              style={styles.checkbox}
            />
          ))}
          </Paper>

          <Dialog
            actions={this._getActionButtons()}
            modal
            onRequestClose={this.handleCloseDeletionConfirmation}
            open={this.state.confirmDeletion}
            title="Confirm deletion of user"
          >
            {'Are you sure you want to delete this user?'}
          </Dialog>

          <div style={styles.activateButton}>
            <Link to={`/manage/user/${this.state.user.name}/activate`}>
              <RaisedButton
                label="Activate user by QRCode"
                secondary
              />
            </Link>
          </div>

          <div style={styles.bottomButtons}>
            <Link to="/manage/user">
              <RaisedButton
                label="Back"
                style={styles.backButton}
              />
            </Link>
            <RaisedButton
              label="Save"
              onTouchTap={this._handleUpdate}
              primary
            />
            <RaisedButton
              label="Delete"
              onTouchTap={this.handleOpenDeletionConfirmation}
              primary
              style={styles.deleteButton}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    doors: state.doors,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteUser, updateUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);

UserDetail.propTypes = {
  auth: React.PropTypes.shape({
    token: React.PropTypes.string,
    status: React.PropTypes.string,
    username: React.PropTypes.string,
    admin: React.PropTypes.bool,
  }),
  deleteUser: React.PropTypes.func.isRequired,
  doors: React.PropTypes.shape({
    status: React.PropTypes.string,
    data: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        users: React.PropTypes.arrayOf(React.PropTypes.string),
      })
    ),
  }),
  params: React.PropTypes.shape({
    userId: React.PropTypes.string.isRequired,
  }),
  updateUser: React.PropTypes.func.isRequired,
  users: React.PropTypes.shape({
    status: React.PropTypes.string,
    data: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        doors: React.PropTypes.arrayOf(React.PropTypes.string),
      })
    ),
  }),
};
