import React from 'react';
import PropTypes from 'prop-types';

import { withTheme, Container } from './context';

const getStyle = (theme, { focused, active, hover }) => {
  const hoverStyle = {
    color: theme.text2,
    backgroundColor: theme.background2hover,
  };

  const activeStyle = {
    color: theme.background2,
    backgroundColor: theme.text2,
  };

  return {
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
    outline: focused ? 'none' : undefined,
    ...(hover ? hoverStyle : {}),
    ...(active ? activeStyle : {}),
  };
};

class UnwrappedButton extends React.Component {
  state = { focus: false, hover: false, active: false };

  render = () => (
    <Container>
      <button
        style={getStyle(this.props.theme, this.state)}
        onClick={this.props.action}
        onFocus={() => this.setState({ focus: true })}
        onBlur={() => this.setState({ focus: false })}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
        onMouseDown={() => {
          this.setState({ active: true });
          if (this.props.onmousedown) {
            this.props.onmousedown();
          }
        }}
        onMouseUp={() => {
          this.setState({ active: false });
          if (this.props.onmouseup) {
            this.props.onmouseup();
          }
        }}
      >
        {this.props.label}
      </button>
    </Container>
  );
}

const Button = withTheme(UnwrappedButton);
Button.propTypes = {
  action: PropTypes.func,
  onmousedown: PropTypes.func,
  onmouseup: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export default Button;
