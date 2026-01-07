// import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import PVP from './pages/PVP';
import PVC from './pages/PVC';
import './App.css';

function App() {
  return (
    <div id="root">
      <Router>
        <Header title="α-β Pruning Tic-Tac-Toe" />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pvp" element={<PVP />} />
            <Route path="/pvc" element={<PVC />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;