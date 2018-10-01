import React from 'react';
import SimpleColorPicker from 'simple-color-picker';

import { withSettingState } from './context';
import Value from './value';

const arrayToRgb = arr => {
  const [r, g, b] = arr.map(x => Math.round(x * 255));
  return `rgb(${r},${g},${b})`;
};

const colorFormatters = {
  rgb: colorPicker => {
    const { r, g, b } = colorPicker.getRGB();
    return `rgb(${r}, ${g}, ${b})`;
  },
  hex: colorPicker => colorPicker.getHexString(),
  array: colorPicker => {
    const { r, g, b } = colorPicker.getRGB();
    return [r, g, b].map(x => (x / 255).toFixed(2));
  },
};

class Color extends React.Component {
  colorpickerContainer = React.createRef();
  state = { colorHovered: false, pickerHovered: false };

  formatColor = color => colorFormatters[this.props.format](this.picker);

  componentDidMount() {
    this.picker = new SimpleColorPicker({
      el: this.colorpickerContainer.current,
      color: this.props.value,
      background: this.props.theme.background1,
      width: 125,
      height: 100,
    });

    this.picker.onChange(newColor => {
      const formattedNewColor = this.formatColor(newColor);
      if (formattedNewColor !== this.props.value) {
        this.props.onChange(formattedNewColor);
      }
    });
  }

  componentDidUpdate() {
    if (this.picker) {
      this.picker.setColor(this.props.value);
    }
  }

  getStyles = () => ({
    colorDisplay: {
      position: 'relative',
      display: 'inline-block',
      width: '12.5%',
      height: 20,
      backgroundColor:
        this.props.format === 'array' ? arrayToRgb(this.props.value) : this.props.value,
    },
    picker: {
      position: 'absolute',
      top: '20%',
      paddingTop: 20,
      left: '38%',
      bottom: '20%',
      right: '10%',
      height: 100,
      width: 100,
      zIndex: 8,
      display: this.state.colorHovered || this.state.pickerHovered ? undefined : 'none',
    },
  });

  render = () => {
    const styles = this.getStyles();

    return (
      <React.Fragment>
        <span
          style={styles.colorDisplay}
          onMouseEnter={() => this.setState({ colorHovered: true })}
          onMouseLeave={() => this.setState({ colorHovered: false })}
        />
        <div
          ref={this.colorpickerContainer}
          style={styles.picker}
          onMouseEnter={() => this.setState({ pickerHovered: true })}
          onMouseLeave={() => this.setState({ pickerHovered: false })}
        />
        <Value text={this.props.value} width="46%" />
      </React.Fragment>
    );
  };
}

export default withSettingState()(Color);
