import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RendrStudios from './pages/Home';
import About from './pages/About';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RendrStudios />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
