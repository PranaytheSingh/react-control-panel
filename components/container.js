import React from 'react';

export default ({ label, children }) => (
  <div
    id={`control-panel-${label}`}
    style={{
      position: 'relative',
      minHeight: '25px',
    }}
  >
    {children}
  </div>
);
