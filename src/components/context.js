import React from 'react';

const ControlPanelContext = React.createContext({});
export default ControlPanelContext;

export const withTheme = Comp => ({ ...props }) => (
  <ControlPanelContext.Consumer>
    {({ theme }) => <Comp theme={theme} {...props} />}
  </ControlPanelContext.Consumer>
);

const getLabelStyles = theme => ({
  body: {
    left: 0,
    width: '36%',
    display: 'inline-block',
    height: 20,
    paddingRight: '2%',
    verticalAlign: 'top',
  },
  text: {
    color: theme.text1,
    display: 'inline-block',
    verticalAlign: 'sub',
  },
});

const Label = withTheme(({ label, theme }) => {
  const styles = getLabelStyles(theme);

  return (
    <div style={styles.body}>
      <span style={styles.text}>{label}</span>
    </div>
  );
});

export const Container = ({ label, children }) => (
  <div className="container">
    <Label label={label || ''} />
    {children}
  </div>
);

export const withSettingState = mapPropsToStyles => Comp => ({ label, ...props }) => (
  <ControlPanelContext.Consumer>
    {({ state, setState, theme, indicateChange }) => {
      const compProps = {
        ...props,
        value: state[label],
        onChange: newVal => indicateChange(label, newVal),
        theme,
      };
      if (mapPropsToStyles) {
        compProps.styles = mapPropsToStyles(compProps);
      }

      return (
        <Container label={label}>
          <Comp {...compProps} />
        </Container>
      );
    }}
  </ControlPanelContext.Consumer>
);
