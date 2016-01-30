import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import IconButton from 'material-ui/lib/icon-button';
import Divider from 'material-ui/lib/divider';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import LockOpen from 'material-ui/lib/svg-icons/action/lock-open';
import Home from 'material-ui/lib/svg-icons/action/home';
import AddCircleOutline from 'material-ui/lib/svg-icons/content/add-circle-outline';
import AccountBalance from 'material-ui/lib/svg-icons/action/account-balance';
import ActionFace from 'material-ui/lib/svg-icons/action/face';
import { Link } from 'react-router';

export default class MainAppBar extends React.Component {
  displayName: 'MainAppBar';

  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRequestChange = this.handleRequestChange.bind(this);
  }

  state = {
    open: false,
  };

  getStyles() {
    const styles = {
      closeButton: {
        textAlign: 'right',
      },
      leftBar: {
        textAlign: 'left',
      },
      link: {
        textDecoration: 'none',
      },
      leftBarTitle: {
        padding: '1em',
        margin: 0,
        backgroundColor: '#EFEFEF',
        borderBottom: '1px solid #CCC',
        borderTop: '1px solid #CCC',
      },
    };
    return styles;
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleRequestChange(open) {
    this.setState({ open });
  }

  render() {
    const styles = this.getStyles();
    return (
      <LeftNav
        docked={false}
        onRequestChange={this.handleRequestChange}
        open={this.state.open}
        style={styles.leftBar}
      >
        <div style={styles.closeButton}>
          <IconButton
            onTouchTap={this.handleClose}
            style={styles.closeButton}
          >
            <NavigationClose />
          </IconButton>
        </div>
        <h3 style={styles.leftBarTitle}>{'User zone'}</h3>
        <List>
          <Link
            style={styles.link}
            to="/"
          >
            <ListItem
              leftIcon={<Home />}
              onTouchTap={this.handleClose}
              primaryText="Home"
            />
          </Link>
          <Link
            style={styles.link}
            to="/door"
          >
            <ListItem
              leftIcon={<AccountBalance />}
              onTouchTap={this.handleClose}
              primaryText="Open Doors"
            />
          </Link>
        </List>
        <h3 style={styles.leftBarTitle}>{'Admin zone'}</h3>
        <List>
          <Link
            style={styles.link}
            to="/manage/user/add"
          >
            <ListItem
              leftIcon={<AddCircleOutline />}
              onTouchTap={this.handleClose}
              primaryText="Add New User"
            />
          </Link>
          <Link
            style={styles.link}
            to="/manage/user"
          >
            <ListItem
              leftIcon={<ActionFace />}
              onTouchTap={this.handleClose}
              primaryText="Manage Users"
            />
          </Link>
          <Link
            style={styles.link}
            to="/manage/door"
          >
            <ListItem
              leftIcon={<AccountBalance />}
              onTouchTap={this.handleClose}
              primaryText="Manage Doors"
            />
          </Link>
        </List>
        <Divider />
        <List>
          <Link
            style={styles.link}
            to="/logout"
          >
            <ListItem
              leftIcon={<LockOpen />}
              onTouchTap={this.handleClose}
              primaryText="Logout"
            />
          </Link>
        </List>
      </LeftNav>
    );
  }
}
