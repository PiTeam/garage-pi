import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from 'material-ui/lib/lists/list-item';
import { Link } from 'react-router';
import Avatar from 'material-ui/lib/avatar';
import ActionSettings from 'material-ui/lib/svg-icons/action/settings';
import Divider from 'material-ui/lib/divider';
import List from 'material-ui/lib/lists/list';
import Paper from 'material-ui/lib/paper';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import RaisedButton from 'material-ui/lib/raised-button';

class UserList extends Component {
  displayName: 'UserList';

  getStyles() {
    return {
      h1: {
        marginBottom: '1em',
      },
      buttonAdd: {
        position: 'absolute',
        right: '1em',
        bottom: '0em',
      },
      backButton: {
        float: 'left',
      },
      clear: {
        clear: 'both',
      },
      paper: {
        padding: '0 .5em',
        marginBottom: '5em',
      },
      link: {
        textDecoration: 'none',
      },
      bottomButtons: {
        bottom: '1em',
        left: '1em',
        right: '1em',
        position: 'absolute',
      },
    };
  }

  render() {
    const styles = this.getStyles();

    if (this.props.users.status === 'pending') {
      return <div />;
    }

    return (
      <div>
        <h1 style={styles.h1}>{'Manage users'}</h1>
        <Paper style={styles.paper}>
          <List>
            {this.props.users.data.map((user, i) => (
              <div key={i}>
                <Link
                  style={styles.link}
                  to={`/manage/user/${user.id}`}
                >
                  <ListItem
                    leftAvatar={<Avatar src={user.image} />}
                    primaryText={user.name}
                    rightIcon={<ActionSettings />}
                  />
                </Link>
                {i < this.props.users.data.length-1 && <Divider />}
              </div>
              ))
            }
          </List>
        </Paper>

        <div style={styles.bottomButtons}>
          <Link to="/manage/user/add">
            <FloatingActionButton style={styles.buttonAdd}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>
          <br style={styles.clear} />
          <Link
            style={styles.link}
            to="/manage"
          >
            <RaisedButton
              label="Back"
              style={styles.backButton}
            />
          </Link>
        </div>
        <div style={styles.clear} />
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps)(UserList);

UserList.propTypes = {
  users: React.PropTypes.shape({
    status: React.PropTypes.string.isRequired,
    data: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        doors: React.PropTypes.arrayOf(React.PropTypes.string),
      }),
    ),
    doors: React.PropTypes.arrayOf(React.PropTypes.number),
  }),
};
