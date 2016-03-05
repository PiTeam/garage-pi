import React from 'react';

import Checkbox from 'material-ui/lib/checkbox';
import { getGenericPropType } from 'proptypes';

export default class CustomCheckbox extends React.Component {
  displayName: 'CustomCheckbox';

  constructor(props) {
    super(props);
    this._onCheck = this._onCheck.bind(this);
  }

  _onCheck(e, value) {
    this.props.onCheckFn(this.props.item.get('id'), value);
  }

  render() {
    return (
      <Checkbox onCheck={this._onCheck} {...this.props} />
    );
  }
}

CustomCheckbox.propTypes = {
  onCheckFn: React.PropTypes.func,
  item: getGenericPropType(),
};
