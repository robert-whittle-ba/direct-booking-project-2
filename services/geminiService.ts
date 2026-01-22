import { GoogleGenAI } from "@google/genai";
import { Answer, AnswerValue } from '../types';
import { QUESTIONS } from '../constants';

// Original "Smart Fallback" - Logic to simulate AI analysis locally if API fails
const generateLocalAnalysis = (answers: Answer[], scorePercent: number): string => {
  const failedQuestions = answers
    .filter(a => a.value === AnswerValue.NO)
    .map(a => QUESTIONS.find(q => q.id === a.questionId))
    .filter(Boolean);

  let text = `### Strategic Assessment\n\n`;
  text += `Your hotel achieved a Digital Health Score of **${scorePercent}%**. `;
  
  if (scorePercent < 50) {
    text += `This indicates significant revenue leakage in your direct channel strategy. `;
  } else if (scorePercent < 80) {
    text += `While your foundation is solid, you are missing key automation opportunities. `;
  } else {
    text += `You are performing well, but there is room to refine your conversion logic. `;
  }

  text += `\n\n**Priority Action Plan:**\n`;

  // Take top 3 failed questions to analyse
  const topGaps = failedQuestions.sort((a, b) => (b?.weight || 0) - (a?.weight || 0)).slice(0, 3);

  if (topGaps.length > 0) {
    topGaps.forEach(q => {
      if (q) {
        text += `*   **Address ${q.category} Gap:** You answered NO to "${q.text}".\n    *   *Insight:* ${q.subtext}\n`;
      }
    });
  } else {
    text += `*   **Review Rate Parity:** Ensure your direct rates are always better or equal to OTAs.\n`;
    text += `*   **Audit Metasearch:** Check your impression share on Google Hotels.\n`;
  }

  text += `\n**Conclusion:**\nImmediate action is recommended to close these technical gaps and reduce Cost of Acquisition.`;
  
  // Mandatory CTA with Markdown Link
  text += `\n\nVisit [bookassist.org](https://bookassist.org) to improve your Tech Score.`;

  return text;
};

export const generateStrategicAnalysis = async (answers: Answer[]): Promise<string> => {
  const passedItems = answers.filter(a => a.value === AnswerValue.YES).length;
  const scorePercent = Math.round((passedItems / QUESTIONS.length) * 100);

  // 1. Identify Gaps for the Prompt
  const gapsList = answers
    .filter(a => a.value === AnswerValue.NO)
    .map(a => {
      const q = QUESTIONS.find(q => q.id === a.questionId);
      return q ? `- FAILED: ${q.text} (Category: ${q.category})` : null;
    })
    .filter(Boolean)
    .join('\n');

  // 2. Handle No API Key (Fallback)
  // Obtained exclusively from process.env.API_KEY as per guidelines
  if (!process.env.API_KEY) {
    // Add a small delay to simulate processing credibility
    await new Promise(resolve => setTimeout(resolve, 1500));
    return generateLocalAnalysis(answers, scorePercent);
  }

  // 3. Construct the prompt and query GenAI
  const prompt = `
    You are a Senior Hospitality Tech Consultant.
    The hotel scored ${scorePercent}% on their Digital Audit.
    
    Here are the specific Technical Gaps (Questions they failed):
    ${gapsList}

    Please provide a concise Strategic Assessment (max 200 words).
    1. Summarise their current performance status.
    2. Pick the top 2-3 most critical gaps from the list above and explain strictly WHY they cause revenue loss (using the context of the question).
    3. Use UK English spelling (Optimise, Analyse, Prioritise).
    4. Format with Markdown (Bold headers, bullet points).

    CRITICAL INSTRUCTION:
    You MUST end the response with exactly this sentence on a new line:
    "Visit [bookassist.org](https://bookassist.org) to improve your Tech Score."
  `;

  try {
    // Initialize GoogleGenAI right before use to ensure the latest key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // Correct model for basic text tasks
      contents: prompt,
    });
    
    // Extract text directly from the property (not a method)
    let text = response.text;

    if (!text) throw new Error("No response generated");

    // Enforce CTA if missing (using Markdown link)
    if (!text.toLowerCase().includes("bookassist.org")) {
      text += "\n\nVisit [bookassist.org](https://bookassist.org) to improve your Tech Score.";
    }

    return text;

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return generateLocalAnalysis(answers, scorePercent);
  }
};