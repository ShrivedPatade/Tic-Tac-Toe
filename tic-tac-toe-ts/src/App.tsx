import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import PVP from './pages/PVP';
import PVC from './pages/PVC';
import './App.css';

function App() {
  return (
    <>
      <Header title="Tic-Tac-Toe" />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pvp" element={<PVP />} />
          <Route path="/pvc" element={<PVC />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;