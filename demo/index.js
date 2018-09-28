import React from 'react';
import ReactDOM from 'react-dom';
import { withState } from 'recompose';

import ControlPanel, { Text, Button, Select, Checkbox, Multibox } from '../src/index';

const initialState = {
  text: 'Some text',
  select: 'a',
  checkbox: true,
  multibox: [true, false, false, true],
};

const App = withState('checked', 'setChecked', true)(({ checked, setChecked }) => (
  <React.Fragment>
    <p>
      Toggle Theme <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
    </p>

    <ControlPanel
      theme={checked ? 'dark' : 'light'}
      title="Example Panel 1"
      initialState={initialState}
      onChange={console.log}
    >
      <Text label="text" />
      <Button label="button" action={() => alert('clicked')} />
      <Select label="select" options={{ a: '1', b: '2' }} />
      <Checkbox label="checkbox" />
      <Multibox
        label="multibox"
        colors={['rgb(100,120,230)', 'rgb(210,100,190)']}
        names={['box1', 'box2', 'box3', 'box4']}
      />
    </ControlPanel>
  </React.Fragment>
));

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
