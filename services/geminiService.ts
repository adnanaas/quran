
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getVerseTafsir = async (surahName: string, verseNumber: number, verseText: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `بصفتك باحثاً في علوم القرآن، قدم تفسيراً ميسراً وموجزاً للآية التالية من سورة ${surahName}، الآية رقم ${verseNumber}:
      "${verseText}"
      
      اجعل التفسير باللغة العربية البسيطة مع ذكر الفوائد المستخلصة منها.`,
    });
    
    return response.text || "عذراً، لم نتمكن من جلب التفسير حالياً.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "حدث خطأ أثناء محاولة جلب التفسير. يرجى المحاولة لاحقاً.";
  }
};
