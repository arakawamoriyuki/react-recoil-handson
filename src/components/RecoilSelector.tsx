import React from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const double = (value: number) => {
  console.log('calculate double', value);

  return value * 2;
};

const state1 = atom<number>({
  key: 'recoil-selector-count1',
  default: 0,
});

const doubleState1 = selector<number>({
  key: 'recoil-selector-count-double1',
  get: ({ get }) => {
    const count = get(state1);
    return double(count);
  },
});

const useCounter1 = () => {
  const [count, setCount] = useRecoilState(state1);
  const doubleCount = useRecoilValue(doubleState1);

  const increment = () => {
    setCount((count) => count + 1);
  };

  return { count, doubleCount, increment };
};

const state2 = atom<number>({
  key: 'recoil-selector-count2',
  default: 0,
});

const useCounter2 = () => {
  const [count, setCount] = useRecoilState(state2);

  const increment = () => {
    setCount((count) => count + 1);
  };

  const doubleCount = double(count);

  return { count, doubleCount, increment };
};


const Count1Component: React.FC = () => {
  const { count } = useCounter1();

  return (
    <Typography>Count1: {count}</Typography>
  );
};

const DoubleCount1Component: React.FC = () => {
  const { doubleCount } = useCounter1();

  return (
    <Typography>DoubleCount1: {doubleCount}</Typography>
  );
};

const CountUp1Component: React.FC = () => {
  const { increment } = useCounter1();

  return (
    <Button onClick={() => increment()}>+</Button>
  );
};

const Count2Component: React.FC = () => {
  const { count } = useCounter2();

  return (
    <Typography>Count2: {count}</Typography>
  );
};

const DoubleCount2Component: React.FC = () => {
  const { doubleCount } = useCounter2();

  return (
    <Typography>DoubleCount2: {doubleCount}</Typography>
  );
};

const CountUp2Component: React.FC = () => {
  const { increment } = useCounter2();

  return (
    <Button onClick={() => increment()}>+</Button>
  );
};

const RecoilSelectorComponent: React.FC = () => {
  return (
    <Box>
      <Count1Component />
      <DoubleCount1Component />
      <CountUp1Component />

      <Count2Component />
      <DoubleCount2Component />
      <CountUp2Component />
    </Box>
  );
};

export default RecoilSelectorComponent;
