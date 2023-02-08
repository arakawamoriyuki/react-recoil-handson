import React from 'react';
import { useNavigate } from 'react-router-dom';
import { atom, useRecoilState } from 'recoil';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const state = atom<number>({
  key: 'count',
  default: 0,
});

const useCounter = () => {
  const [count, setCount] = useRecoilState(state);

  const increment = () => {
    setCount((count) => count + 1);
  };

  const reset = () => {
    setCount(0);
  };

  return { count, increment, reset };
};

const CountComponent: React.FC = () => {
  const { count } = useCounter();

  console.log('CountComponent render');

  return (
    <Typography>Count: {count}</Typography>
  );
};

const CountResetComponent: React.FC = () => {
  const { reset } = useCounter();

  console.log('ResetComponent render');

  return (
    <Button onClick={() => reset()}>Reset</Button>
  );
};

const CountUpComponent: React.FC = () => {
  const { increment } = useCounter();

  console.log('CountUpComponent render');

  return (
    <Button onClick={() => increment()}>+</Button>
  );
};

const RecoilComponent: React.FC = () => {
  const navigate = useNavigate();

  console.log('RecoilComponent render');

  return (
    <Box>
      <CountComponent />
      <CountResetComponent />
      <CountUpComponent />
      <Button onClick={() => navigate('/use-state')}>go /use-state</Button>
    </Box>
  );
};

export default RecoilComponent;
