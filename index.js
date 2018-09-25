import React from 'react';
import isstring from 'is-string';
import uuid from 'uuid/v4';
import { withState } from 'recompose';

import themes from './themes';
import Title from './title';
import ControlPanelContext from './context';

const ControlPanel = ({
  width = 300,
  theme: suppliedTheme = 'dark',
  position,
  title,
  children,
  state,
  setState,
}) => {
  const theme = isstring(suppliedTheme) ? themes[suppliedTheme] : suppliedTheme;
  const id = uuid();

  const styles = {
    box: {
      background: theme.background1,
      width,
      padding: 14,
      paddingBottom: 8,
      opacity: 0.95,
      position: ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(position)
        ? 'absolute'
        : undefined,
      right: ['top-right', 'bottom-right'].includes(position) ? 8 : undefined,
      bottom: ['top-right', 'top-left'].includes(position) ? 8 : undefined,
    },
  };

  return (
    <ControlPanelContext.Provider value={{ state, setState, theme }}>
      <div className="control-panel" id={`control-panel-${id}`} style={styles.box}>
        {title ? <Title title={title} /> : null}
        {children}
      </div>
    </ControlPanelContext.Provider>
  );
};

export default withState('state', 'setState', {})(ControlPanel);
