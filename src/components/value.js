import React from 'react';

import { withTheme } from './context';

const Value = ({ theme, text, width, left, cb }) => {

  const [v, setV] = React.useState(text)

  const handleChange = (e) => {
    // console.log(e.target.value)
    setV(e.target.value);
    cb(e.target.value)

  }

  const styles = {
    body: {
      position: 'absolute',
      backgroundColor: theme.background2,
      paddingLeft: '1.5%',
      height: 20,
      width: width,
      display: 'inline-block',
      overflow: 'hidden',
      right: !left ? 0 : undefined,
      cursor: 'auto',
    },
    text: {
      color: theme.text2,
      display: 'inline-block',
      MozUserSelect: 'text',
      cursor: 'text',
      overflow: 'hidden',
      lineHeight: '30px',
      wordBreak: 'break-all',
      height: 20,
      border:' 0px',
      backgroundColor: theme.background2, 
    },
  };

  React.useEffect(()=>{
    // console.log('here')
    setV(text)
  },[text])

  return (
    <div style={styles.body}>
      <input style={styles.text} value={v} onChange={handleChange}/>
    </div>
  );
};

const EnhancedValue = withTheme(Value);

export default EnhancedValue;
