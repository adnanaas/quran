
import React, { useState, useEffect, useMemo } from 'react';
import { Verse } from '../types';
import { fetchSurahVerses } from '../services/quranApi';
import TafsirModal from './TafsirModal';

interface ReaderProps {
  title: string;
  surahIds: number[];
}

const Reader: React.FC<ReaderProps> = ({ title, surahIds }) => {
  const [allVerses, setAllVerses] = useState<(Verse & { surahName: string, surahId: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [selectedVerse, setSelectedVerse] = useState<any>(null);
  const [isTafsirOpen, setIsTafsirOpen] = useState(false);

  // البسملة الرسمية (بهمزة الوصل ٱ) كما تأتي من المصدر
  const BASMALA_PATTERN = /^بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\s?/;
  const DISPLAY_BASMALA = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      const versesData: any[] = [];
      for (const id of surahIds) {
        try {
          const surahRes = await fetch(`https://api.alquran.cloud/v1/surah/${id}`);
          const surahMeta = await surahRes.json();
          const data = await fetchSurahVerses(id);
          versesData.push(...data.map(v => ({ 
            ...v, 
            surahName: surahMeta.data.name,
            surahId: id
          })));
        } catch (e) { console.error(e); }
      }
      setAllVerses(versesData);
      setCurrentPageIdx(0);
      setLoading(false);
    };
    loadContent();
  }, [surahIds]);

  const pages = useMemo(() => {
    const pagesMap = new Map<number, any[]>();
    allVerses.forEach(v => {
      if (!pagesMap.has(v.page)) pagesMap.set(v.page, []);
      pagesMap.get(v.page)?.push(v);
    });
    return Array.from(pagesMap.values());
  }, [allVerses]);

  const currentPageVerses = pages[currentPageIdx] || [];
  const totalPages = pages.length;

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-800 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="p-1 animate-fade-in max-w-2xl mx-auto">
      <div className="mushaf-container">
        <div className="mushaf-outer-border">
          <div className="mushaf-inner-frame">
            
            <div className="quran-text-block">
              {currentPageVerses.map((verse, idx) => {
                const isFirstInSurah = verse.number === 1;
                const prevVerse = currentPageVerses[idx - 1];
                const isNewSurahStart = isFirstInSurah;
                
                // تنظيف النص من البسملة المدمجة بشكل قاطع
                let textToShow = verse.text;
                if (isFirstInSurah && verse.surahId !== 1 && verse.surahId !== 9) {
                  textToShow = textToShow.replace(BASMALA_PATTERN, "").trim();
                }

                return (
                  <React.Fragment key={`${verse.surahId}-${verse.number}`}>
                    {isNewSurahStart && (
                      <div className="w-full block select-none">
                        <div className="surah-header-wrapper">
                          <div className="surah-title-banner">{verse.surahName}</div>
                        </div>
                        {verse.surahId !== 1 && verse.surahId !== 9 && (
                          <div className="basmala-wrapper">
                            <div className="basmala-text">{DISPLAY_BASMALA}</div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <span 
                      onClick={() => { setSelectedVerse(verse); setIsTafsirOpen(true); }}
                      className="cursor-pointer hover:bg-amber-50 transition-colors"
                    >
                      {textToShow}
                      <span className="verse-icon">{verse.number}</span>
                    </span>
                  </React.Fragment>
                );
              })}
            </div>

            <div className="page-footer-num">
              {currentPageVerses[0]?.page}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6 px-4">
        <button 
          onClick={() => { setCurrentPageIdx(p => p + 1); window.scrollTo(0,0); }}
          disabled={currentPageIdx === totalPages - 1}
          className="flex-1 py-4 bg-emerald-900 text-white rounded-xl shadow-lg disabled:opacity-20 font-bold"
        >
          التالي
        </button>
        <button 
          onClick={() => { setCurrentPageIdx(p => p - 1); window.scrollTo(0,0); }}
          disabled={currentPageIdx === 0}
          className="flex-1 py-4 bg-emerald-900 text-white rounded-xl shadow-lg disabled:opacity-20 font-bold"
        >
          السابق
        </button>
      </div>

      {selectedVerse && (
        <TafsirModal 
          surah={{ name: selectedVerse.surahName } as any} 
          verse={selectedVerse} 
          isOpen={isTafsirOpen} 
          onClose={() => setIsTafsirOpen(false)} 
        />
      )}
    </div>
  );
};

export default Reader;
