import React from 'react';

import { compose } from '../util';
import { withSettingState } from './context';
import { withErrorHandler } from '../error';

const CustomComponentInner = ({ Comp, renderContainer, ...props }) => <Comp {...props} />;

/**
 * Takes a prop, `Comp`, which is a component that will be rendered as a control panel input.
 *
 * If the `renderContainer` prop is `true` (default), a `Container` will be rendered as the parent
 * of this element.  That gives you the label on the left and assumes your styling is going to be
 * pretty close to that of the rest of control-panel's imputs.  If you have a highly custom
 * component, you may want to instead handle that all yourself in which you should pass
 * `renderContainer={false}` to `CustomComponent`.
 *
 * The `Comp` child will be passed the following props:
 * - `theme`
 * - `value`
 * - `onChange`
 */
const CustomComponent = compose(
  withSettingState(),
  withErrorHandler
)(CustomComponentInner);

export default CustomComponent;
