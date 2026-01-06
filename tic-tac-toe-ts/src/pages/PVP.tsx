import React, { useState } from 'react';
import Message from '../components/Message';
import Score from '../components/Score';
import Cell from '../components/Cell';
import type { GridState, PlayerCode } from '../types';

const PVP: React.FC = () => {
    const [grid, setGrid] = useState<GridState>([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]);
    const [turn, setTurn] = useState(0); 
    const [message, setMessage] = useState("...");
    const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });
    const [lastResult, setLastResult] = useState<string | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const [nextStarter, setNextStarter] = useState(0);

    const player1 = { code: 'O' as PlayerCode };
    const player2 = { code: 'X' as PlayerCode };

    const resetGame = () => {
        setGrid([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]);
        setNextStarter(1 - nextStarter);
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
            if (turn === 0) { // Player 1 (O)
                setScores(s => ({ ...s, o: s.o + 1 }));
                setLastResult('O');
                setMessage("p1w");
            } else { // Player 2 (X)
                setScores(s => ({ ...s, x: s.x + 1 }));
                setLastResult('X');
                setMessage("p2w");
            }
            setTimeout(resetGame, 1500);
        } else if (isDraw(newGrid)) {
            setGameOver(true);
            setScores(s => ({ ...s, draws: s.draws + 1 }));
            setLastResult('Draw');
            setMessage("d");
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
            <Score 
                scoreX={scores.x} 
                scoreO={scores.o} 
                draws={scores.draws} 
                isXNext={turn === 1}
                winner={lastResult} 
            />
        </div>
    );
};

export default PVP;