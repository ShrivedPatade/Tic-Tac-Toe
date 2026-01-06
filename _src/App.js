import './App.css';
import React from 'react';
import { BrowserRouter as Router , Route , Routes , useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import PVP from './pages/PVP';
import PVC from './pages/PVC';
import Header from './pages/Header';

function App(props) {
  return(
    <>
    <Header title="Tic-Tac-Toe" />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pvp' element={<PVP root={props.root}/>} />
          <Route path='/pvc' element={<PVC root={props.root}/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;