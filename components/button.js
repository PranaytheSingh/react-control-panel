import React from 'react';
import Radium from 'radium';
import { compose } from 'recompose';

import { withSettingState } from './context';

const getStyle = theme => ({
  position: 'absolute',
  textAlign: 'center',
  height: 20,
  width: '62%',
  border: 'none',
  cursor: 'pointer',
  right: 0,
  fontFamily: 'inherit',
  color: theme.text2,
  backgroundColor: theme.background2,
  ':hover': {
    color: theme.text2,
    backgroundColor: theme.background2hover,
  },
  ':active': {
    color: theme.background2,
    backgroundColor: theme.text2,
  },
});

// TODO: handle focus style
// css(input, { outline: 'none' });

export default compose(
  Radium,
  withSettingState
)(({ label, action, theme }) => (
  <button style={getStyle(theme)} onClick={action}>
    {label}
  </button>
));
