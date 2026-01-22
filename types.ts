export interface Question {
  id: number;
  text: string;
  subtext: string;
  category: 'Direct Booking' | 'Metasearch' | 'Analytics' | 'CRM';
  weight: number; // Higher weight for more critical tech
}

export enum AnswerValue {
  YES = 'YES',
  NO = 'NO'
}

export interface Answer {
  questionId: number;
  value: AnswerValue;
}

export interface AnalysisResult {
  score: number;
  rating: string;
  summary: string;
  recommendations: string[];
}

export enum AppState {
  WELCOME = 'WELCOME',
  QUIZ = 'QUIZ',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS'
}