
import React from 'react';
import { Surah } from '../types';

interface SurahCardProps {
  surah: Surah;
  onClick: () => void;
}

const SurahCard: React.FC<SurahCardProps> = ({ surah, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white p-4 rounded-xl shadow-sm border border-emerald-100 hover:border-emerald-300 hover:shadow-md transition-all flex items-center justify-between text-right"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center border border-emerald-100 rotate-45 group-hover:rotate-0 transition-transform">
          <span className="text-emerald-700 font-bold -rotate-45">{surah.id}</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">{surah.name}</h3>
          <p className="text-sm text-gray-500 font-light">{surah.englishName} • {surah.versesCount} آية</p>
        </div>
      </div>
      <div className="text-left">
        <span className={`px-3 py-1 rounded-full text-xs ${surah.type === 'مكية' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
          {surah.type}
        </span>
      </div>
    </button>
  );
};

export default SurahCard;
