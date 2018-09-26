import React from 'react';
import { withSettingState } from './context';
import { withState } from 'recompose';

const Text = withState('focused', 'setFocused', false)(
  ({ theme, value, onChange, focused, setFocused }) => (
    <input
      style={{
        position: 'absolute',
        paddingLeft: '6px',
        height: '20px',
        width: '59.5%',
        border: 'none',
        background: theme.background2,
        color: theme.text2,
        fontFamily: 'inherit',
        outline: focused ? 'none' : undefined,
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  )
);

export default withSettingState(Text);
