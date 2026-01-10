
import React, { useState } from 'react';
import { DISPLAY_ITEMS } from './constants';
import Header from './components/Header';
import Reader from './components/Reader';

const App: React.FC = () => {
  const [view, setView] = useState<{ type: 'home' | 'reader', data: any }>({ type: 'home', data: null });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = DISPLAY_ITEMS.filter(item => 
    item.name.includes(searchQuery)
  );

  return (
    <div className="min-h-screen flex flex-col max-w-4xl mx-auto bg-stone-100 shadow-2xl overflow-x-hidden border-x border-stone-300">
      <Header 
        title={view.type === 'reader' ? view.data.name : "مصحف المدينة المنورة"} 
        onBack={() => setView({ type: 'home', data: null })}
        showBack={view.type === 'reader'}
      />

      <main className="flex-1 pb-10">
        {view.type === 'home' ? (
          <div className="p-4 md:p-8 space-y-8">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن سورة أو جزء..."
                className="w-full p-5 pr-14 rounded-3xl bg-white shadow-sm border-2 border-amber-100 focus:border-amber-400 outline-none transition-all text-right text-lg"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg className="w-7 h-7 absolute right-5 top-1/2 -translate-y-1/2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredItems.map((item: any) => (
                <button
                  key={item.id}
                  onClick={() => setView({ type: 'reader', data: { name: item.name, ids: item.isJuz ? item.surahIds : [item.id] } })}
                  className="group bg-white p-6 rounded-2xl shadow-sm border border-stone-200 hover:border-amber-400 hover:shadow-md transition-all flex items-center justify-between text-right overflow-hidden relative"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100 text-amber-700 font-bold text-xl">
                      {item.isJuz ? 'ج' : item.id}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-stone-800">{item.name}</h3>
                      <p className="text-sm text-stone-400">
                        {item.isJuz ? `يحتوي على ${item.surahIds.length} سورة` : `${item.versesCount} آية`}
                      </p>
                    </div>
                  </div>
                  <svg className="w-6 h-6 text-stone-300 group-hover:text-amber-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              ))}
            </div>

            <div className="bg-amber-900/5 p-8 rounded-[2rem] border-2 border-amber-100 text-center space-y-4">
              <h3 className="text-amber-900 font-bold text-xl">عن التطبيق</h3>
              <p className="text-amber-800/80 leading-relaxed">
                تطبيق إسلامي يهدف لتوفير تجربة قراءة تحاكي مصحف المدينة المنورة مع إمكانية تفسير الآيات ميسراً بالذكاء الاصطناعي.
                <br />
                <span className="mt-4 block font-bold text-amber-900 text-lg">برمجة الدكتور عدنان ساعاتي</span>
              </p>
            </div>
          </div>
        ) : (
          <Reader title={view.data.name} surahIds={view.data.ids} />
        )}
      </main>

      <footer className="p-6 text-center border-t border-stone-200 bg-white/50">
        <p className="text-sm text-stone-500 font-serif">
          ﴿ ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ ﴾
        </p>
      </footer>
    </div>
  );
};

export default App;
