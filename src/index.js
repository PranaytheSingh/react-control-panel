import React from 'react';
import isstring from 'is-string';

import themes from './themes';
import Title from './components/title';
import ControlPanelContext from './components/context';

export { default as Button } from './components/button';
export { default as Checkbox } from './components/checkbox';
export { default as Multibox } from './components/multibox';
export { default as Select } from './components/select';
export { default as Text } from './components/text';
// TODO: Color
// TODO: Range
// TODO: Interval

import './components/styles/base.css';
import './components/styles/color.css';

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.initialState || {};
  }

  render() {
    const {
      width = 300,
      theme: suppliedTheme = 'dark',
      position,
      title,
      onChange,
      children,
      style = {},
    } = this.props;

    const theme = isstring(suppliedTheme) ? themes[suppliedTheme] : suppliedTheme;

    const styles = {
      box: {
        display: 'inline-block',
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
      <ControlPanelContext.Provider
        value={{
          state: this.state,
          theme,
          indicateChange: (label, newVal) => {
            const newState = { ...this.state, [label]: newVal };
            onChange(label, newVal, newState);
            this.setState(newState);
          },
        }}
      >
        <div className="control-panel" style={{ ...styles.box, ...style }}>
          {title ? <Title title={title} /> : null}
          {children}
        </div>
      </ControlPanelContext.Provider>
    );
  }
}

export default ControlPanel;
