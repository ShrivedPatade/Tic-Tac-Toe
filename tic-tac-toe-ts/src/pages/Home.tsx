import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * NOTE: Using placeholder URLs for images to prevent build errors 
 * when local asset paths are not resolved in the preview environment.
 * Replace these with your local imports (e.g., import pvpImage from '../assets/pvp.png') 
 * once you are in your local development environment.
 */
const pvpImage = "https://api.iconify.design/mdi:account-group.svg?color=%23ff6347";
const pvcImage = "https://api.iconify.design/mdi:robot.svg?color=%231e90ff";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="choice">
      {/* Column 1: PVC */}
      <div className="mode-column">
        <div className="image-wrapper">
          <img src={pvcImage} alt="Player vs Computer" className="mode-icon" />
        </div>
        <button type="button" className="btn bpvc" onClick={() => navigate('/pvc')}>
          Player vs Computer (α-β)
        </button>
      </div>

      {/* Column 2: PVP */}
      <div className="mode-column">
        <div className="image-wrapper">
          <img src={pvpImage} alt="Player vs Player" className="mode-icon" />
        </div>
        <button type="button" className="btn bpvp" onClick={() => navigate('/pvp')}>
          Player vs Player
        </button>
      </div>
    </div>
  );
};

export default Home;