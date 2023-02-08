import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useCountValue, useCountSetValue } from '../ContextOptimize';

const CountComponent: React.FC = () => {
  const count = useCountValue();

  console.log('CountComponent render');

  return (
    <Typography>Count: {count}</Typography>
  );
};

const CountResetComponent: React.FC = () => {
  const setCount = useCountSetValue();

  console.log('ResetComponent render');

  return (
    <Button onClick={() => setCount(0)}>Reset</Button>
  );
};

const CountUpComponent: React.FC = () => {
  const setCount = useCountSetValue();

  console.log('CountUpComponent render');

  return (
    <Button onClick={() => setCount(prevCount => prevCount + 1)}>+</Button>
  );
};

const ContextOptimizeComponent: React.FC = () => {
  const navigate = useNavigate();

  console.log('ContextOptimizeComponent render');

  return (
    <Box>
      <CountComponent />
      <CountResetComponent />
      <CountUpComponent />
      <Button onClick={() => navigate('/use-state')}>go /use-state</Button>
    </Box>
  );
};

export default ContextOptimizeComponent;
