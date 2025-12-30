import React from 'react';

interface ScoreProps {
  p1Score: number;
  p2Score: number;
  isVsComputer: boolean;
}

const Score: React.FC<ScoreProps> = ({ p1Score, p2Score, isVsComputer }) => (
  <div className="scoreboard">
    <div className="player" id="player1">
      {isVsComputer ? 'Player' : 'Player One'}: {p1Score}
    </div>
    <div className="player" id="player2">
      {isVsComputer ? 'Computer' : 'Player Two'}: {p2Score}
    </div>
  </div>
);

export default Score;