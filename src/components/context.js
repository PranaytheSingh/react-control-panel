import React from 'react';

const ControlPanelContext = React.createContext({});
export default ControlPanelContext;

export const withTheme = Comp => ({ ...props }) => (
  <ControlPanelContext.Consumer>
    {({ theme }) => <Comp theme={theme} {...props} />}
  </ControlPanelContext.Consumer>
);

const Label = withTheme(({ label, theme }) => (
  <div
    style={{
      left: 0,
      width: '36%',
      display: 'inline-block',
      height: '20px',
      paddingRight: '2%',
      verticalAlign: 'top',
    }}
  >
    <span
      style={{
        color: theme.text1,
        display: 'inline-block',
        verticalAlign: 'sub',
      }}
    >
      {label}
    </span>
  </div>
));

export const Container = ({ label, children }) => (
  <div
    style={{
      position: 'relative',
      minHeight: '25px',
    }}
  >
    {label ? <Label label={label} /> : null}
    {children}
  </div>
);

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
