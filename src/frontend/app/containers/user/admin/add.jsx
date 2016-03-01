import React from 'react';
import TextField from 'material-ui/lib/text-field';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import CustomCheckbox from 'components/custom-checkbox';
import { addUser } from 'actions';

export default class AddUser extends React.Component {
  displayName: 'AddUser';

  constructor(props) {
    super(props);
    this._handleAdd = this._handleAdd.bind(this);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
    this._handleCheck = this._handleCheck.bind(this);
  }

  state = {
    user: { name: '', doors: {} },
    invalid: true,
  };

  componentWillReceiveProps() {
    const doors = {};
    if (this.props.doors.data.length > 0) {
      this.props.doors.data.forEach(door => {
        doors[door.id] = false;
      });

      this.setState({ user: { doors } });
    }
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

  _handleAdd() {
    const doors = Object.keys(this.state.user.doors)
                    .filter(doorId => this.state.user.doors[doorId]);

    const user = Object.assign({}, this.state.user, { doors });
    this.props.addUser(user, this.props.auth.token.value);
    browserHistory.push(`/manage/user/${this.state.user.name}/activate`);
  }

  _handleTextFieldChange(e) {
    const user = Object.assign({}, this.state.user, { name: e.target.value });
    this.setState({ user, invalid: false });
  }

  _handleCheck(id, value) {
    const doors = Object.assign({}, this.state.user.doors);
    doors[id] = value;

    const user = Object.assign({}, this.state.user, { doors });
    this.setState({ user });
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
              name={door._id}
              item={door}
              onCheck={this._handleCheck}
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
  auth: React.PropTypes.shape({
    token: React.PropTypes.shape({
      status: React.PropTypes.string,
      value: React.PropTypes.string,
    }),
    status: React.PropTypes.string,
  }),
  doors: React.PropTypes.shape({
    status: React.PropTypes.string,
    data: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.string,
        name: React.PropTypes.string,
        users: React.PropTypes.arrayOf(React.PropTypes.string),
      })
    ),
  }),
  users: React.PropTypes.shape({
    status: React.PropTypes.string,
    data: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.string,
        name: React.PropTypes.string,
        doors: React.PropTypes.arrayOf(React.PropTypes.string),
      })
    ),
  }),
};
