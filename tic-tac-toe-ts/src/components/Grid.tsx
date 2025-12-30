import React from 'react';
import Cell from './Cell';
import type { GridState, PlayerCode } from '../types';

interface GridProps {
  grid: GridState;
  turn: number;
  playerCode: PlayerCode;
  onCellClick: (x: number, y: number) => void;
}

const Grid: React.FC<GridProps> = ({ grid, turn, playerCode, onCellClick }) => (
  <div>
    {turn === 0 ? (
      <h2 className="container my-3" id="player1">Your move ({playerCode})</h2>
    ) : (
      <h2 className="container my-3" id="player2">Computer's move (O)</h2>
    )}
    <div className="tic-tac-toe-grid my-5">
      {grid.map((row, rowIndex) =>
        row.map((content, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            content={content}
            onClick={() => onCellClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  </div>
);

export default Grid;
