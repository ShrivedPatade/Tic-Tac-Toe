import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import Message from '../components/Message';
import Score from '../components/Score';
import Cell from '../components/Cell';
import type { GridState, PlayerCode } from '../types';

const PVP: React.FC = () => {
    // Initial random starter: 0 for Player 1 (O), 1 for Player 2 (X)
    const getRandomStarter = () => Math.floor(Math.random() * 2);

    const [grid, setGrid] = useState<GridState>([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]);
    const [nextStarter, setNextStarter] = useState(getRandomStarter);
    const [turn, setTurn] = useState(nextStarter); 
    const [message, setMessage] = useState("...");
    const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });
    const [lastResult, setLastResult] = useState<string | null>(null);
    const [gameOver, setGameOver] = useState(false);

    const player1 = { code: 'O' as PlayerCode };
    const player2 = { code: 'X' as PlayerCode };

    const resetGame = (starter: number) => {
        setGrid([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]);
        setTurn(starter);
        setNextStarter(starter);
        setMessage("...");
        setGameOver(false);
    };

    const checkWinner = (currentGrid: GridState, code: PlayerCode) => {
        const winConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        const flatGrid = currentGrid.flat();
        return winConditions.some(cond => cond.every(idx => flatGrid[idx] === code));
    };

    const handleCellClick = (x: number, y: number) => {
        if (gameOver || grid[x][y] !== ' ') return;

        const currentPlayerCode = turn === 0 ? player1.code : player2.code;
        const newGrid = grid.map((row, rIdx) =>
            row.map((cell, cIdx) => (rIdx === x && cIdx === y ? currentPlayerCode : cell))
        );
        setGrid(newGrid);

        if (checkWinner(newGrid, currentPlayerCode)) {
            setGameOver(true);
            confetti({ particleCount: 150, spread: 70, origin: { x: 0, y: 1 }, angle: 45 });
            confetti({ particleCount: 150, spread: 70, origin: { x: 1, y: 1 }, angle: 135 });
            
            if (turn === 0) {
                setScores(s => ({ ...s, o: s.o + 1 }));
                setLastResult('O');
                setMessage("p1w");
                setTimeout(() => resetGame(0), 1500); // Winner (P1) starts next
            } else {
                setScores(s => ({ ...s, x: s.x + 1 }));
                setLastResult('X');
                setMessage("p2w");
                setTimeout(() => resetGame(1), 1500); // Winner (P2) starts next
            }
        } else if (newGrid.flat().every(cell => cell !== ' ')) {
            setGameOver(true);
            setScores(s => ({ ...s, draws: s.draws + 1 }));
            setLastResult('Draw');
            setMessage("d");
            // If draw, the OTHER player starts (1 - whoever just played)
            setTimeout(() => resetGame(1 - turn), 1500); 
        } else {
            setTurn(prev => 1 - prev);
        }
    };

    return (
        <div className="App">
            <Message text={message} p1Message="Player One Wins!!" p2Message="Player Two Wins!!" />
            <h2 className={turn === 0 ? "player-o-text" : "player-x-text"}>
                {turn === 0 ? `Player One's Turn (O)` : `Player Two's Turn (X)`}
            </h2>
            <div className="tic-tac-toe-grid">
                {grid.map((row, r) => row.map((cell, c) => (
                    <Cell key={`${r}-${c}`} content={cell} onClick={() => handleCellClick(r, c)} />
                )))}
            </div>
            <Score scoreX={scores.x} scoreO={scores.o} draws={scores.draws} isXNext={turn === 1} winner={lastResult} />
        </div>
    );
};

export default PVP;