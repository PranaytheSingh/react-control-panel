import React from 'react';

import { withSettingState } from './context';

const getOptions = options => {
  const keyVals = Array.isArray(options)
    ? options.map(opt => [opt, opt])
    : Object.entries((key, val) => [key, val]);
  return keyVals.map(([key, val]) => (
    <option key={key} value={key}>
      {val}
    </option>
  ));
};

const styles = {
  triangle: {
    borderRight: '3px solid transparent',
    borderLeft: '3px solid transparent',
    lineHeight: 20,
    position: 'absolute',
    right: '2.5%',
    zIndex: 1,
  },
};

const Select = ({ options, theme, value, onChange }) => (
  <React.Fragment>
    <span
      style={{
        ...styles.triangle,
        top: 11,
        borderTop: `5px solid ${theme.text2}`,
        borderBottom: '0px transparent',
      }}
    />
    <span
      style={{
        ...styles.triangle,
        top: 4,
        borderBottom: `5px solid ${theme.text2}`,
        borderTop: '0px transparent',
      }}
    />
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        display: 'inlineBlock',
        position: 'absolute',
        width: '62%',
        paddingLeft: '1.5%',
        height: 20,
        border: 'none',
        borderRadius: 0,
        outline: 'none',
        appearance: 'none',
        fontFamily: 'inherit',
        backgroundColor: theme.background2,
        color: theme.text2,
      }}
    >
      {...getOptions(options)}
    </select>
  </React.Fragment>
);

export default withSettingState(Select);
