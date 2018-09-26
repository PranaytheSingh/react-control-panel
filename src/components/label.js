import React from 'react';

import withSettingState from './context';

const getStyles = theme => ({
  root: {
    left: 0,
    width: '36%',
    display: 'inline-block',
    height: '20px',
    paddingRight: '2%',
    verticalAlign: 'top',
  },
  text: {
    color: theme.text1,
    display: 'inline-block',
    verticalAlign: 'sub',
  },
});

const Label = ({ label, theme }) => {
  const styles = getStyles(theme);

  return (
    <div style={styles.root}>
      <span style={styles.text}>{label}</span>
    </div>
  );
};

export default withSettingState(Label);
