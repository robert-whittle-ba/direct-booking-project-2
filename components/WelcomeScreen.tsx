import React from 'react';
import { Activity, BarChart3, Stethoscope } from 'lucide-react';
import { Button } from './Button';
import { EditableText } from './Editable';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-12 lg:px-8 flex flex-col items-center text-center">
      <div className="bg-white p-4 rounded-full shadow-lg mb-6 sm:mb-8">
        <Stethoscope className="w-10 h-10 sm:w-12 sm:h-12 text-brand-blue" />
      </div>
      
      <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4 sm:mb-6 leading-tight">
        <EditableText id="welcome.title" defaultText="Hotel Health Clinic" as="span" />
        <span className="block text-xl sm:text-3xl text-brand-blue mt-2 font-medium">
          <EditableText id="welcome.subtitle" defaultText="Official Tech Stack Audit" as="span" />
        </span>
      </h1>
      
      <div className="max-w-2xl text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 leading-relaxed mx-auto px-2">
        <EditableText 
          id="welcome.desc" 
          defaultText="Are you losing direct revenue to OTAs due to invisible technical gaps? This <strong>Hotel Tech & Marketing Audit</strong> assesses your booking capability against the top 5% of performing hotels worldwide."
          multiline
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl mb-10 sm:mb-12">
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <Activity className="w-8 h-8 text-brand-accent mb-3 sm:mb-4 mx-auto" />
          <h3 className="font-semibold text-gray-900 mb-2">
            <EditableText id="welcome.card1.title" defaultText="Vulnerability Check" />
          </h3>
          <p className="text-sm text-gray-500">
            <EditableText id="welcome.card1.desc" defaultText="Detect tracking failures and data loss." />
          </p>
        </div>
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <BarChart3 className="w-8 h-8 text-brand-blue mb-3 sm:mb-4 mx-auto" />
          <h3 className="font-semibold text-gray-900 mb-2">
            <EditableText id="welcome.card2.title" defaultText="Conversion Logic" />
          </h3>
          <p className="text-sm text-gray-500">
            <EditableText id="welcome.card2.desc" defaultText="Analyse funnel friction points." />
          </p>
        </div>
        <div className="bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <Stethoscope className="w-8 h-8 text-brand-success mb-3 sm:mb-4 mx-auto" />
          <h3 className="font-semibold text-gray-900 mb-2">
            <EditableText id="welcome.card3.title" defaultText="Health Score" />
          </h3>
          <p className="text-sm text-gray-500">
            <EditableText id="welcome.card3.desc" defaultText="Get your certified maturity index." />
          </p>
        </div>
      </div>

      <Button onClick={onStart} className="w-full sm:w-auto text-lg px-10 py-4 shadow-lg">
        <EditableText id="welcome.cta" defaultText="Start Diagnostic" as="span" />
      </Button>
      
      <p className="mt-4 text-xs sm:text-sm text-gray-400">
        <EditableText id="welcome.footer" defaultText="Data-driven. Confidential." />
      </p>
    </div>
  );
};