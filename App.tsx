import React, { useState } from 'react';
import { Home } from './components/Home';
import { AuditTool } from './components/AuditTool';
import { Activity, Menu, X } from 'lucide-react';
import { EditableText } from './components/Editable';

type Page = 'HOME' | 'AUDIT';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('HOME');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen supports-[height:100dvh]:min-h-[100dvh] bg-[#F4F6F8] font-sans text-gray-900 flex flex-col print:bg-white print:h-auto print:min-h-0">
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200 print:static print:shadow-none print:border-b-2 print:border-brand-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer active:opacity-80 transition-opacity flex-shrink-0" 
            onClick={() => navigateTo('HOME')}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-blue rounded-lg flex items-center justify-center shadow-md flex-shrink-0 print:shadow-none">
              <Activity className="text-white w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-lg sm:text-xl font-bold text-brand-blue tracking-tight leading-none">
                 <EditableText id="app.header.title" defaultText="Hotel Health Clinic" as="span" />
              </h1>
              <p className="hidden sm:block text-xs text-gray-500 uppercase tracking-widest font-semibold mt-1 print:block">
                 <EditableText id="app.header.subtitle" defaultText="Hotel Tech & Marketing Audit Tool" as="span" />
              </p>
            </div>
          </div>

          {/* Desktop Nav - Hidden in Print */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 print:hidden">
            <button 
              onClick={() => navigateTo('HOME')}
              className={`text-sm font-medium transition-colors ${currentPage === 'HOME' ? 'text-brand-blue font-bold' : 'text-gray-500 hover:text-brand-blue'}`}
            >
              Home
            </button>
            <button 
              onClick={() => navigateTo('AUDIT')}
              className={`text-sm font-medium transition-colors ${currentPage === 'AUDIT' ? 'text-brand-blue font-bold' : 'text-gray-500 hover:text-brand-blue'}`}
            >
              Digital Audit
            </button>
            <a 
              href="https://bookassist.org/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-500 hover:text-brand-blue transition-colors"
            >
              Contact Us
            </a>
            <button 
              onClick={() => navigateTo('AUDIT')}
              className="bg-brand-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors shadow-sm"
            >
              Start Audit
            </button>
          </div>

          {/* Mobile Hamburger - Hidden in Print */}
          <div className="md:hidden flex items-center print:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors active:bg-gray-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0 top-16 sm:top-20 z-40 animate-in slide-in-from-top-5 duration-200 h-[calc(100vh-4rem)] overflow-y-auto print:hidden">
            <div className="px-4 py-6 space-y-3 flex flex-col pb-20">
              <button 
                onClick={() => navigateTo('HOME')}
                className={`text-left px-4 py-4 rounded-lg text-lg ${currentPage === 'HOME' ? 'bg-blue-50 text-brand-blue font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                Home
              </button>
              <button 
                onClick={() => navigateTo('AUDIT')}
                className={`text-left px-4 py-4 rounded-lg text-lg ${currentPage === 'AUDIT' ? 'bg-blue-50 text-brand-blue font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                Digital Audit Tool
              </button>
              <a 
                href="https://bookassist.org/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="text-left px-4 py-4 rounded-lg text-lg text-gray-700 hover:bg-gray-50"
              >
                Contact Us
              </a>
              <div className="pt-4 border-t border-gray-100 mt-2">
                 <button 
                  onClick={() => navigateTo('AUDIT')}
                  className="w-full bg-brand-blue text-white px-4 py-4 rounded-xl text-lg font-medium shadow-md active:scale-[0.98] transition-transform"
                >
                  Start Audit
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow flex flex-col items-center justify-start w-full pt-4 sm:pt-6 pb-12 print:pt-4 print:pb-0">
        {currentPage === 'HOME' && <Home onStart={() => navigateTo('AUDIT')} />}
        {currentPage === 'AUDIT' && <AuditTool />}
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 sm:py-12 mt-auto print:border-t-0 print:py-4 print:mt-4 break-inside-avoid">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Hotel Health Clinic. All rights reserved.</p>
          <p className="mt-2 text-xs uppercase tracking-widest text-gray-300 print:text-gray-500">Technology Provided by Bookassist</p>
        </div>
      </footer>
    </div>
  );
};

export default App;