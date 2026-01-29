import { GoogleGenAI } from "@google/genai";
import { Answer, AnswerValue, Language } from '../types';
import { QUESTIONS } from '../constants';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

const generateLocalAnalysis = (answers: Answer[], scorePercent: number, lang: Language): string => {
  const failedQuestions = answers
    .filter(a => a.value === AnswerValue.NO)
    .map(a => QUESTIONS.find(q => q.id === a.questionId))
    .filter(Boolean);

  const localText: Record<Language, any> = {
    en: { title: 'Strategic Assessment', score: 'Your hotel achieved a Digital Health Score of', cta: 'Visit [bookassist.org](https://bookassist.org) to improve your Tech Score.' },
    it: { title: 'Valutazione Strategica', score: 'Il tuo hotel ha ottenuto un Digital Health Score del', cta: 'Visita [bookassist.org](https://bookassist.org) per migliorare il tuo Tech Score.' },
    es: { title: 'Evaluación Estratégica', score: 'Tu hotel logró una puntuación de salud digital del', cta: 'Visita [bookassist.org](https://bookassist.org) para mejorar tu Tech Score.' }
  };

  const t = localText[lang];
  let text = `### ${t.title}\n\n`;
  text += `${t.score} **${scorePercent}%**. `;
  
  // Basic content logic in English for fallback
  if (scorePercent < 50) {
    text += lang === 'it' ? `Questo indica una significativa perdita di entrate nella tua strategia diretta.` : 
            lang === 'es' ? `Esto indica una pérdida significativa de ingresos en tu estrategia de canal directo.` :
            `This indicates significant revenue leakage in your direct channel strategy. `;
  }

  text += `\n\n${t.cta}`;
  return text;
};

export const generateStrategicAnalysis = async (answers: Answer[], lang: Language): Promise<string> => {
  const client = getClient();
  const passedItems = answers.filter(a => a.value === AnswerValue.YES).length;
  const scorePercent = Math.round((passedItems / QUESTIONS.length) * 100);

  const gapsList = answers
    .filter(a => a.value === AnswerValue.NO)
    .map(a => {
      const q = QUESTIONS.find(q => q.id === a.questionId);
      return q ? `- FAILED: ${q.translations[lang].text} (Category: ${q.category})` : null;
    })
    .filter(Boolean)
    .join('\n');

  if (!client) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return generateLocalAnalysis(answers, scorePercent, lang);
  }

  const langNames = { en: 'English', it: 'Italian', es: 'Spanish' };

  const prompt = `
    You are a Senior Hospitality Tech Consultant.
    The hotel scored ${scorePercent}% on their Digital Audit.
    
    Here are the specific Technical Gaps (Questions they failed):
    ${gapsList}

    Please provide a concise Strategic Assessment (max 200 words).
    1. Summarise their current performance status.
    2. Pick the top 2-3 most critical gaps and explain WHY they cause revenue loss.
    3. YOU MUST RESPOND IN ${langNames[lang].toUpperCase()}.
    4. Use informal second-person singular ("tú") if the language is Spanish.
    5. Format with Markdown (Bold headers, bullet points).

    CRITICAL INSTRUCTION:
    You MUST end the response with exactly this sentence on a new line (translated correctly if needed):
    ${lang === 'it' ? '"Visita [bookassist.org](https://bookassist.org) per migliorare il tuo Tech Score."' : 
      lang === 'es' ? '"Visita [bookassist.org](https://bookassist.org) para mejorar tu Tech Score."' :
      '"Visit [bookassist.org](https://bookassist.org) to improve your Tech Score."'}
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    let text = response.text;
    if (!text) throw new Error("No response generated");

    if (!text.toLowerCase().includes("bookassist.org")) {
      text += lang === 'it' ? "\n\nVisita [bookassist.org](https://bookassist.org) per migliorare il tuo Tech Score." :
              lang === 'es' ? "\n\nVisita [bookassist.org](https://bookassist.org) para mejorar tu Tech Score." :
              "\n\nVisit [bookassist.org](https://bookassist.org) to improve your Tech Score.";
    }

    return text;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return generateLocalAnalysis(answers, scorePercent, lang);
  }
};