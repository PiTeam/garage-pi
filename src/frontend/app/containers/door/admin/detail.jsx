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
import { deleteDoor, updateDoor } from 'actions';

class DoorDetail extends Component {
  displayName: 'DoorDetail';

  constructor(props) {
    super(props);
    this._handleSetRefDoorname = this._handleSetRefDoorname.bind(this);
    this._getActionButtons = this._getActionButtons.bind(this);
    this.handleCloseDeletionConfirmation = this.handleCloseDeletionConfirmation.bind(this);
    this.handleOpenDeletionConfirmation = this.handleOpenDeletionConfirmation.bind(this);
    this._handleUpdate = this._handleUpdate.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._handleCheck = this._handleCheck.bind(this);
    this._getDoor = this._getDoor.bind(this);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
  }

  state = {
    confirmDeletion: false,
    door: undefined,
  };

  componentWillMount() {
    if (!this.state.door &&
         this.props.doors.status === 'done' &&
         this.props.users.status === 'done') {
      const door = this._getDoor(this.props.params.doorId,
                                 this.props.doors.data, this.props.users.data);
      this.setState({ door });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.door &&
         nextProps.doors.status === 'done' &&
         nextProps.users.status === 'done') {
      const door = this._getDoor(nextProps.params.doorId,
                                 nextProps.doors.data, nextProps.users.data);
      this.setState({ door });
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

  _handleUpdate() {
    const users = Object.keys(this.state.door.users)
                    .filter(userId => this.state.door.users[userId]);

    const door = Object.assign({}, this.state.door, { users });
    this.props.updateDoor(door, this.props.auth.token.value);
    browserHistory.push('/manage/door');
  }

  _handleDelete() {
    this.props.deleteDoor(this.state.door.id, this.props.auth.token.value);
    browserHistory.push('/manage/door');
  }

  _handleTextFieldChange(e) {
    const door = Object.assign({}, this.state.door, { name: e.target.value });
    this.setState({ door });
  }

  _handleCheck(id, value) {
    const users = Object.assign({}, this.state.door.users);
    users[id] = value;

    const door = Object.assign({}, this.state.door, { users });
    this.setState({ door });
  }

  _handleSetRefDoorname(c) {
    this.doorname = c;
  }

  _getDoor(id, doors, users) {
    const selected = doors.filter(door => door.id === id);
    const doorUsers = {};
    users.forEach(user => {
      doorUsers[user.id] = selected[0].users instanceof Array &&
                           selected[0].users.indexOf(user.id) !== -1;
    });

    return Object.assign({}, selected[0], { users: doorUsers });
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
          value={this.state.door.name}
        />
        <div style={styles.users}>
          <h3 style={styles.h3}>{'Allowed users'}</h3>
          <Paper style={styles.paper}>
          {this.props.users.data.map(user => (
            <CustomCheckbox
              checked={this.state.door.users[user.id]}
              key={user.id}
              label={user.name}
              name={user.key}
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
  auth: React.PropTypes.shape({
    token: React.PropTypes.shape({
      status: React.PropTypes.string,
      value: React.PropTypes.string,
    }),
    status: React.PropTypes.string,
  }),
  deleteDoor: React.PropTypes.func.isRequired,
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
    doorId: React.PropTypes.string.isRequired,
  }),
  updateDoor: React.PropTypes.func.isRequired,
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
