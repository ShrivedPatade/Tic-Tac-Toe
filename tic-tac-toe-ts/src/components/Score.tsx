import React from 'react';

interface ScoreProps {
  scoreX: number;
  scoreO: number;
  draws: number;
  // isXNext is kept for the interface but not used for glowing here
  isXNext: boolean; 
  winner: string | null; 
}

const Score: React.FC<ScoreProps> = ({ scoreX, scoreO, draws, winner }) => {
  return (
    <div className="score-container">
      {/* Player X glows if winner is 'X' */}
      <div className={`score-card score-card-x ${winner === 'X' ? 'active' : ''}`}>
        <div className="score-label">Player X</div>
        <div className="score-value">{scoreX}</div>
      </div>
      
      {/* Draws glows if winner is 'Draw' */}
      <div className={`score-card score-card-draw ${winner === 'Draw' ? 'active' : ''}`}>
        <div className="score-label">Draws</div>
        <div className="score-value">{draws}</div>
      </div>
      
      {/* Player O glows if winner is 'O' */}
      <div className={`score-card score-card-o ${winner === 'O' ? 'active' : ''}`}>
        <div className="score-label">Player O</div>
        <div className="score-value">{scoreO}</div>
      </div>
    </div>
  );
};

export default Score;