import React from 'react';

import Container from './container';

const ControlPanelContext = React.createContext({});

export default ControlPanelContext;

export const withSettingState = Comp => ({ label, ...props }) => (
  <ControlPanelContext.Consumer>
    {({ state, setState, theme }) => (
      <Container label={label}>
        <Comp
          value={state[label]}
          onChange={newVal => setState({ ...state, [label]: newVal })}
          theme={theme}
          {...props}
        />
      </Container>
    )}
  </ControlPanelContext.Consumer>
);

export const withTheme = Comp => ({ ...props }) => (
  <ControlPanelContext.Consumer>
    {({ theme }) => <Comp theme={theme} {...props} />}
  </ControlPanelContext.Consumer>
);
