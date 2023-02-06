import React, { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>test</div>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
