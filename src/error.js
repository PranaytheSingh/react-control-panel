import React from 'react';
import isnumeric from 'is-numeric';

export class InvalidParamsError extends Error {}

export const ErrMsg = ({ msg }) => <span style={{ color: 'red' }}>{msg}</span>;

class ErrorHandlerWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(err, info) {
    this.setState({ errMsg: err.message });
  }

  render() {
    if (this.state.errMsg) {
      return <ErrMsg msg={this.state.errMsg} />;
    } else {
      return <this.props.Comp {...this.props} />;
    }
  }
}

export const withErrorHandler = Comp => ({ ...props }) => (
  <ErrorHandlerWrapper Comp={Comp} {...props} />
);

export const validateStepParams = (step, steps) => {
  if (!!step && !!steps) {
    throw new InvalidParamsError(
      `Cannot specify both step and steps. Got step = ${step}, steps = ${steps}`
    );
  }
};

export const validateLogStep = step => {
  if (isnumeric(step)) {
    throw new InvalidParamsError(
      `Log may only use steps (integer number of steps), not a step value. Got step = ${step}`
    );
  }
};

export const validateLogMinMax = (min, max) => {
  if (min * max <= 0) {
    throw new InvalidParamsError(
      `Log range min/max must have the same sign and not equal zero. Got min = ${min}, max = ${max}`
    );
  }
};

export const throwLogRangeError = scaledVal => {
  throw new InvalidParamsError(
    `Log range initial value must have the same sign as min/max and must not equal zero. Got initial value = ${scaledVal}`
  );
};
