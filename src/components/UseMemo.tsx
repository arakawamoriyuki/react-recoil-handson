import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const UseMemoComponent: React.FC = () => {
  const [count1, setCount1] = React.useState(0);
  const [count2, setCount2] = React.useState(0);

  const double = (value: number) => {

    console.log('calculate double');

    return value * 2;
  };

  const doubleCount1 = React.useMemo(() => double(count1), [count1]);
  const doubleCount2 = double(count2);

  return (
    <Box>
      <Typography>Count: {doubleCount1}</Typography>
      <Button onClick={() => setCount1(0)}>Reset</Button>
      <Button onClick={() => setCount1(prevCount => prevCount + 1)}>+</Button>

      <Typography>Count: {doubleCount2}</Typography>
      <Button onClick={() => setCount2(0)}>Reset</Button>
      <Button onClick={() => setCount2(prevCount => prevCount + 1)}>+</Button>
    </Box>
  );
};

export default UseMemoComponent;
