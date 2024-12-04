import React, { useState } from "react";
import gridStyle from "../Grid.css";
import Score from "./Score";
import Message from "./Message";

function PVP(props) {
  const [grid, setGrid] = useState([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]);
  const [turn, setTurn] = useState(0); // 0 for Player One, 1 for Player Two
  const [message, setMessage] = useState("...");
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [nextTurn, setNextTurn] = useState(0); // Tracks who will start the next game

  const player1 = { score: scores.player1, code: 'O' };
  const player2 = { score: scores.player2, code: 'X' };

  // Resets the game board
  const resetGame = () => {
    setGrid([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]);
    setTurn(nextTurn); // Ensure the next game starts with the correct player
    setMessage("...");
    setGameOver(false);
  };

  // Checks for a winner
  const isWinner = (grid, x, y, currentPlayerCode) => {
    const rowWin = grid[x].every((cell) => cell === currentPlayerCode);
    const colWin = grid.every((row) => row[y] === currentPlayerCode);
    const diag1Win = grid.every((_, i) => grid[i][i] === currentPlayerCode);
    const diag2Win = grid.every((_, i) => grid[i][grid.length - 1 - i] === currentPlayerCode);

    return rowWin || colWin || diag1Win || diag2Win;
  };

  // Checks for a draw
  const isDraw = (grid) => {
    return grid.flat().every((cell) => cell !== ' ');
  };

  // Handles a cell click
  const handleCellClick = (x, y) => {
    if (gameOver || grid[x][y] !== ' ') return; // Prevent interaction if the game is over or the cell is occupied

    const currentCode = turn === 0 ? player1.code : player2.code;

    const updatedGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => (rowIndex === x && colIndex === y ? currentCode : cell))
    );

    setGrid(updatedGrid);

    if (isWinner(updatedGrid, x, y, currentCode)) {
      setGameOver(true);
      if (turn === 0) {
        setScores((prevScores) => ({ ...prevScores, player1: prevScores.player1 + 1 }));
        setMessage("p1w");
        setNextTurn(0); // Player 1 starts next
      } else {
        setScores((prevScores) => ({ ...prevScores, player2: prevScores.player2 + 1 }));
        setMessage("p2w");
        setNextTurn(1); // Player 2 starts next
      }
      setTimeout(resetGame, 500);
    } else if (isDraw(updatedGrid)) {
      setGameOver(true);
      setMessage("d");
      setNextTurn((prevTurn) => 1 - prevTurn); // Alternate turn after a draw
      setTimeout(resetGame, 500);
    } else {
      setTurn((prevTurn) => 1 - prevTurn); // Switch turns
    }
  };

  return (
    <div className="App">
      <Message text={message} p1={"Player One Wins !!"} p2={"Player Two Wins !!"} />
      <h2 className="container my-3" id={turn === 0 ? "player1" : "player2"}>
        {turn === 0 ? "Player One's Turn (" + player1.code + ")" : "Player Two's Turn (" + player2.code + ")"}
      </h2>
      <div className="tic-tac-toe-grid my-5" style={gridStyle}>
        {grid.map((row, rowIndex) =>
          row.map((content, colIndex) => {
            const cellClass = content === 'X' ? 'tic-tac-toe-cell x' : 'tic-tac-toe-cell o';
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={cellClass}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {content}
              </div>
            );
          })
        )}
      </div>
      <Score p1={scores.player1} p2={scores.player2} pvc={false} />
    </div>
  );
}

export default PVP;
