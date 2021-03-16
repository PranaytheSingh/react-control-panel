import React from 'react';

import { withSettingState } from './context';

class Text extends React.Component {
  state = { focused: false };

  render = () => (
    <textarea
      style={{ ...this.props.styles.body, outline: this.state.focused ? 'none' : undefined }}
      onFocus={() => this.setState({ focused: true })}
      onBlur={() => this.setState({ focused: false })}
      type="text"
      value={this.props.value}
      onChange={e => this.props.onChange(e.target.value)}
    />
  );
}

const mapPropsToStyles = ({ theme }) => ({
  body: {
    position: 'relative',
    paddingLeft: 6,
    height: '80px',
    width: '95%',
    border: 'none',
    background: theme.background2,
    color: theme.text2,
    fontFamily: 'inherit',
  },
});

export default withSettingState(mapPropsToStyles)(Text);
