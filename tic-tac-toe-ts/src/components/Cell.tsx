import React from 'react';
import type { CellValue } from '../types';

interface CellProps {
  content: CellValue;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ content, onClick }) => {
    const cellClass = `tic-tac-toe-cell ${content === 'X' ? 'x' : content === 'O' ? 'o' : ''}`;
    return (
        <div className={cellClass} onClick={onClick}>
            {content !== ' ' ? content : ''}
        </div>
    );
};

export default Cell;