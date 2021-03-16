import React from 'react';
import ReactDOM from 'react-dom';

import ControlPanel, {
  Text,
  Button,
  Select,
  Checkbox,
  Multibox,
  Color,
  Range,
  Interval,
  Custom,
} from '../src/index';

const CustomInput = ({ value, onChange, theme }) => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <div style={{ color: 'orchid', paddingTop: 3, display: 'inline-block', width: '36%' }}>
      100% Custom Component
    </div>
    <div style={{ width: '60%', display: 'inline-block' }}>
      <input
        style={{
          color: theme.background1,
          marginTop: 8,
          backgroundColor: theme.foreground1,
          width: '100%',
          marginLeft: 6,
        }}
        value={value}
        onChange={(evt) => onChange(evt.target.value)}
      />
    </div>
  </div>
);

const initialState = {
  'range slider': 20,
  'stepped slider': 0.6,
  interval: [25, 50],
  text: 'my setting',
  checkbox: true,
  'color rgb': 'rgb(100, 200, 100',
  'color hex': '#30b2ba',
  selection: 'option 1',
  'multiple checkboxes': [true, true],
  'custom component': 1,
};

const DemoPanel = ({ theme, title, ...props }) => (
  <ControlPanel
    theme={theme}
    title={title}
    initialState={initialState}
    onChange={console.log}
    {...props}
  >
    {props.settings ? null : (
      <React.Fragment>
        <Range label="range slider" min={0} max={100} />
        <Range label="stepped slider" min={0} max={1} />
        <Interval label="interval" min={0} max={100} />
        <Text label="text" />
        <Checkbox label="checkbox" />
        <Color label="color rgb" format="rgb" />
        <Color label="color hex" format="hex" />
        <Button label="gimme an alert" action={() => alert('clicked')} />
        <Select label="selection" options={{ 'option 1': 1, 'option 2': 2 }} />
        <Multibox
          label="multiple checkboxes"
          colors={['rgb(100,120,230)', 'rgb(210,100,190)']}
          names={['box1', 'box2']}
          LabelComponent={({ label }) => <span style={{ color: 'red' }}>{label}</span>}
        />
        <Custom label="custom component" renderContainer={false} Comp={CustomInput} />
      </React.Fragment>
    )}
  </ControlPanel>
);

class App extends React.Component {
  state = { text: 'val from outer state' };

  render = () => (
    <React.Fragment>
      <DemoPanel
        theme="light"
        title="Example Panel 1"
        style={{ marginRight: 11, display: 'inline-block' }}
      />
   
    </React.Fragment>
  );
}

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
