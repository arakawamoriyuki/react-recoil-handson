import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CountProvider } from './Context';
import { CountOptimizeProvider } from './ContextOptimize';
import UseState from './components/UseState';
import UseReducer from './components/UseReducer';
import UseEffect from './components/UseEffect';
import Memo from './components/Memo';
import UseMemo from './components/UseMemo';
import UseCallback from './components/UseCallback';
import CustomHook from './components/CustomHook';
import Context from './components/Context';
import ContextOptimize from './components/ContextOptimize';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <CountProvider>
      <CountOptimizeProvider>
        {children}
      </CountOptimizeProvider>
    </CountProvider>
  );
};

const App: FC = () => (
  <Providers>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UseState />} />
        <Route path="/use-state" element={<UseState />} />
        <Route path="/use-reducer" element={<UseReducer />} />
        <Route path="/use-effect" element={<UseEffect />} />
        <Route path="/memo" element={<Memo />} />
        <Route path="/use-memo" element={<UseMemo />} />
        <Route path="/use-callback" element={<UseCallback />} />
        <Route path="/custom-hook" element={<CustomHook />} />
        <Route path="/context" element={<Context />} />
        <Route path="/context-optimize" element={<ContextOptimize />} />
      </Routes>
    </BrowserRouter>
  </Providers>
);

export default App;
