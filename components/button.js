import React from 'react';
import Radium from 'radium';
import { compose, withState } from 'recompose';

import { withSettingState } from './context';

export default compose(
  Radium,
  withSettingState,
  withState('focused', 'setFocused', false)
)(({ label, action, theme, focused, setFocused }) => (
  <button
    style={{
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
      outline: focused ? 'none' : undefined,
      ':hover': {
        color: theme.text2,
        backgroundColor: theme.background2hover,
      },
      ':active': {
        color: theme.background2,
        backgroundColor: theme.text2,
      },
    }}
    onClick={action}
    onFocus={() => setFocused(true)}
    onBlur={() => setFocused(false)}
  >
    {label}
  </button>
));
