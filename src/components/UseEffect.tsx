import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const UseEffectComponent: React.FC = () => {
  const navigate = useNavigate();
  const [count, setCount] = React.useState(0);

  console.log('UseEffectComponent render');

  React.useEffect(() => {
    console.log('UseEffectComponent mount');

    return (() => {
      console.log('UseEffectComponent unmount');
    });
  }, []);

  React.useEffect(() => {
    console.log('UseEffectComponent change count');
  }, [count]);

  return (
    <Box>
      <Typography>Count: {count}</Typography>
      <Button onClick={() => setCount(0)}>Reset</Button>
      <Button onClick={() => setCount(prevCount => prevCount + 1)}>+</Button>
      <Button onClick={() => navigate('/use-state')}>go /use-state</Button>
    </Box>
  );
};

export default UseEffectComponent;
