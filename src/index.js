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
import Custom from './components/custom';
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
export { default as Custom } from './components/custom';
export { default as themes } from './themes';
export { default as Value } from './components/value';
export { Container, withSettingState, withTheme, Label } from './components/context';

const settingTypeMapping = {
  range: Range,
  text: Text,
  checkbox: Checkbox,
  color: Color,
  button: Button,
  select: Select,
  multibox: Multibox,
  interval: Interval,
  custom: Custom,
};

const VALID_POSITIONS = ['top-right', 'top-left', 'bottom-right', 'bottom-left'];

/**
 *
 * @param {string | { left?: number, right?: number, bottom?: number, top?: number }} position
 */
const parsePositionPropToOffsets = position => {
  if (typeof position === 'object') {
    return position;
  }

  if (!position) {
    return {};
  }

  return {
    ...(position.includes('top') ? { top: 8 } : {}),
    ...(position.includes('left') ? { left: 8 } : {}),
    ...(position.includes('right') ? { right: 8 } : {}),
    ...(position.includes('bottom') ? { bottom: 8 } : {}),
  };
};

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);

    const position = parsePositionPropToOffsets(props.position);
    this.state = { data: props.initialState || props.state || {}, position };
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

    this.state.data = { ...this.state.data, ...derivedInitialState };
    this.derivedSettings = derivedSettings;
  }

  componentDidMount() {
    if (this.props.draggable) {
      document.addEventListener('mousemove', this.handleMouseDrag);
      // `setTimeout` here in order to avoid re-rendering the component and potentially discarding
      // new data from child settings that were changed as a result of this.
      document.addEventListener('mouseup', () =>
        setTimeout(() => this.setState({ dragging: false }))
      );
    }

    if (!this.props.contextCb) {
      return;
    }

    const handler = {
      get: (state, prop) => this.state.data[prop],
      set: (state, prop, val) => this.setState({ data: { ...this.state.data, [prop]: val } }),
    };

    const setData = data => this.setState({ data: { ...this.state.data, ...data } });
    this.props.contextCb(createPolyProxy(this.state.data, handler, setData));
  }

  getState() {
    return this.props.state ? this.props.state : this.state.data;
  }

  indicateChange(label, newVal) {
    const newState = { ...this.getState(), ...this.state.data, [label]: newVal };
    this.props.onChange(label, newVal, newState);
    if (!this.props.state) {
      this.setState({ data: newState });
    }
  }

  handleMouseDown = evt => {
    if ((evt.target.className || '').includes('draggable')) {
      this.setState({
        dragging: true,
        mouseDownCoords: { x: evt.pageX, y: evt.pageY },
        mouseDownPos: { ...this.state.position },
      });
    }
  };

  handleMouseDrag = evt => {
    if (this.state.dragging) {
      const diffX = evt.pageX - this.state.mouseDownCoords.x;
      const diffY = evt.pageY - this.state.mouseDownCoords.y;

      const position = (typeof this.props.position === 'string' ? this.props.position : '') || '';
      const offset = position.includes('left')
        ? { left: this.state.mouseDownPos.left + diffX }
        : { right: this.state.mouseDownPos.right - diffX };

      const newPosition = { ...this.state.position, ...offset };
      if (this.state.mouseDownPos.top !== undefined) {
        newPosition.top = this.state.mouseDownPos.top + diffY;
      } else if (this.state.mouseDownPos.bottom !== undefined) {
        newPosition.bottom = this.state.mouseDownPos.bottom - diffY;
      }

      this.setState({ position: newPosition });
    }
  };

  render() {
    const { width, theme: suppliedTheme, position = '', title, children, style } = this.props;

    const theme = isstring(suppliedTheme) ? themes[suppliedTheme] || themes['dark'] : suppliedTheme;
    const state = this.getState();
    const combinedStyle = {
      display: 'inline-block',
      background: theme.background1,
      width,
      padding: 14,
      paddingBottom: 8,
      opacity: 0.95,
      position:
        VALID_POSITIONS.includes(position) || typeof position !== 'string' ? 'absolute' : undefined,
      ...(this.state.position || {}),
      cursor: this.props.draggable ? 'move' : undefined,
      ...style,
    };

    return (
      <div
        className="control-panel draggable"
        onMouseDown={this.props.draggable ? this.handleMouseDown : undefined}
        style={combinedStyle}
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
              onChange={newVal => this.setState({ data: { ...this.state.data, [label]: newVal } })}
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
  position: PropTypes.oneOfType([PropTypes.oneOf(VALID_POSITIONS), PropTypes.string]),
  style: PropTypes.object,
  settings: PropTypes.arrayOf(PropTypes.object),
  state: PropTypes.object,
  contextCb: PropTypes.func,
  draggable: PropTypes.bool,
};

ControlPanel.defaultProps = {
  width: 300,
  theme: 'dark',
  onChange: () => {},
  style: {},
};

export default ControlPanel;
