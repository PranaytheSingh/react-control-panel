import React from 'react';
import ReactDOM from 'react-dom';

import ControlPanel, { Text, Button, Select, Checkbox, Multibox } from '../src/index';

const initialState = {
  text: 'my setting',
  checkbox: true,
  selection: 'option 1',
  'multiple checkboxes': [true, true],
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { darkTheme: true };
  }

  render() {
    return (
      <React.Fragment>
        <p>
          Toggle Theme{' '}
          <input
            type="checkbox"
            checked={this.state.darkTheme}
            onChange={() => this.setState({ darkTheme: !this.state.darkTheme })}
          />
        </p>

        <ControlPanel
          theme={this.state.darkTheme ? 'dark' : 'light'}
          title="Example Panel 1"
          initialState={initialState}
          onChange={console.log}
        >
          <Text label="text" />
          <Checkbox label="checkbox" />
          <Button label="gimme an alert" action={() => alert('clicked')} />
          <Select label="selection" options={{ 'option 1': 1, 'option 2': 2 }} />
          <Multibox
            label="multiple checkboxes"
            colors={['rgb(100,120,230)', 'rgb(210,100,190)']}
            names={['box1', 'box2']}
          />
        </ControlPanel>
      </React.Fragment>
    );
  }
}

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
