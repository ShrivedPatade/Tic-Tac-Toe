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
      <Header title="Tic-Tac-Toe" />
      <main className="main-content">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pvp" element={<PVP />} />
            <Route path="/pvc" element={<PVC />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;