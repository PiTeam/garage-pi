import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';
import Dialog from 'material-ui/lib/dialog';
import { browserHistory, Link } from 'react-router';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

import CustomCheckbox from 'components/custom-checkbox';
import { deleteUser, updateUser } from 'actions';
import { getAuthPropType, getDoorPropType, getUserPropType } from 'proptypes';

class UserDetail extends Component {

  constructor(props) {
    super(props);
    this._getActionButtons = this._getActionButtons.bind(this);
    this.handleCloseDeletionConfirmation = this.handleCloseDeletionConfirmation.bind(this);
    this.handleOpenDeletionConfirmation = this.handleOpenDeletionConfirmation.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this._handleUpdate = this._handleUpdate.bind(this);
    this._handleCheck = this._handleCheck.bind(this);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
    this._selectUser = this._selectUser.bind(this);
    this.state = {
      confirmDeletion: false,
      user: undefined,
      userDoors: undefined,
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

  _selectUser(props) {
    const user = props.users.get('data').find(u => u.get('id') === props.params.userId);
    const userDoors = props.doors.get('data').map(door => (
      door.set('checked', user.get('doors').indexOf(door.get('id')) !== -1)
    ));
    this.setState({ user, userDoors });
  }

  _handleUpdate() {
    const doors = this.state.userDoors
                    .filter(door => door.get('checked'))
                    .map(door => door.get('id'));

    this.props.updateUser(this.state.user.set('doors', doors), this.props.auth.get('token'));
    browserHistory.push('/manage/user');
  }

  _handleTextFieldChange(e) {
    this.setState({ user: this.state.user.set('name', e.target.value) });
  }

  handleDelete() {
    this.props.deleteUser(this.state.user, this.props.auth.get('token'));
    browserHistory.push('/manage/user');
  }

  _handleCheck(id, value) {
    const index = this.state.userDoors.findIndex(door => door.get('id') === id);
    const userDoors = this.state.userDoors.update(index, door => door.set('checked', value));
    this.setState({ userDoors });
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
          value={this.state.user.get('name')}
        />
        <div style={styles.doors}>
          <h3 style={styles.h3}>{'Allowed doors'}</h3>
          <Paper style={styles.paper}>
          {this.state.userDoors.map((door, i) => (
            <CustomCheckbox
              checked={door.get('checked')}
              key={i}
              label={door.get('name')}
              name={door.get('key')}
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
            <Link to={`/manage/user/${this.state.user.get('name')}/activate`}>
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
  auth: getAuthPropType(),
  deleteUser: React.PropTypes.func.isRequired,
  doors: getDoorPropType(),
  params: React.PropTypes.shape({
    userId: React.PropTypes.string.isRequired,
  }),
  updateUser: React.PropTypes.func.isRequired,
  users: getUserPropType(),
};
