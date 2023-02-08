import React from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

export const state = atom<number>({
  key: 'count-test',
  default: 0,
});

export const useCount = () => useRecoilValue(state);

export const useIncrement = () => {
  const setCount = useSetRecoilState(state);

  return React.useCallback(
    () => {
      setCount((count) => count + 1);
    },
    [setCount],
  );
};

export const useReset = () => {
  const setCount = useSetRecoilState(state);

  return React.useCallback(
    () => {
      setCount(0);
    },
    [setCount],
  );
};
