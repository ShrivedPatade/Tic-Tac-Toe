import React from 'react';
import { useNavigate } from 'react-router-dom';
import pvpImage from '../assets/pvp.png';
import pvcImage from '../assets/pvc.png';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="choice">
      <div>
        <img src={pvpImage} alt="Player vs Player" width="200" height="200" />
        <img src={pvcImage} alt="Player vs Computer" width="200" height="200" />
      </div>
      <button type="button" className="btn bpvp" onClick={() => navigate('/pvp')}>
        Player VS Player
      </button>
      <button type="button" className="btn bpvc" onClick={() => navigate('/pvc')}>
        Player VS Computer (α-β pruning)
      </button>
    </div>
  );
};

export default Home;