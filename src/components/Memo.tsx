import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface CountComponentProps {
  count: number;
}

const CountComponent: React.FC<CountComponentProps> = ({ count }) => {

  console.log('CountComponent render');

  return (
    <Typography>Count: {count}</Typography>
  );
};

const MemorizeCountComponent: React.FC<CountComponentProps> = React.memo(({ count }) => {

  console.log('MemorizeCountComponent render');

  return (
    <Typography>Count: {count}</Typography>
  );
});

const MemoComponent: React.FC = () => {
  const [count1, setCount1] = React.useState(0);
  const [count2, setCount2] = React.useState(0);

  console.log('MemoComponent render');

  return (
    <Box>
      <CountComponent count={count1} />
      <Button onClick={() => setCount1(0)}>Reset</Button>
      <Button onClick={() => setCount1(prevCount => prevCount + 1)}>+</Button>

      <MemorizeCountComponent count={count2} />
      <Button onClick={() => setCount2(0)}>Reset</Button>
      <Button onClick={() => setCount2(prevCount => prevCount + 1)}>+</Button>
    </Box>
  );
};

export default MemoComponent;
