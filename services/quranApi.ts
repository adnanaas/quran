
import { Verse } from '../types';

export const fetchSurahVerses = async (surahId: number): Promise<Verse[]> => {
  try {
    // نستخدم quran-uthmani للحصول على الرسم العثماني وأرقام الصفحات
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahId}/quran-uthmani`);
    const data = await response.json();
    if (data.code === 200) {
      return data.data.ayahs.map((ayah: any) => ({
        number: ayah.numberInSurah,
        text: ayah.text,
        page: ayah.page
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching Quran text:", error);
    return [];
  }
};
