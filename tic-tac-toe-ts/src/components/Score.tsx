import React from 'react';

interface ScoreProps {
  scoreX: number;
  scoreO: number;
  draws: number;
  isXNext: boolean;
  winner: string | null;
}

const Score: React.FC<ScoreProps> = ({ scoreX, scoreO, draws, isXNext, winner }) => {
  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-8">
      <div className={`p-4 rounded-2xl text-center transition-all duration-300 shadow-sm ${isXNext && !winner ? 'bg-orange-500 text-white scale-105 ring-4 ring-orange-100' : 'bg-white text-orange-600 border border-orange-100'}`}>
        <div className="text-xs uppercase font-black tracking-widest opacity-70 mb-1">Player X</div>
        <div className="text-3xl font-black">{scoreX}</div>
      </div>
      
      <div className="p-4 rounded-2xl text-center bg-white text-slate-600 shadow-sm border border-slate-100">
        <div className="text-xs uppercase font-black tracking-widest opacity-70 mb-1">Draws</div>
        <div className="text-3xl font-black">{draws}</div>
      </div>
      
      <div className={`p-4 rounded-2xl text-center transition-all duration-300 shadow-sm ${!isXNext && !winner ? 'bg-blue-500 text-white scale-105 ring-4 ring-blue-100' : 'bg-white text-blue-600 border border-blue-100'}`}>
        <div className="text-xs uppercase font-black tracking-widest opacity-70 mb-1">Player O</div>
        <div className="text-3xl font-black">{scoreO}</div>
      </div>
    </div>
  );
};

export default Score;