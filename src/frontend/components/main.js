import React from 'react';

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.onHandleOpenLeftNav = this.onHandleOpenLeftNav.bind(this);
    this._handleSetRefLeftBar = this._handleSetRefLeftBar.bind(this);
  }

  onHandleOpenLeftNav() {
    this.leftbar.handleOpen();
  }

  _handleSetRefLeftBar(c) {
    this.leftbar = c;
  }

  render() {
    return (
      <div>
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
