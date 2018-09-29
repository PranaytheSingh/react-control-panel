import React from 'react';
import ReactDOM from 'react-dom';

import ControlPanel, { Text, Button, Select, Checkbox, Multibox, Color, Range } from '../src/index';

const initialState = {
  'range slider': 20,
  'stepped slider': 0.6,
  text: 'my setting',
  checkbox: true,
  'color hex': '#123456',
  'color rgb': 'rgb(156, 44, 92)',
  selection: 'option 1',
  'multiple checkboxes': [true, true],
};

const DemoPanel = ({ theme, ...props }) => (
  <ControlPanel
    theme={theme}
    title="Example Panel 1"
    initialState={initialState}
    onChange={console.log}
    {...props}
  >
    <Range label="range slider" min={0} max={100} />
    <Range label="stepped slider" min={0} max={1} step={0.2} />
    <Text label="text" />
    <Checkbox label="checkbox" />
    <Color label="color hex" format="hex" />
    <Color label="color rgb" format="rgb" />
    <Button label="gimme an alert" action={() => alert('clicked')} />
    <Select label="selection" options={{ 'option 1': 1, 'option 2': 2 }} />
    <Multibox
      label="multiple checkboxes"
      colors={['rgb(100,120,230)', 'rgb(210,100,190)']}
      names={['box1', 'box2']}
    />
  </ControlPanel>
);

const App = () => (
  <React.Fragment>
    <DemoPanel theme="light" style={{ marginRight: 11, display: 'inline-block' }} />
    <DemoPanel theme="dark" style={{ display: 'inline-block' }} />
  </React.Fragment>
);

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
