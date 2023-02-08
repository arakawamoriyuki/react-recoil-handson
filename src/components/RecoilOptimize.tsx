import React from 'react';
import { useNavigate } from 'react-router-dom';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const state = atom<number>({
  key: 'count-optimize',
  default: 0,
});

const useCount = () => useRecoilValue(state);
const useSetCount = () => useSetRecoilState(state);

const CountComponent: React.FC = () => {
  const count = useCount();

  console.log('CountComponent render');

  return (
    <Typography>Count: {count}</Typography>
  );
};

const CountResetComponent: React.FC = () => {
  const setCount = useSetCount();

  console.log('ResetComponent render');

  return (
    <Button onClick={() => setCount(0)}>Reset</Button>
  );
};

const CountUpComponent: React.FC = () => {
  const setCount = useSetCount();

  console.log('CountUpComponent render');

  return (
    <Button onClick={() => setCount(prevCount => prevCount + 1)}>+</Button>
  );
};

const RecoilOptimizeComponent: React.FC = () => {
  const navigate = useNavigate();

  console.log('RecoilOptimizeComponent render');

  return (
    <Box>
      <CountComponent />
      <CountResetComponent />
      <CountUpComponent />
      <Button onClick={() => navigate('/use-state')}>go /use-state</Button>
    </Box>
  );
};

export default RecoilOptimizeComponent;
