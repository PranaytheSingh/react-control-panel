import isnumeric from 'is-numeric';

import { validateLogStep, validateLogMinMax } from './error';

export const getLogScalerFunctions = (logmin, logmax, logsign) => ({
  scaleValue: x =>
    logsign * Math.exp(Math.log(logmin) + ((Math.log(logmax) - Math.log(logmin)) * x) / 100),
  scaleValueInverse: y =>
    ((Math.log(y * logsign) - Math.log(logmin)) * 100) / (Math.log(logmax) - Math.log(logmin)),
});

export const numericOrDefault = (val, defaultVal) => (isnumeric(val) ? val : defaultVal);
// lazy version
export const numericOrDefaultElse = (val, getDefaultVal) =>
  isnumeric(val) ? val : getDefaultVal();

export const createNormalDisplayOptsGetter = transformVal => ({ min, max, step, value }) => {
  const newMin = numericOrDefault(min, 0);
  const newMax = numericOrDefault(max, 100);
  const transformedVal = transformVal(newMin, newMax, value);

  return {
    min: newMin,
    max: newMax,
    step: numericOrDefault(step, (max - min) / 100),
    sliderVal: transformedVal,
    logVal: transformedVal,
    scaleValue: x => x,
  };
};

export const withScalerFunctions = logOptsGetter => args => {
  const { min, max, step } = args;
  validateLogMinMax(min, max);
  validateLogStep(step);

  const logsign = min > 0 ? 1 : -1;
  const logmin = Math.abs(min);
  const logmax = Math.abs(max);

  return logOptsGetter({ ...args, ...getLogScalerFunctions(logmin, logmax, logsign) });
};
