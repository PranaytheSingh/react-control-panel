import React from 'react';
import { ClientStyle as Style } from 'react-css-component';
import isnumeric from 'is-numeric';
import uuid from 'uuid/v4';

import { withSettingState } from './context';
import Value from './value';
import getDynamicCss from './styles/range';
import { withErrorHandler, throwLogRangeError, validateStepParams } from '../error';
import {
  withScalerFunctions,
  numericOrDefault,
  numericOrDefaultElse,
  createNormalDisplayOptsGetter,
} from '../util';

const getLogDisplayOpts = withScalerFunctions(
  ({ min, max, step, value, scaleValue, scaleValueInverse }) => {
    // `value` is the logarithmic value that the user cares about.  We convert it into a value
    // from 1 to 100 in order to pass it to the slider.
    const sliderVal = scaleValueInverse(
      numericOrDefaultElse(value, () => scaleValue((min + max) / 2))
    );
    if (sliderVal * scaleValueInverse(max) < 0) {
      throwLogRangeError(sliderVal);
    }

    return { min: 0, max: 100, step: 1, logVal: value, sliderVal, scaleValue };
  }
);

const getNormalDisplayOpts = createNormalDisplayOptsGetter((min, max, value) =>
  numericOrDefault(value, (min + max) / 2)
);

class Range extends React.Component {
  state = { id: uuid() };

  render() {
    const { scale, steps, onChange, theme, ...props } = this.props;
    validateStepParams(props.step, steps);

    const { min, max, step, logVal, sliderVal, scaleValue } = (scale === 'log'
      ? getLogDisplayOpts
      : getNormalDisplayOpts)(props);
    // use `steps` if provided
    const processedStep = isnumeric(steps) ? (max - min) / steps : step;

    return (
      <React.Fragment>
        <Style css={getDynamicCss(theme, this.state.id)} />
        <input
          className={`control-panel-range-${this.state.id}`}
          type="range"
          value={sliderVal}
          min={min}
          max={max}
          step={processedStep}
          onChange={e => {
            // We take the value from the slider (range 1 to 100) and scale it into its logarithmic
            // representation before passing it into the state.
            onChange(scaleValue(parseFloat(e.target.value)));
          }}
        />
        <Value text={logVal} width="11%" />
      </React.Fragment>
    );
  }
}

export default withErrorHandler(withSettingState()(Range));
