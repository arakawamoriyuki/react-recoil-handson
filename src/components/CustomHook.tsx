import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useCounter } from './CustomHookStore';

const CustomHookComponent: React.FC = () => {
  const { count, increment, reset } = useCounter(0);

  return (
    <Box>
      <Typography>Count: {count}</Typography>
      <Button onClick={() => increment()}>+</Button>
      <Button onClick={() => reset()}>Reset</Button>
    </Box>
  );
};

export default CustomHookComponent;
