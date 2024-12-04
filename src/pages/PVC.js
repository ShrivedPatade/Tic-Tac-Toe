import React, { useState, useEffect } from "react";
import Message from "./Message";
import Grid from "./Grid";
import Score from "./Score";

function PVC(props) {
  const [grid, setGrid] = useState([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]);
  const [turn, setTurn] = useState(0); // 0 for Player, 1 for Computer
  const [gameStatus, setGameStatus] = useState("Player's Turn"); // Initial status
  const [msg, setMsg] = useState("...");
  const [scores, setScores] = useState({ player: 0, comp: 0 });
  const [firstTurn, setFirstTurn] = useState(0); // 0 for Player, 1 for Computer

  const player = { score: scores.player, code: 'X' };
  const comp = { score: scores.comp, code: 'O' };

  // Player's move
  const playerMove = (x, y) => {
    if (grid[x][y] !== ' ' || turn !== 0 || gameStatus.includes("Wins") || gameStatus.includes("Draw")) return;

    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => (rowIndex === x && colIndex === y ? player.code : cell))
    );
    setGrid(newGrid);
    setMsg("...");
    setTurn(1); // Switch to computer's turn
  };

  // Computer's move
  const compMove = () => {
    const move = bestMove(grid);
    if (move) {
      const newGrid = grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (rowIndex === move.x && colIndex === move.y ? comp.code : cell))
      );
      setGrid(newGrid);
    }
    setTurn(0); // Switch back to player's turn
  };

  // Check game status
  const checkGameStatus = () => {
    const winner = checkWinner(grid);
    if (winner) {
      if (winner === player.code) {
        setScores((prevScores) => ({ ...prevScores, player: prevScores.player + 1 }));
        setGameStatus("Player Wins !!");
        setMsg("pw");
        setFirstTurn(0); // Player starts next
      } else if (winner === comp.code) {
        setScores((prevScores) => ({ ...prevScores, comp: prevScores.comp + 1 }));
        setGameStatus("Computer Wins !!");
        setMsg("cw");
        setFirstTurn(1); // Computer starts next
      } else if (winner === "Draw") {
        setGameStatus("It's a Draw!");
        setMsg("d");
        setFirstTurn((prev) => 1 - prev); // Alternate for draw
      }
      return true; // Indicates the game has ended
    }
    return false; // Indicates the game continues
  };

  // Reset the game board
  const resetGame = () => {
    setGrid([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]);
    setTurn(firstTurn);
    setGameStatus(firstTurn === 0 ? "Player's Turn" : "Computer's Turn");
  };

  // React to changes in turn or grid
  useEffect(() => {
    if (gameStatus.includes("Wins") || gameStatus.includes("Draw")) {
      // Trigger reset after a delay to display the result
      setTimeout(resetGame, 1000);
      return;
    }
    
    if (turn === 1) {
      setGameStatus("Computer's Turn");
      setTimeout(compMove, 500); // Computer moves after a delay
    } else {
      if (!checkGameStatus()) {
        setGameStatus("Player's Turn"); // Ensure correct status
      }
    }
  }, [turn, grid, gameStatus]); // React whenever the turn, grid, or gameStatus changes

  return (
    <div className="App">
      <Message text={msg} p1={"You Win !!"} p2={"Computer Wins !!"}/>
      <Grid 
        turn={turn} 
        code={player.code} 
        grid={grid} 
        setgrid={playerMove} 
      />
      <Score p1={scores.player} p2={scores.comp} />
    </div>
  );
}

export default PVC;

function bestMove(board) {
  let bestScore = -Infinity;
  let move = null;

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === ' ') {
        board[row][col] = 'O'; // Computer is 'O'
        let score = minimaxAlphaBeta(board, 0, false, -Infinity, Infinity);
        board[row][col] = ' ';
        if (score > bestScore) {
          bestScore = score;
          move = { x: row, y: col };
        }
      }
    }
  }
  return move;
}

function minimaxAlphaBeta(board, depth, isMaximizing, alpha, beta) {
  const winner = checkWinner(board);
  if (winner === 'X') return -1;
  if (winner === 'O') return 1;
  if (winner === "Draw") return 0;

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === ' ') {
          board[row][col] = 'O';
          let val = minimaxAlphaBeta(board, depth + 1, false, alpha, beta);
          board[row][col] = ' ';
          maxEval = Math.max(val, maxEval);
          alpha = Math.max(alpha, val);
          if (beta <= alpha) break;
        }
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === ' ') {
          board[row][col] = 'X';
          let val = minimaxAlphaBeta(board, depth + 1, true, alpha, beta);
          board[row][col] = ' ';
          minEval = Math.min(val, minEval);
          beta = Math.min(beta, val);
          if (beta <= alpha) break;
        }
      }
    }
    return minEval;
  }
}

function checkWinner(board) {
  for (let row of board) {
    if (row[0] === row[1] && row[1] === row[2] && row[0] !== ' ') return row[0];
  }
  for (let col = 0; col < 3; col++) {
    if (board[0][col] === board[1][col] && board[1][col] === board[2][col] && board[0][col] !== ' ') return board[0][col];
  }
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== ' ') return board[0][0];
  if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== ' ') return board[0][2];

  if (board.flat().every(cell => cell !== ' ')) return "Draw";

  return null;
}