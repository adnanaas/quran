
import { Surah } from './types';

export interface JuzData {
  id: string;
  name: string;
  surahIds: number[];
}

export const SELECTED_SURAHS: Surah[] = [
  { id: 2, name: 'البقرة', englishName: 'Al-Baqara', versesCount: 286, type: 'مدنية', revelationOrder: 87 },
  { id: 3, name: 'آل عمران', englishName: 'Al-Imran', versesCount: 200, type: 'مدنية', revelationOrder: 89 },
  { id: 10, name: 'يونس', englishName: 'Yunus', versesCount: 109, type: 'مكية', revelationOrder: 51 },
  { id: 11, name: 'هود', englishName: 'Hud', versesCount: 123, type: 'مكية', revelationOrder: 52 },
  { id: 12, name: 'يوسف', englishName: 'Yusuf', versesCount: 111, type: 'مكية', revelationOrder: 53 },
  { id: 13, name: 'الرعد', englishName: 'Ar-Ra\'d', versesCount: 43, type: 'مدنية', revelationOrder: 96 },
  { id: 14, name: 'إبراهيم', englishName: 'Ibrahim', versesCount: 52, type: 'مكية', revelationOrder: 72 },
  { id: 18, name: 'الكهف', englishName: 'Al-Kahf', versesCount: 110, type: 'مكية', revelationOrder: 69 },
  { id: 36, name: 'يس', englishName: 'Yaseen', versesCount: 83, type: 'مكية', revelationOrder: 41 },
  { id: 50, name: 'ق', englishName: 'Qaf', versesCount: 45, type: 'مكية', revelationOrder: 34 },
];

// تعريف الأجزاء كمجموعات
export const JUZ_COLLECTIONS: JuzData[] = [
  { id: 'j-27', name: 'جزء الذاريات', surahIds: Array.from({length: 7}, (_, i) => 51 + i) }, // 51-57
  { id: 'j-28', name: 'جزء المجادلة', surahIds: Array.from({length: 9}, (_, i) => 58 + i) }, // 58-66
  { id: 'j-29', name: 'جزء تبارك', surahIds: Array.from({length: 11}, (_, i) => 67 + i) }, // 67-77
  { id: 'j-30', name: 'جزء عم', surahIds: Array.from({length: 37}, (_, i) => 78 + i) }, // 78-114
];

// دمج الكل في قائمة العرض الأساسية
export const DISPLAY_ITEMS = [
  ...SELECTED_SURAHS.map(s => ({ ...s, isJuz: false })),
  ...JUZ_COLLECTIONS.map(j => ({ id: j.id, name: j.name, isJuz: true, surahIds: j.surahIds }))
];
