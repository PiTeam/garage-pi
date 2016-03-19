import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Map as createMap, List as createList } from 'immutable';

import { addUser } from 'actions';
import { getAuthPropType, getDoorPropType, getUserPropType } from 'proptypes';

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this._initUser = this._initUser.bind(this);
    this._handleAdd = this._handleAdd.bind(this);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
    this._handleCheck = this._handleCheck.bind(this);
    this.state = {
      user: createMap(),
      userDoors: createList(),
      invalid: true,
    };
  }

  componentWillMount() {
    this._initUser(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._initUser(nextProps);
  }

  getStyles() {
    return {
      h1: {
        marginTop: 0,
        marginBottom: '1em',
      },
      h3: {
        marginTop: '2em',
        textAlign: 'left',
        marginBottom: '.5em',
      },
      addUser: {
        margin: 'auto',
        paddingBottom: '2em',
      },
      backButton: {
        float: 'left',
      },
      addButton: {
        float: 'right',
      },
      block: {
        width: '100%',
      },
      br: {
        clear: 'both',
      },
      doors: {
        margin: '2em',
        marginBottom: '4em',
      },
      paper: {
        padding: '1em',
        marginBottom: '2em',
      },
      checkbox: {
        paddingBottom: '.5em',
      },
      bottomButtons: {
        bottom: '1em',
        left: '1em',
        right: '1em',
        position: 'absolute',
      },
      divider: {
        marginTop: '1em',
        marginBottom: '1em',
      },
    };
  }

  _initUser(props) {
    const userDoors = props.doors.get('data').map(door => door.set('checked', false));
    this.setState({ userDoors });
  }

  _handleAdd() {
    const doors = this.state.userDoors
                    .filter(door => door.get('checked'))
                    .map(door => door.get('id'));

    this.props.addUser(this.state.user.set('doors', doors), this.props.auth.get('token'));
    browserHistory.push(`/manage/user/${this.state.user.name}/activate`);
  }

  _handleTextFieldChange(e) {
    const invalid = e.target.value === '';
    this.setState({ user: this.state.user.set('name', e.target.value), invalid });
  }

  _handleCheck(id, value) {
    const userDoors = this.state.userDoors.map(door => {
      if (door.get('id') === id) {
        return door.set('checked', value);
      }
      return door;
    });

    this.setState({ userDoors });
  }

  render() {
    const styles = this.getStyles();
    return (
      <div>
        <h1 style={styles.h1}>{'Add a new user'}</h1>
        <TextField
          floatingLabelText="Desired username"
          hintText="Desired username"
          onChange={this._handleTextFieldChange}
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
        </div>

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
          <RaisedButton
            disabled={this.state.invalid}
            label="Activate User"
            onTouchTap={this._handleAdd}
            primary
            style={styles.addButton}
          />
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
  return bindActionCreators({ addUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);

AddUser.propTypes = {
  addUser: React.PropTypes.func.isRequired,
  auth: getAuthPropType(),
  doors: getDoorPropType(),
  users: getUserPropType(),
};
