import React from 'react';

import { getGenericPropType } from 'proptypes';

const CustomCheckbox = ({ onCheckFn, item, rest }) => {
  const _onCheck = (e, value) => onCheckFn(item.get('id'), value);
  return <Checkbox onCheck={_onCheck} {...rest} />;
};

CustomCheckbox.propTypes = {
  onCheckFn: React.PropTypes.func,
  item: getGenericPropType(),
};

export default CustomCheckbox;
