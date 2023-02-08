import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const UseStateComponent: React.FC = () => {
  const [count, setCount] = React.useState(0);

  console.log('UseStateComponent render');

  return (
    <Box>
      <Typography>Count: {count}</Typography>
      <Button onClick={() => setCount(0)}>Reset</Button>
      <Button onClick={() => setCount(prevCount => prevCount + 1)}>+</Button>
    </Box>
  );
};

export default UseStateComponent;
