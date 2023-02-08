import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UseState from './components/UseState';
import UseReducer from './components/UseReducer';

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<UseState />} />
      <Route path="/use-state" element={<UseState />} />
      <Route path="/use-reducer" element={<UseReducer />} />
    </Routes>
  </BrowserRouter>
);

export default App;
