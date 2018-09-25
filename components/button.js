import React from 'react';

import { withSettingState } from './context';

const style = {
  position: 'absolute',
  textAlign: 'center',
  height: 20,
  width: '62%',
  border: 'none',
  cursor: 'pointer',
  right: 0,
  fontFamily: 'inherit',
};

// TODO: handle focus style
// css(input, { outline: 'none' });

export default withSettingState(({ label, action }) => (
  <button style={style} onClick={action}>
    {label}
  </button>
));
