import React, { useState } from 'react';
import Message from '../components/Message';
import Score from '../components/Score';
import Cell from '../components/Cell';
import type { GridState, PlayerCode } from '../types';

const PVP: React.FC = () => {
    const [grid, setGrid] = useState<GridState>([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]);
    const [turn, setTurn] = useState(0); // 0 for Player 1, 1 for Player 2
    const [message, setMessage] = useState("...");
    const [scores, setScores] = useState({ player1: 0, player2: 0 });
    const [gameOver, setGameOver] = useState(false);
    const [nextStarter, setNextStarter] = useState(0);

    const player1 = { code: 'O' as PlayerCode };
    const player2 = { code: 'X' as PlayerCode };

    const resetGame = () => {
        setGrid([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]);
        setTurn(nextStarter);
        setMessage("...");
        setGameOver(false);
    };

    const checkWinner = (currentGrid: GridState, code: PlayerCode) => {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        const flatGrid = currentGrid.flat();
        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (flatGrid[a] === code && flatGrid[b] === code && flatGrid[c] === code) {
                return true;
            }
        }
        return false;
    };

    const isDraw = (currentGrid: GridState) => currentGrid.flat().every((cell) => cell !== ' ');

    const handleCellClick = (x: number, y: number) => {
        if (gameOver || grid[x][y] !== ' ') return;

        const currentPlayerCode = turn === 0 ? player1.code : player2.code;
        const newGrid = grid.map((row, rIdx) =>
            row.map((cell, cIdx) => (rIdx === x && cIdx === y ? currentPlayerCode : cell))
        );
        setGrid(newGrid);

        if (checkWinner(newGrid, currentPlayerCode)) {
            setGameOver(true);
            if (turn === 0) {
                setScores(s => ({ ...s, player1: s.player1 + 1 }));
                setMessage("p1w");
                setNextStarter(0);
            } else {
                setScores(s => ({ ...s, player2: s.player2 + 1 }));
                setMessage("p2w");
                setNextStarter(1);
            }
            setTimeout(resetGame, 1500);
        } else if (isDraw(newGrid)) {
            setGameOver(true);
            setMessage("d");
            setNextStarter(prev => 1 - prev); // Alternate starter on draw
            setTimeout(resetGame, 1500);
        } else {
            setTurn(prev => 1 - prev);
        }
    };

    return (
        <div className="App">
            <Message text={message} p1Message="Player One Wins!!" p2Message="Player Two Wins!!" />
            <h2 className="" id={turn === 0 ? "player1" : "player2"}>
                {turn === 0 ? `Player One's Turn (${player1.code})` : `Player Two's Turn (${player2.code})`}
            </h2>
            <div className="tic-tac-toe-grid">
                {grid.map((row, rowIndex) =>
                    row.map((content, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            content={content}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                        />
                    ))
                )}
            </div>
            <Score scoreX={scores.player1} scoreO={scores.player2} />
        </div>
    );
};

export default PVP;