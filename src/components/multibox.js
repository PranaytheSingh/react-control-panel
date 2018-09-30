import React from 'react';

import { withSettingState } from './context';

const Multibox = ({ theme, colors = [], names = [], count = 2, value, onChange }) => (
  <div
    style={{
      position: 'relative',
      width: '60%',
      display: 'inline-block',
      paddingBottom: 7,
    }}
  >
    <span style={{ display: 'inline-block' }}>
      {(value || new Array(count).map((_v, i) => value[i] || false)).map((checked, i) => (
        <React.Fragment key={i}>
          <span
            style={{
              display: 'inline-block',
              width: 18,
              height: 18,
              padding: 0,
              verticalAlign: 'middle',
              marginRight: 8,
              marginTop: 2,
              marginBottom: 1,
              backgroundColor: theme.background2,
              borderRadius: 0,
              cursor: 'pointer',
              ...(checked
                ? {
                    width: 10,
                    height: 10,
                    border: `solid 4px ${theme.background2}`,
                    cursor: 'pointer',
                    backgroundColor: checked ? colors[i] : theme.foreground1,
                  }
                : {}),
            }}
            onClick={() => {
              // dirty mutation below
              value[i] = !checked;
              onChange(value);
            }}
          />
          <input
            type="checkbox"
            defaultChecked={checked}
            style={{
              display: 'none',
              cursor: 'pointer',
            }}
          />
          {names[i] ? (
            <span
              style={{
                backgroundColor: theme.background2,
                paddingRight: 7,
                verticalAlign: 'middle',
                padding: 2,
                marginRight: 8,
                color: theme.text2,
              }}
            >
              {names[i]}
            </span>
          ) : null}
        </React.Fragment>
      ))}
    </span>
  </div>
);

export default withSettingState(Multibox);
