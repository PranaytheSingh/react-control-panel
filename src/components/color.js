import React from 'react';
import SimpleColorPicker from 'simple-color-picker';

import { withSettingState } from './context';
import Value from './value';

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
  constructor(props) {
    super(props);

    this.colorpickerContainer = React.createRef();
    this.state = { colorHovered: false, pickerHovered: false };
  }

  formatColor(color) {
    return colorFormatters[this.props.format](this.picker);
  }

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
      if (formattedNewColor != this.props.value) {
        this.props.onChange(formattedNewColor);
      }
    });
  }

  componentDidUpdate() {
    if (this.picker) {
      this.picker.setColor(this.props.value);
    }
  }

  render() {
    return (
      <React.Fragment>
        <span
          style={{
            position: 'relative',
            display: 'inline-block',
            width: '12.5%',
            height: 20,
            backgroundColor: this.props.value,
          }}
          onMouseEnter={() => this.setState({ colorHovered: true })}
          onMouseLeave={() => this.setState({ colorHovered: false })}
        />
        <div
          ref={this.colorpickerContainer}
          style={{
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
          }}
          onMouseEnter={() => this.setState({ pickerHovered: true })}
          onMouseLeave={() => this.setState({ pickerHovered: false })}
        />
        <Value text={this.props.value} width="46%" />
      </React.Fragment>
    );
  }
}

export default withSettingState(Color);
