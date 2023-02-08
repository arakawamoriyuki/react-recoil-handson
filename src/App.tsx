import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UseState from './components/UseState';

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<UseState />} />
      <Route path="/use-state" element={<UseState />} />
    </Routes>
  </BrowserRouter>
);

export default App;
