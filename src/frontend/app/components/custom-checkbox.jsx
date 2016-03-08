import React from 'react';

import Checkbox from 'material-ui/lib/checkbox';

export const CustomCheckbox = ({ onCheckFn, ...rest }) => (
  <Checkbox onCheck={onCheckFn} {...rest} />
);

CustomCheckbox.propTypes = {
  onCheckFn: React.PropTypes.func,
};
