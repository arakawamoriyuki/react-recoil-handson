import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useCount, useReset, useIncrement } from './RecoilCustomHookStore';

const CountComponent: React.FC = () => {
  const count = useCount();

  console.log('CountComponent render');

  return (
    <Typography>Count: {count}</Typography>
  );
};

const CountResetComponent: React.FC = () => {
  const reset = useReset();

  console.log('ResetComponent render');

  return (
    <Button onClick={() => reset()}>Reset</Button>
  );
};

const CountUpComponent: React.FC = () => {
  const increment = useIncrement();

  console.log('CountUpComponent render');

  return (
    <Button onClick={() => increment()}>+</Button>
  );
};

const RecoilCustomHookComponent: React.FC = () => {
  return (
    <Box>
      <CountComponent />
      <CountResetComponent />
      <CountUpComponent />
    </Box>
  );
};

export default RecoilCustomHookComponent;
