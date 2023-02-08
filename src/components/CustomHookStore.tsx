import React from 'react';

export const useCounter = (initialCount = 0) => {
  const [count, setCount] = React.useState(initialCount);

  const increment = () => {
    setCount((count) => count + 1);
  };

  const reset = () => {
    setCount(0);
  };

  return { count, increment, reset };
}
