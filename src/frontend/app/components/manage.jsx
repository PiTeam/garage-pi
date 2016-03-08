import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';
import Divider from 'material-ui/lib/divider';
import Paper from 'material-ui/lib/paper';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import AccountBalance from 'material-ui/lib/svg-icons/action/account-balance';
import ActionFace from 'material-ui/lib/svg-icons/action/face';
import * as Colors from 'material-ui/lib/styles/colors';

const Manage = () => {
  const getStyles = () => ({
    h1: {
      marginBottom: '1em',
    },
    manageUsers: {
      margin: '1em',
    },
    buttonAdd: {
      float: 'right',
      margin: '1em',
    },
    backButton: {
      float: 'left',
    },
    clear: {
      clear: 'both',
    },
    paper: {
      padding: '0 .5em',
      marginBottom: '2em',
    },
    listitem: {
      fontSize: '18px',
      textDecoration: 'none',
      padding: '.5em 0',
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
  });

  const styles = getStyles();
  return (
    <div style={styles.manageUsers}>
      <h1 style={styles.h1}>{'Admin Menu'}</h1>
      <Paper style={styles.paper}>
        <List>
          <Link
            style={styles.link}
            to="/manage/user"
          >
            <ListItem
              leftAvatar={
                <Avatar
                  backgroundColor={Colors.yellow800}
                  icon={<ActionFace />}
                />
              }
              style={styles.listitem}
            >
              {'Manage Users'}
            </ListItem>
          </Link>
          <Divider />
          <Link
            style={styles.link}
            to="/manage/door"
          >
            <ListItem
              leftAvatar={
                <Avatar
                  backgroundColor={Colors.blue500}
                  icon={<AccountBalance />}
                />
              }
              style={styles.listitem}
            >
              {'Manage Doors'}
            </ListItem>
          </Link>
        </List>
      </Paper>
      <div style={styles.bottomButtons}>
        <Link
          to="/"
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

export default Manage;
