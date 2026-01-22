import React from 'react';
import { Button } from './Button';
import { ShieldCheck, BarChart2, Globe, Zap } from 'lucide-react';
import { EditableText, EditableImage } from './Editable';

interface HomeProps {
  onStart: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-10 sm:mb-16">
        <div className="mb-8 max-w-3xl mx-auto">
          <EditableText 
            id="home.hero.title"
            as="h1"
            defaultText={`Maximise Your <span class="text-brand-blue">Digital Revenue</span> Potential`}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-4 sm:mb-6 leading-tight"
          />
          <EditableText 
            id="home.hero.subtitle"
            as="p"
            multiline
            defaultText="The Hotel Health Clinic is the industry standard for assessing hospitality technology infrastructure. We analyse your <strong>Direct Booking Strategy</strong>, <strong>Metasearch Connectivity</strong>, and <strong>Marketing ROI</strong> to identify critical performance gaps."
            className="text-base sm:text-xl text-gray-600 leading-relaxed px-0 sm:px-4"
          />
        </div>

        <div className="mb-8 sm:mb-12">
            <EditableImage 
                id="home.hero.image"
                defaultSrc="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200&auto=format&fit=crop"
                alt="Hotel Technology"
                className="w-full max-w-4xl mx-auto h-56 sm:h-96 object-cover rounded-2xl shadow-md"
            />
            {/* Only show helper text on desktop to reduce mobile clutter */}
            <p className="hidden sm:block text-xs text-gray-400 mt-2 italic print:hidden">Example editable image area</p>
        </div>

        <div className="print:hidden">
          <Button 
            onClick={onStart} 
            className="w-full sm:w-auto mx-auto text-lg px-8 py-4 sm:px-10 sm:py-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all"
          >
            <EditableText id="home.hero.cta" defaultText="Launch Free Tech Audit" as="span" />
          </Button>
        </div>
      </div>

      {/* SEO / AIO Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 mb-12 sm:mb-20">
        <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-gray-100 break-inside-avoid">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
            <ShieldCheck className="w-6 h-6 text-brand-blue" />
          </div>
          <EditableText 
            id="home.feat1.title" 
            as="h3" 
            defaultText="Secure Your Data" 
            className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4" 
          />
          <EditableText 
            id="home.feat1.desc" 
            as="p" 
            multiline
            defaultText="In an era of Intelligent Tracking Prevention (ITP) and privacy-first browsing, relying on legacy client-side tracking destroys marketing attribution. Our audit checks for <strong>Server-Side GA4 implementation</strong> and <strong>First-Party Data compliance</strong>."
            className="text-sm sm:text-base text-gray-600 leading-relaxed" 
          />
        </div>

        <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-gray-100 break-inside-avoid">
          <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
            <Globe className="w-6 h-6 text-brand-success" />
          </div>
          <EditableText 
            id="home.feat2.title" 
            as="h3" 
            defaultText="Dominate Metasearch" 
            className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4" 
          />
          <EditableText 
            id="home.feat2.desc" 
            as="p" 
            multiline
            defaultText="Are you bidding on parity-loss dates? <strong>Metasearch Optimisation</strong> is more than just CPC; it requires granular inventory management and real-time rate parity checks."
            className="text-sm sm:text-base text-gray-600 leading-relaxed" 
          />
        </div>

        <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-gray-100 break-inside-avoid">
          <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
            <Zap className="w-6 h-6 text-indigo-600" />
          </div>
          <EditableText 
            id="home.feat3.title" 
            as="h3" 
            defaultText="High-Conversion Engines" 
            className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4" 
          />
          <EditableText 
            id="home.feat3.desc" 
            as="p" 
            multiline
            defaultText="Friction kills conversion. From <strong>Mobile Digital Wallets</strong> (Apple Pay/Google Pay) to dynamic multi-currency displays, modern travellers demand a seamless experience."
            className="text-sm sm:text-base text-gray-600 leading-relaxed" 
          />
        </div>

        <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-gray-100 break-inside-avoid">
          <div className="w-12 h-12 bg-rose-50 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
            <BarChart2 className="w-6 h-6 text-brand-accent" />
          </div>
          <EditableText 
            id="home.feat4.title" 
            as="h3" 
            defaultText="AI-Driven Personalisation" 
            className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4" 
          />
          <EditableText 
            id="home.feat4.desc" 
            as="p" 
            multiline
            defaultText="Static content is obsolete. Leverage <strong>Predictive Analytics</strong> and <strong>Dynamic Content Personalisation</strong> to serve the right offer to the right guest."
            className="text-sm sm:text-base text-gray-600 leading-relaxed" 
          />
        </div>
      </div>

      {/* Bottom CTA - Hidden in Print */}
      <div className="bg-brand-blue rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center text-white relative overflow-hidden print:hidden">
        <div className="relative z-10">
          <EditableText 
            id="home.bottom.title" 
            as="h2" 
            defaultText="Ready to diagnose your digital health?" 
            className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 leading-tight" 
          />
          <EditableText 
            id="home.bottom.desc" 
            as="p" 
            defaultText="Join thousands of hoteliers optimising their revenue strategy. The audit takes less than 3 minutes and provides an instant strategic roadmap." 
            className="text-blue-100 mb-8 max-w-2xl mx-auto text-sm sm:text-base" 
          />
          <Button onClick={onStart} variant="secondary" className="w-full sm:w-auto mx-auto px-8 py-3 text-lg font-semibold">
            <EditableText id="home.bottom.cta" defaultText="Start Assessment Now" as="span" />
          </Button>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>
    </div>
  );
};