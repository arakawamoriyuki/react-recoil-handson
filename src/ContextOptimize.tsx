import React from 'react';

const CountContext = React.createContext<number>(0);
const SetCountContext = React.createContext<React.Dispatch<React.SetStateAction<number>>>(
  () => undefined
);

interface CountProviderProps {
  children: React.ReactNode;
}

export const CountOptimizeProvider: React.FC<CountProviderProps> = ({ children }) => {
  const [count, setCount] = React.useState<number>(0);

  return (
    <CountContext.Provider value={count}>
      <SetCountContext.Provider value={setCount}>
        {children}
      </SetCountContext.Provider>
    </CountContext.Provider>
  );
};

export const useCountValue = () => React.useContext(CountContext);
export const useCountSetValue = () => React.useContext(SetCountContext);
