import React from 'react';
import Radium from 'radium';
import { compose, withState } from 'recompose';

import { withTheme, Container } from './context';

export default compose(
  Radium,
  withTheme,
  withState('focused', 'setFocused', false)
)(({ label, action, theme, focused, setFocused }) => (
  <Container>
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
  </Container>
));
