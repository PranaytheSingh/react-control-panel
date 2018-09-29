import React from 'react';

import { withTheme, Container } from './context';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focus: false, hover: false, active: false };
  }

  render() {
    const { label, action, theme } = this.props;
    return (
      <Container>
        <button
          style={{
            position: 'absolute',
            textAlign: 'center',
            height: 20,
            width: '62%',
            border: 'none',
            cursor: 'pointer',
            right: 0,
            fontFamily: 'inherit',
            color: theme.text2,
            backgroundColor: theme.background2,
            outline: this.state.focused ? 'none' : undefined,
            ...(this.state.hover
              ? {
                  color: theme.text2,
                  backgroundColor: theme.background2hover,
                }
              : {}),
            ...(this.state.active
              ? {
                  color: theme.background2,
                  backgroundColor: theme.text2,
                }
              : {}),
          }}
          onClick={action}
          onFocus={() => this.setState({ focus: true })}
          onBlur={() => this.setState({ focus: false })}
          onMouseEnter={() => this.setState({ hover: true })}
          onMouseLeave={() => this.setState({ hover: false })}
          onMouseDown={() => this.setState({ active: true })}
          onMouseUp={() => this.setState({ active: false })}
        >
          {label}
        </button>
      </Container>
    );
  }
}

export default withTheme(Button);
