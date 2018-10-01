import React from 'react';
import isstring from 'is-string';
import PropTypes from 'prop-types';

import themes from './themes';
import Title from './components/title';
import ControlPanelContext from './components/context';
import Button from './components/button';
import Checkbox from './components/checkbox';
import Multibox from './components/multibox';
import Select from './components/select';
import Text from './components/text';
import Color from './components/color';
import Range from './components/range';
import Interval from './components/interval';
import { createPolyProxy } from './util';
import './components/styles/base.css';
import './components/styles/color.css';

export { default as Button } from './components/button';
export { default as Checkbox } from './components/checkbox';
export { default as Multibox } from './components/multibox';
export { default as Select } from './components/select';
export { default as Text } from './components/text';
export { default as Color } from './components/color';
export { default as Range } from './components/range';
export { default as Interval } from './components/interval';
export { default as themes } from './themes';

const settingTypeMapping = {
  range: Range,
  text: Text,
  checkbox: Checkbox,
  color: Color,
  button: Button,
  select: Select,
  multibox: Multibox,
  interval: Interval,
};

const VALID_POSITIONS = ['top-right', 'top-left', 'bottom-right', 'bottom-left'];

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.initialState || props.state || {};
    this.derivedSettings = [];

    if (!this.props.settings) {
      return;
    }

    const { derivedInitialState, derivedSettings } = this.props.settings.reduce(
      ({ derivedInitialState, derivedSettings }, { type, label, initial, ...props }) => {
        const SettingComponent = settingTypeMapping[type];

        if (!SettingComponent) {
          return { derivedInitialState, derivedSettings };
        }
        return {
          derivedInitialState: { ...derivedInitialState, [label]: initial },
          derivedSettings: [...derivedSettings, { SettingComponent, label, props }],
        };
      },
      { derivedInitialState: {}, derivedSettings: [] }
    );

    this.state = { ...this.state, ...derivedInitialState };
    this.derivedSettings = derivedSettings;
  }

  componentDidMount() {
    if (!this.props.contextCb) {
      return;
    }

    const handler = {
      get: (state, prop) => this.state[prop],
      set: (state, prop, val) => this.setState({ [prop]: val }),
    };

    this.props.contextCb(createPolyProxy(this.state, handler, this.setState.bind(this)));
  }

  getState() {
    return this.props.state ? this.props.state : this.state;
  }

  indicateChange(label, newVal) {
    const newState = { ...this.getState(), [label]: newVal };
    this.props.onChange(label, newVal, newState);
    if (!this.props.state) {
      this.setState(newState);
    }
  }

  render() {
    const { width, theme: suppliedTheme, position, title, children, style } = this.props;

    const theme = isstring(suppliedTheme) ? themes[suppliedTheme] || themes['dark'] : suppliedTheme;
    const state = this.getState();

    return (
      <div
        className="control-panel"
        style={{
          display: 'inline-block',
          background: theme.background1,
          width,
          padding: 14,
          paddingBottom: 8,
          opacity: 0.95,
          position: VALID_POSITIONS.includes(position) ? 'absolute' : undefined,
          ...(['top-right', 'bottom-right'].includes(position) ? { right: 8 } : { bottom: 8 }),
          ...(['top-right', 'top-left'].includes(position) ? { top: 8 } : { bottom: 8 }),
          ...style,
        }}
      >
        <ControlPanelContext.Provider
          value={{
            state,
            theme,
            indicateChange: this.indicateChange.bind(this),
          }}
        >
          {title ? <Title title={title} /> : null}
          {children}
          {this.derivedSettings.map(({ SettingComponent, label, props }) => (
            <SettingComponent
              key={label}
              label={label}
              {...props}
              value={state[label]}
              onChange={newVal => this.setState({ [label]: newVal })}
            />
          ))}
        </ControlPanelContext.Provider>
      </div>
    );
  }
}

ControlPanel.propTypes = {
  initialState: PropTypes.object,
  onChange: PropTypes.func,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.string,
  width: PropTypes.number,
  position: PropTypes.oneOf(VALID_POSITIONS),
  style: PropTypes.object,
  settings: PropTypes.arrayOf(PropTypes.object),
  state: PropTypes.object,
  contextCb: PropTypes.func,
};

ControlPanel.defaultProps = {
  width: 300,
  theme: 'dark',
  onChange: () => {},
  style: {},
};

export default ControlPanel;
