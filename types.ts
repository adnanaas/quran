
export interface Surah {
  id: number;
  name: string;
  englishName: string;
  versesCount: number;
  type: 'Meccan' | 'Medinan' | 'مكية' | 'مدنية';
  revelationOrder: number;
}

export interface Verse {
  number: number;
  text: string;
  page: number;
}

export interface QuranContent {
  surah: Surah;
  verses: Verse[];
}

export interface AppState {
  view: 'home' | 'reader';
  selectedSurah: Surah | null;
  searchQuery: string;
  isTafsirOpen: boolean;
  selectedVerseForTafsir: Verse | null;
}
