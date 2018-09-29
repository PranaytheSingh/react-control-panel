import React from 'react';
import { withSettingState } from './context';

class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focused: false };
  }

  render() {
    const { theme, value, onChange } = this.props;

    return (
      <input
        style={{
          position: 'absolute',
          paddingLeft: 6,
          height: 20,
          width: '59.5%',
          border: 'none',
          background: theme.background2,
          color: theme.text2,
          fontFamily: 'inherit',
          outline: this.state.focused ? 'none' : undefined,
        }}
        onFocus={() => this.setState({ focused: true })}
        onBlur={() => this.setState({ focused: false })}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    );
  }
}

export default withSettingState(Text);
