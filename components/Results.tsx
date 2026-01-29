import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { BrainCircuit, Activity, RefreshCcw, ArrowRight, Download, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Answer, AnswerValue, Language } from '../types';
import { QUESTIONS, MAX_SCORE } from '../constants';
import { generateStrategicAnalysis } from '../services/geminiService';
import { useContent } from '../contexts/ContentContext';
import { Button } from './Button';
import { EditableText } from './Editable';

interface ResultsProps {
  answers: Answer[];
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({ answers, onReset }) => {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<string>('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const { language } = useContent();

  const score = answers.reduce((acc, ans) => {
    if (ans.value === AnswerValue.YES) {
      const q = QUESTIONS.find(q => q.id === ans.questionId);
      return acc + (q ? q.weight : 0);
    }
    return acc;
  }, 0);

  const percentage = Math.round((score / MAX_SCORE) * 100);
  const missingCount = answers.filter(a => a.value === AnswerValue.NO).length;

  const statusMap: Record<Language, any> = {
    en: { critical: "Critical Condition", risk: "Digital Risk", optimized: "Optimised", subCritical: "Highly vulnerable to OTA dominance.", subRisk: "Missing profit-driving automation.", subOpt: "Performing well against industry benchmarks." },
    it: { critical: "Condizione Critica", risk: "Rischio Digitale", optimized: "Ottimizzato", subCritical: "Altamente vulnerabile al dominio delle OTA.", subRisk: "Manca l'automazione che genera profitto.", subOpt: "Ottime prestazioni rispetto ai benchmark di settore." },
    es: { critical: "Estado Crítico", risk: "Riesgo Digital", optimized: "Optimizado", subCritical: "Altamente vulnerable al dominio de las OTA.", subRisk: "Falta automatización que genere beneficios.", subOpt: "Buen desempeño frente a los estándares de la industria." }
  };

  const labelsMap: Record<Language, any> = {
    en: { auditComplete: "AUDIT COMPLETE", passing: "Passing Checks", gaps: "Critical Gaps", aiTitle: "AI Strategic Assessment", retake: "Retake Audit", download: "Download PDF Report", book: "Book Consultation", generating: "Generating PDF..." },
    it: { auditComplete: "AUDIT COMPLETATO", passing: "Controlli Superati", gaps: "Lacune Critiche", aiTitle: "Valutazione Strategica AI", retake: "Rifai l'Audit", download: "Scarica Report PDF", book: "Prenota Consulenza", generating: "Generazione PDF..." },
    es: { auditComplete: "AUDIT COMPLETADO", passing: "Pruebas Superadas", gaps: "Brechas Críticas", aiTitle: "Evaluación Estratégica IA", retake: "Repetir Audit", download: "Descargar Reporte PDF", book: "Reservar Consultoría", generating: "Generando PDF..." }
  };

  const s = statusMap[language];
  const l = labelsMap[language];

  let status = s.critical;
  let color = "#E63946";
  let subtext = s.subCritical;

  if (percentage >= 40 && percentage < 70) {
    status = s.risk;
    color = "#F59E0B";
    subtext = s.subRisk;
  } else if (percentage >= 70) {
    status = s.optimized;
    color = "#2A9D8F";
    subtext = s.subOpt;
  }

  const data = [{ name: 'Score', value: score }, { name: 'Gap', value: MAX_SCORE - score }];

  useEffect(() => {
    let isActive = true;
    const runAnalysis = async () => {
      setLoading(true);
      try {
        const result = await generateStrategicAnalysis(answers, language);
        if (isActive) setAnalysis(result);
      } catch (error) {
        if (isActive) setAnalysis("Analysis error.");
      } finally {
        if (isActive) setLoading(false);
      }
    };
    runAnalysis();
    return () => { isActive = false; };
  }, [answers, language]);

  const handleDownloadPDF = async () => {
    setIsGeneratingPdf(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    const element = document.getElementById('report-container');
    const html2pdf = (window as any).html2pdf;
    if (html2pdf && element) {
      try {
        const opt = { margin: [10, 10, 10, 10], filename: 'Hotel_Health_Audit.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };
        await html2pdf().set(opt).from(element).save();
      } catch (error) { window.print(); } finally { setIsGeneratingPdf(false); }
    } else { window.print(); setIsGeneratingPdf(false); }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 w-full" id="report-container">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8 print:shadow-none print:border-2">
        <div className="p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-shrink-0 relative w-48 h-48 sm:w-56 sm:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius="80%" outerRadius="100%" startAngle={90} endAngle={-270} dataKey="value" stroke="none" isAnimationActive={false}>
                  <Cell fill={color} />
                  <Cell fill="#E5E7EB" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl sm:text-5xl font-bold" style={{ color }}>{percentage}%</span>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">Tech Score</span>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold tracking-wide mb-4">
              <Activity size={14} />
              {l.auditComplete}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Status: <span style={{ color }}>{status}</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">{subtext}</p>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto md:mx-0">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="text-2xl font-bold text-gray-900">{answers.length - missingCount}</div>
                <div className="text-xs text-gray-500 uppercase">{l.passing}</div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                <div className="text-2xl font-bold text-brand-accent">{missingCount}</div>
                <div className="text-xs text-red-400 uppercase">{l.gaps}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-brand-blue text-white rounded-2xl shadow-xl overflow-hidden mb-8 print:bg-brand-blue print:text-white">
        <div className="p-6 sm:p-8 border-b border-blue-800/50 flex items-center gap-3">
          <BrainCircuit className="w-6 h-6 text-blue-300" />
          <h3 className="text-xl font-semibold">{l.aiTitle}</h3>
        </div>
        <div className="p-6 sm:p-10 leading-relaxed space-y-4 text-blue-50">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-blue-300" />
              <p className="text-sm text-blue-200 animate-pulse">Analysing...</p>
            </div>
          ) : (
            <div className="prose prose-invert prose-blue max-w-none">
               <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden mt-8" data-html2canvas-ignore="true">
        <button onClick={onReset} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          <RefreshCcw size={18} />
          {l.retake}
        </button>
        <div className="flex gap-3 w-full sm:w-auto">
             <Button onClick={handleDownloadPDF} variant="outline" className="w-full sm:w-auto" disabled={isGeneratingPdf}>
                {isGeneratingPdf ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                {isGeneratingPdf ? l.generating : l.download}
            </Button>
            <Button href="https://bookassist.org/book-a-demo" target="_blank" className="w-full sm:w-auto">
                {l.book} <ArrowRight size={18} />
            </Button>
        </div>
      </div>
    </div>
  );
};