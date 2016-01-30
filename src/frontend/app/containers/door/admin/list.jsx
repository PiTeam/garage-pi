import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from 'material-ui/lib/lists/list-item';
import { Link } from 'react-router';
import Avatar from 'material-ui/lib/avatar';
import ActionSettings from 'material-ui/lib/svg-icons/action/settings';
import Divider from 'material-ui/lib/divider';
import List from 'material-ui/lib/lists/list';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

class DoorList extends Component {
  displayName: 'DoorList';

  getStyles() {
    return {
      h1: {
        marginBottom: '1em',
      },
      paper: {
        padding: '0 .5em',
        marginBottom: '4em',
      },
      backButton: {
        float: 'left',
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
      clear: {
        clear: 'both',
      },
    };
  }

  render() {
    const styles = this.getStyles();

    if (this.props.doors.status === 'pending') {
      return <div />;
    }

    return (
      <div>
        <h1 style={styles.h1}>{'Manage doors'}</h1>
        <Paper style={styles.paper}>
          <List>
            {this.props.doors.data.map((door, i) => (
              <div key={i}>
                <Link
                  style={styles.link}
                  to={`/manage/door/${door.id}`}
                >
                  <ListItem
                    leftAvatar={<Avatar src={door.image} />}
                    primaryText={door.name}
                    rightIcon={<ActionSettings />}
                  />
                </Link>
                {i < this.props.doors.data.length-1 && <Divider />}
              </div>
              ))
            }
          </List>
        </Paper>
        <div style={styles.bottomButtons}>
          <Link
            to="/manage"
          >
            <RaisedButton
              label="Back"
              style={styles.backButton}
            />
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ doors }) {
  return { doors };
}

export default connect(mapStateToProps)(DoorList);

DoorList.propTypes = {
  doors: React.PropTypes.shape({
    status: React.PropTypes.string,
    data: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        users: React.PropTypes.arrayOf(React.PropTypes.string),
      }),
    ),
  }),
};
