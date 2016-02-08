import React from 'react';

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
      main: {
        textAlign: 'center',
        minHeight: '100%',
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
      <div style={styles.main}>
        <MainAppBar
          handleOpenLeftNav={this.onHandleOpenLeftNav}
        />
        <MainLeftBar
          ref={this._handleSetRefLeftBar}
        />
        {this.props.children}
      </div>
    );
  }
}

Main.propTypes = {
  children: React.PropTypes.any,
};
