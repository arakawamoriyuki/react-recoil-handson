import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UseState from './components/UseState';
import UseReducer from './components/UseReducer';
import UseEffect from './components/UseEffect';

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<UseState />} />
      <Route path="/use-state" element={<UseState />} />
      <Route path="/use-reducer" element={<UseReducer />} />
      <Route path="/use-effect" element={<UseEffect />} />
    </Routes>
  </BrowserRouter>
);

export default App;
