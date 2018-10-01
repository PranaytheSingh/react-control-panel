import React from 'react';
import isnumeric from 'is-numeric';

export class InvalidParamsError extends Error {}

export const ErrMsg = ({ msg }) => <span style={{ color: 'red' }}>{msg}</span>;

class ErrorHandlerWrapper extends React.Component {
  state = { error: null };

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

const createValidator = (checkIfInvalid, createErrMsg) => (...args) => {
  if (!checkIfInvalid(...args)) {
    return;
  }

  throw new InvalidParamsError(createErrMsg(...args));
};

export const validateStepParams = createValidator(
  (step, steps) => !!step && !!steps,
  (step, steps) => `Cannot specify both step and steps. Got step = ${step}, steps = ${steps}`
);

export const validateLogStep = createValidator(
  isnumeric,
  step => `Log may only use steps (integer number of steps), not a step value. Got step = ${step}`
);

export const validateLogMinMax = createValidator(
  (min, max) => min * max <= 0,
  (min, max) =>
    `Log range min/max must have the same sign and not equal zero. Got min = ${min}, max = ${max}`
);

export const throwLogRangeError = createValidator(
  scaledVal => true,
  scaledVal =>
    `Log range initial value must have the same sign as min/max and must not equal zero. Got initial value = ${scaledVal}`
);
