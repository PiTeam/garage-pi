import React from 'react';
import Paper from 'material-ui/lib/paper';

import MainAppBar from 'containers/appbar';
import MainLeftBar from 'containers/leftnav';

export default class Main extends React.Component {
  displayName: 'Main';

  constructor(props) {
    super(props);
    this.onHandleOpenLeftNav = this.onHandleOpenLeftNav.bind(this);
    this._handleSetRefLeftBar = this._handleSetRefLeftBar.bind(this);
  }

  onHandleOpenLeftNav() {
    this.leftbar.handleOpen();
  }

  getStyles() {
    return {
      paper: {
        textAlign: 'center',
        padding: 10,
        minHeight: '100%',
        margin: '1em',
        backgroundColor: '#F0FFFF',
        position: 'relative',
      },
    };
  }

  _handleSetRefLeftBar(c) {
    this.leftbar = c;
  }

  render() {
    const styles = this.getStyles();
    return (
      <Paper style={styles.paper}>
        <MainAppBar
          handleOpenLeftNav={this.onHandleOpenLeftNav}
        />
        <MainLeftBar
          ref={this._handleSetRefLeftBar}
        />
        {this.props.children}
      </Paper>
    );
  }
}

Main.propTypes = {
  children: React.PropTypes.any,
};
