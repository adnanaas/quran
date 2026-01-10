
import React, { useEffect, useState } from 'react';
import { getVerseTafsir } from '../services/geminiService';
import { Verse, Surah } from '../types';

interface TafsirModalProps {
  surah: Surah;
  verse: Verse;
  isOpen: boolean;
  onClose: () => void;
}

const TafsirModal: React.FC<TafsirModalProps> = ({ surah, verse, isOpen, onClose }) => {
  const [tafsir, setTafsir] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && verse) {
      const fetchTafsir = async () => {
        setLoading(true);
        const result = await getVerseTafsir(surah.name, verse.number, verse.text);
        setTafsir(result);
        setLoading(false);
      };
      fetchTafsir();
    }
  }, [isOpen, verse, surah.name]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-4 bg-emerald-800 text-white flex justify-between items-center">
          <h3 className="font-bold">تفسير الآية {verse.number}</h3>
          <button onClick={onClose} className="p-1 hover:bg-emerald-700 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="p-4 bg-emerald-50 border-r-4 border-emerald-500 rounded-l-lg">
            <p className="quran-text text-xl text-emerald-900 leading-relaxed text-center">
              {verse.text}
            </p>
          </div>
          
          <div className="prose prose-emerald max-w-none">
            <h4 className="text-emerald-800 font-bold mb-2">تفسير الباحث الذكي:</h4>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-3">
                <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500 animate-pulse">جاري صياغة التفسير...</p>
              </div>
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {tafsir}
              </p>
            )}
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 border-t flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default TafsirModal;
