import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import { Link } from 'react-router';
import { connect } from 'react-redux';

export default class MainAppBar extends React.Component {
  displayName: 'MainAppBar';

  handleLeftIcon() {
    const styles = {
      color: 'white',
      marginTop: '5px',
    };

    return this.props.auth.status === 'success' ?
      <Link to="/logout">
        <FlatButton
          label="Logout"
          style={styles}
        />
      </Link> :
      <Link to="/login">
        <FlatButton
          label="Login"
          style={styles}
        />
      </Link>;
  }

  render() {
    const styles = {
      appbar: {
        marginBottom: '.5em',
        textAlign: 'left',
      },
      link: {
        color: 'white',
        textDecoration: 'none',
      },
    };

    return (
      <AppBar
        iconElementRight={this.handleLeftIcon()}
        onLeftIconButtonTouchTap={this.props.handleOpenLeftNav}
        showMenuIconButton={this.props.auth.status === 'success' && this.props.auth.admin}
        style={styles.appbar}
        title={
          <Link style={styles.link}
            to="/"
          >{'GaragePi'}</Link>}
      />
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(MainAppBar);

MainAppBar.propTypes = {
  auth: React.PropTypes.shape({
    token: React.PropTypes.string,
    status: React.PropTypes.string,
    username: React.PropTypes.string,
    admin: React.PropTypes.bool,
  }),
  handleOpenLeftNav: React.PropTypes.func.isRequired,
};
