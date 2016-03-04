import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { getAuthPropType } from 'proptypes';

export default class MainAppBar extends React.Component {
  displayName: 'MainAppBar';

  handleLeftIcon() {
    const styles = {
      color: 'white',
      marginTop: '5px',
    };

    return this.props.auth.get('status') === 'success' ?
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
        showMenuIconButton={this.props.auth.get('status') === 'success' &&
                            this.props.auth.get('admin')}
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
  auth: getAuthPropType(),
  handleOpenLeftNav: React.PropTypes.func.isRequired,
};
