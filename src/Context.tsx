import React from 'react';

interface CountState {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const CountContext = React.createContext<CountState>({
  count: 0,
  setCount: () => undefined,
});

interface CountProviderProps {
  children: React.ReactNode;
}

export const CountProvider: React.FC<CountProviderProps> = ({ children }) => {
  const [count, setCount] = React.useState<number>(0);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
};

export const useCountValue = () => React.useContext(CountContext).count;
export const useCountSetValue = () => React.useContext(CountContext).setCount;
