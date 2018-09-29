import React from 'react';
import { withSettingState } from './context';

class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = false;
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
          outline: this.state ? 'none' : undefined,
        }}
        onFocus={() => this.setState(true)}
        onBlur={() => this.setState(false)}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    );
  }
}

export default withSettingState(Text);
