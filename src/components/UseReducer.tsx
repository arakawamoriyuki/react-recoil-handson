import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const reducer = (count: number, action: string)=> {
  switch (action){
    case 'increment':
      return count + 1
    case 'reset':
      return 0
    default:
      return count
  }
};

const UseReducerComponent: React.FC = () => {
  const [count, dispatch] = React.useReducer(reducer, 0)

  return (
    <Box>
      <Typography>Count: {count}</Typography>
      <Button onClick={() => dispatch('reset')}>Reset</Button>
      <Button onClick={() => dispatch('increment')}>+</Button>
    </Box>
  );
};

export default UseReducerComponent;
