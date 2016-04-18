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
import { deleteDoor, updateDoor } from 'actions';
import { getAuthPropType, getDoorPropType, getUserPropType } from 'proptypes';

class DoorDetail extends Component {
  constructor(props) {
    super(props);
    this._handleSetRefDoorname = this._handleSetRefDoorname.bind(this);
    this._getActionButtons = this._getActionButtons.bind(this);
    this.handleCloseDeletionConfirmation = this.handleCloseDeletionConfirmation.bind(this);
    this.handleOpenDeletionConfirmation = this.handleOpenDeletionConfirmation.bind(this);
    this._handleUpdate = this._handleUpdate.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._handleCheck = this._handleCheck.bind(this);
    this._selectDoor = this._selectDoor.bind(this);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
    this.state = {
      confirmDeletion: false,
      door: undefined,
      doorUsers: undefined,
    };
  }

  componentWillMount() {
    if (this.props.doors.get('status') === 'success' &&
        this.props.users.get('status') === 'success') {
      this._selectDoor(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.doors.get('status') === 'success' &&
        this.props.users.get('status') === 'success') {
      this._selectDoor(nextProps);
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
      users: {
        margin: '2em',
        marginBottom: '4em',
      },
      bottomButtons: {
        bottom: '1em',
        left: '1em',
        right: '1em',
        position: 'absolute',
      },
    };
  }

  _selectDoor(props) {
    const door = props.doors.get('data').find(u => u.get('id') === props.params.doorId);
    const doorUsers = props.users.get('data').map(user => (
      user.set('checked', user.get('doors').indexOf(door.get('id')) !== -1)
    ));
    this.setState({ door, doorUsers });
  }

  _handleUpdate() {
    const users = this.state.doorUsers
                    .filter(user => user.get('checked'))
                    .map(user => user.get('id'));

    this.props.updateDoor(this.state.door.set('users', users), this.props.auth.get('token'));
    browserHistory.push('/manage/door');
  }

  _handleDelete() {
    this.props.deleteDoor(this.state.door.get('id'), this.props.auth.get('token'));
    browserHistory.push('/manage/door');
  }

  _handleTextFieldChange(e) {
    this.setState({ door: this.state.door.set('name', e.target.value) });
  }

  _handleCheck(id, value) {
    const index = this.state.doorUsers.findIndex(user => user.get('id') === id);
    const doorUsers = this.state.doorUsers.update(index, user => user.set('checked', value));
    this.setState({ doorUsers });
  }

  _handleSetRefDoorname(c) {
    this.doorname = c;
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
        onTouchTap={this._handleDelete}
        primary
      />,
    ];
  }

  render() {
    const styles = this.getStyles();

    if (!this.state.door) {
      return <div />;
    }

    return (
      <div>
        <h1 style={styles.h1}>{'Manage Door Details'}</h1>
        <TextField
          floatingLabelText="Door name"
          hintText="Door name"
          onChange={this._handleTextFieldChange}
          ref={this._handleSetRefDorrname}
          style={styles.name}
          value={this.state.door.get('name')}
        />
        <div style={styles.users}>
          <h3 style={styles.h3}>{'Allowed users'}</h3>
          <Paper style={styles.paper}>
          {this.state.doorUsers.map(user => (
            <CustomCheckbox
              checked={user.get('checked')}
              key={user.get('id')}
              label={user.get('name')}
              name={user.get('key')}
              item={user}
              onCheck={this._handleCheck}
              style={styles.checkbox}
            />
          ))}
          </Paper>

          <Dialog
            actions={this._getActionButtons()}
            modal
            onRequestClose={this.handleCloseDeletionConfirmation}
            open={this.state.confirmDeletion}
            title="Confirm deletion of door"
          >
            {'Are you sure you want to delete this door?'}
          </Dialog>

          <div style={styles.bottomButtons}>
            <Link to="/manage/door">
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
  return bindActionCreators({ deleteDoor, updateDoor }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DoorDetail);

DoorDetail.propTypes = {
  auth: getAuthPropType(),
  deleteDoor: React.PropTypes.func.isRequired,
  doors: getDoorPropType(),
  params: React.PropTypes.shape({
    doorId: React.PropTypes.string.isRequired,
  }),
  updateDoor: React.PropTypes.func.isRequired,
  users: getUserPropType(),
};
