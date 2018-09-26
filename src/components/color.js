import React from 'react';
import ColorPicker from 'react-simple-colorpicker';
import tinycolor from 'tinycolor2';

import { withSettingState } from './context';
import Value from './value';

function Color(root, opts, theme, uuid) {
  switch (opts.format) {
    case 'rgb':
      initial = tinycolor(initial).toHexString();
      break;
    case 'hex':
      initial = tinycolor(initial).toHexString();
      break;
    case 'array':
      initial = tinycolor.fromRatio({ r: initial[0], g: initial[1], b: initial[2] }).toHexString();
      break;
    default:
      break;
  }

  css(picker.$el, {
    marginTop: '20px',
    display: 'none',
    position: 'absolute',
  });

  css(icon, {
    position: 'relative',
    display: 'inline-block',
    width: '12.5%',
    height: '20px',
    backgroundColor: picker.getHexString(),
  });

  icon.onmouseout = function(e) {
    picker.$el.style.display = 'none';
  };

  setTimeout(function() {
    self.emit('initialized', initial);
  });

  picker.onChange(function(hex) {
    value.innerHTML = format(hex);
    css(icon, { backgroundColor: hex });
    self.emit('input', format(hex));
  });

  function format(hex) {
    switch (opts.format) {
      case 'rgb':
        return tinycolor(hex).toRgbString();
      case 'hex':
        return tinycolor(hex).toHexString();
      case 'array':
        var rgb = tinycolor(hex).toRgb();
        return [rgb.r / 255, rgb.g / 255, rgb.b / 255].map(function(x) {
          return x.toFixed(2);
        });
      default:
        return hex;
    }
  }
}

const Color = ({ theme, format = 'rgb', value = '#123456', onChange }) => {
  const picker = (picker = new ColorPicker({
    el: icon,
    color: initial,
    background: theme.background1,
    width: 125,
    height: 100,
  }));

  return (
    <React.Fragment>
      <span onMouseOver={() => (picker.$el.style.display = '')}>TODO</span>
      <Value text="" theme={theme} left="46%" />
    </React.Fragment>
  );
};

export default withSettingState(Color);
