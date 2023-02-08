import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UseState from './components/UseState';
import UseReducer from './components/UseReducer';
import UseEffect from './components/UseEffect';
import Memo from './components/Memo';
import UseMemo from './components/UseMemo';
import UseCallback from './components/UseCallback';

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<UseState />} />
      <Route path="/use-state" element={<UseState />} />
      <Route path="/use-reducer" element={<UseReducer />} />
      <Route path="/use-effect" element={<UseEffect />} />
      <Route path="/memo" element={<Memo />} />
      <Route path="/use-memo" element={<UseMemo />} />
      <Route path="/use-callback" element={<UseCallback />} />
    </Routes>
  </BrowserRouter>
);

export default App;
