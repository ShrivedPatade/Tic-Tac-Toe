import React, { useState, useEffect } from 'react';
import Message from '../components/Message';
import Grid from '../components/Grid';
import Score from '../components/Score';
import type { GridState, PlayerCode } from '../types';

const PVC: React.FC = () => {
    const [grid, setGrid] = useState<GridState>([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]);
    const [turn, setTurn] = useState(0);
    const [msg, setMsg] = useState("...");
    const [scores, setScores] = useState({ player: 0, comp: 0 });
    const [isGameOver, setGameOver] = useState(false);

    const player = { code: 'X' as PlayerCode };
    const comp = { code: 'O' as PlayerCode };

    const checkWinner = (board: GridState): PlayerCode | "Draw" | null => {
        const lines = [
            [[0, 0], [0, 1], [0, 2]], [[1, 0], [1, 1], [1, 2]], [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]], [[0, 1], [1, 1], [2, 1]], [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]], [[0, 2], [1, 1], [2, 0]],
        ];
        for (const line of lines) {
            const [a, b, c] = line;
            const cellA = board[a[0]][a[1]];
            if (cellA !== ' ' && cellA === board[b[0]][b[1]] && cellA === board[c[0]][c[1]]) return cellA;
        }
        if (board.flat().every(cell => cell !== ' ')) return "Draw";
        return null;
    };

    const playerMove = (x: number, y: number) => {
        if (grid[x][y] !== ' ' || turn !== 0 || isGameOver) return;
        const newGrid = grid.map((row, rIdx) => row.map((cell, cIdx) => (rIdx === x && cIdx === y ? player.code : cell)));
        setGrid(newGrid);
        setTurn(1);
    };

    useEffect(() => {
        const winner = checkWinner(grid);
        if (winner && !isGameOver) {
            setGameOver(true);
            if (winner === player.code) {
                setScores(s => ({ ...s, player: s.player + 1 }));
                setMsg("p1w");
            } else if (winner === comp.code) {
                setScores(s => ({ ...s, comp: s.comp + 1 }));
                setMsg("cw");
            } else {
                setMsg("d");
            }
            setTimeout(() => {
                setGrid([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]);
                setTurn(0);
                setMsg("...");
                setGameOver(false);
            }, 1500);
        }
    }, [grid, isGameOver]);

    useEffect(() => {
        if (turn === 1 && !isGameOver) {
            const timer = setTimeout(() => {
                const move = bestMove(grid);
                if (move) {
                    const newGrid = grid.map((row, rIdx) => row.map((cell, cIdx) => (rIdx === move.x && cIdx === move.y ? comp.code : cell)));
                    setGrid(newGrid);
                    setTurn(0);
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [turn, grid, isGameOver]);

    const minimax = (board: GridState, isMaximizing: boolean): number => {
        const winner = checkWinner(board);
        if (winner === player.code) return -10;
        if (winner === comp.code) return 10;
        if (winner === "Draw") return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    if (board[r][c] === ' ') {
                        board[r][c] = comp.code;
                        let score = minimax(board, false);
                        board[r][c] = ' ';
                        bestScore = Math.max(score, bestScore);
                    }
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    if (board[r][c] === ' ') {
                        board[r][c] = player.code;
                        let score = minimax(board, true);
                        board[r][c] = ' ';
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    };

    const bestMove = (board: GridState): { x: number, y: number } | null => {
        let bestScore = -Infinity;
        let move = null;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (board[r][c] === ' ') {
                    board[r][c] = comp.code;
                    let score = minimax(board, false);
                    board[r][c] = ' ';
                    if (score > bestScore) {
                        bestScore = score;
                        move = { x: r, y: c };
                    }
                }
            }
        }
        return move;
    };

    return (
        <div className="App">
            <Message text={msg} p1Message="You Win !!" p2Message="Computer Wins !!" />
            <Grid turn={turn} playerCode={player.code} grid={grid} onCellClick={playerMove} />
            <Score scoreX={scores.player} scoreO={scores.comp} />
        </div>
    );
};

export default PVC;