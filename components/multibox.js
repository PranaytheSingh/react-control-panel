import React from 'react';
import R from 'ramda';
import uuid from 'uuid/v4';

import { withSettingState } from './context';

const Multibox = ({ theme, colors = [], names = [], value = [], onChange }) => {
  const id = uuid();

  return (
    <div
      style={{
        position: 'relative',
        width: '60%',
        display: 'inline-block',
        paddingBottom: '7px',
      }}
    >
      <span style={{ display: 'inline-block' }}>
        {value.map((checked, i) => (
          <React.Fragment>
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
                      backgroundColor: theme.foreground1,
                      border: `solid 4px ${theme.background2}`,
                      cursor: 'pointer',
                    }
                  : {}),
              }}
            />
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onChange(R.set(R.lensIndex(i), !checked, value))}
              id={id}
              style={{
                display: 'none',
                cursor: 'pointer',
              }}
            />
            <label
              htmlFor={id}
              style={{
                backgroundColor: checked ? colors[i] : undefined,
              }}
            >
              {''}
            </label>
            {names[i] ? (
              <span
                style={{
                  backgroundColor: theme.background2,
                  paddingRight: '7px',
                  verticalAlign: 'middle',
                  padding: '2px',
                  marginRight: '8px',
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
};

export default withSettingState(Multibox);
