import React from 'react';
import { ClientStyle as Style } from 'react-css-component';
import isnumeric from 'is-numeric';
import uuid from 'uuid/v4';

import { withSettingState } from './context';
import Value from './value';
import getDynamicCss from './styles/range';

const ErrMsg = ({ msg }) => <span style={{ color: 'red' }}>{msg}</span>;

const numericOrDefault = (val, defaultVal) => (isnumeric(val) ? val : defaultVal);
// lazy version
const numericOrDefaultElse = (val, getDefaultVal) => (isnumeric(val) ? val : getDefaultVal());

const getLogDisplayParams = ({ min, max, step, value }) => {
  if (min * max <= 0) {
    return (
      <ErrMsg
        msg={`Log range min/max must have the same sign and not equal zero. Got min = ${min}, max = ${max}`}
      />
    );
  } else if (isnumeric(step)) {
    return (
      <ErrMsg
        msg={`Log may only use steps (integer number of steps), not a step value. Got step = ${step}`}
      />
    );
  }

  const logsign = min > 0 ? 1 : -1;
  const logmin = Math.abs(min);
  const logmax = Math.abs(min);

  const scaleValue = x =>
    logsign * Math.exp(Math.log(logmin) + ((Math.log(logmax) - Math.log(logmin)) * x) / 100);
  const scaleValueInverse = y =>
    ((Math.log(y * logsign) - Math.log(logmin)) * 100) / (Math.log(logmax) - Math.log(logmin));

  const newValue = scaleValueInverse(
    numericOrDefaultElse(value, () => scaleValue((min + max) / 2))
  );
  if (newValue * scaleValueInverse(max) <= 0) {
    return (
      <ErrMsg
        msg={`Log range initial value must have the same sign as min/max and must not equal zero. Got initial value = ${newValue}`}
      />
    );
  }

  return { min: 0, max: 100, step: 1, value: newValue, scaleValue };
};

const getNormalDisplayParams = ({ min, max, step, value }) => {
  const newMin = numericOrDefault(min, 0);
  const newMax = numericOrDefault(max, 100);

  return {
    min: newMin,
    max: newMax,
    step: numericOrDefault(step, (max - min) / 100),
    value: numericOrDefault(value, (newMin + newMax) / 2),
    scaleValue: x => x,
  };
};

class Range extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: uuid() };
  }

  render() {
    const { scale, steps, onChange, theme, ...props } = this.props;

    if (!!props.step && !!steps) {
      return (
        <ErrMsg
          msg={`Cannot specify both step and steps. Got step = ${props.step}, steps = ${
            props.steps
          }`}
        />
      );
    }

    const { min, max, step, value, scaleValue } = (scale === 'log'
      ? getLogDisplayParams
      : getNormalDisplayParams)(props);
    // use `steps` if provided
    const processedStep = isnumeric(steps) ? (max - min) / steps : step;
    const processedVal = scaleValue(min + step * Math.round((value - min) / step));

    return (
      <React.Fragment>
        <Style css={getDynamicCss(theme, this.state.id)} />
        <input
          className={`control-panel-range-${this.state.id}`}
          type="range"
          value={processedVal}
          min={min}
          max={max}
          step={processedStep}
          onChange={e => onChange(scaleValue(parseFloat(e.target.value)))}
        />
        <Value text={processedVal} width="11%" />
      </React.Fragment>
    );
  }
}

export default withSettingState(Range);
