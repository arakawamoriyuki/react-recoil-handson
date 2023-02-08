import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UseState from './components/UseState';
import UseReducer from './components/UseReducer';
import UseEffect from './components/UseEffect';
import Memo from './components/Memo';

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<UseState />} />
      <Route path="/use-state" element={<UseState />} />
      <Route path="/use-reducer" element={<UseReducer />} />
      <Route path="/use-effect" element={<UseEffect />} />
      <Route path="/memo" element={<Memo />} />
    </Routes>
  </BrowserRouter>
);

export default App;
