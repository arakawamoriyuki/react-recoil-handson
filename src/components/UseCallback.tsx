import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface LogButtonComponentProps {
  onClick: () => void;
}

const LogButtonComponent: React.FC<LogButtonComponentProps> = ({ onClick }) => {

  console.log('LogButtonComponent render');

  return (
    <Button onClick={onClick}>log</Button>
  );
};

const MemorizeLogButtonComponent: React.FC<LogButtonComponentProps> = React.memo(({ onClick }) => {

  console.log('MemorizeLogButtonComponent render');

  return (
    <Button onClick={onClick}>memorize log</Button>
  );
});

const UseCallbackComponent: React.FC = () => {
  const [count1, setCount1] = React.useState(0);
  const [count2, setCount2] = React.useState(0);

  const handleClick = React.useCallback(() => {
    console.log(`count: ${count1}`);
  }, [count1]);

  return (
    <Box>
      <Typography>Count: {count1}</Typography>
      <Button onClick={() => setCount1(prevCount => prevCount + 1)}>+</Button>
      <LogButtonComponent onClick={handleClick} />
      <MemorizeLogButtonComponent onClick={handleClick} />

      <Typography>Count: {count2}</Typography>
      <Button onClick={() => setCount2(prevCount => prevCount + 1)}>+</Button>
    </Box>
  );
};

export default UseCallbackComponent;
