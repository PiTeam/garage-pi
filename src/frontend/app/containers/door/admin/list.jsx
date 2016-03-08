import React from 'react';
import { connect } from 'react-redux';
import ListItem from 'material-ui/lib/lists/list-item';
import { Link } from 'react-router';
import Avatar from 'material-ui/lib/avatar';
import ActionSettings from 'material-ui/lib/svg-icons/action/settings';
import Divider from 'material-ui/lib/divider';
import List from 'material-ui/lib/lists/list';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

import { getDoorPropType } from 'proptypes';

const DoorList = ({ doors }) => {
  const getStyles = () => ({
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
  });

  const styles = getStyles();
  return (
    <div>
      <h1 style={styles.h1}>{'Manage doors'}</h1>
      <Paper style={styles.paper}>
        <List>
          {doors.get('data').map((door, i) => (
            <div key={i}>
              <Link
                style={styles.link}
                to={`/manage/door/${door.get('id')}`}
              >
                <ListItem
                  leftAvatar={<Avatar src={door.get('image')} />}
                  primaryText={door.get('name')}
                  rightIcon={<ActionSettings />}
                />
              </Link>
              {i < doors.get('data').size - 1 && <Divider />}
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
};

function mapStateToProps({ doors }) {
  return { doors };
}

export default connect(mapStateToProps)(DoorList);

DoorList.propTypes = {
  doors: getDoorPropType(),
};
