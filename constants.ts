import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Is your website your main source of revenue?",
    subtext: "Relying heavily on OTAs significantly reduces your bottom-line profit margins due to high commission costs.",
    category: 'Direct Booking',
    weight: 12
  },
  {
    id: 2,
    text: "Does your booking engine automatically upgrade a guest to a superior room if their selected standard room is sold out?",
    subtext: "Losing a confirmed booking because the base room is full while suites are empty is a preventable revenue leak.",
    category: 'Direct Booking',
    weight: 10
  },
  {
    id: 3,
    text: "Does your booking engine have a mechanism to prioritise and highlight the most relevant rate plans?",
    subtext: "Overwhelming guests with too many unorganised options decreases conversion rates; smart prioritization is key.",
    category: 'Direct Booking',
    weight: 8
  },
  {
    id: 4,
    text: "Are you using dynamic 'Meal Plan' bundling to create unique packages (e.g., Dinner + Bed & Breakfast) that OTAs cannot technically match?",
    subtext: "Exclusive bundled content is your strongest technical weapon against strict OTA rate parity agreements.",
    category: 'Direct Booking',
    weight: 12
  },
  {
    id: 5,
    text: "Are you running active 'Brand Protection' PPC campaigns to stop OTAs from bidding on your hotel's name?",
    subtext: "If you don't bid on your own brand name, OTAs will capture that traffic and sell your own customer back to you at a commission.",
    category: 'Metasearch',
    weight: 10
  },
  {
    id: 6,
    text: "Are you running Metasearch campaigns (Google/Trivago) on a guaranteed CPA (Cost Per Acquisition) model?",
    subtext: "Standard CPC models risk wasted budget on clicks that don't convert; a CPA model guarantees ROI on every booking.",
    category: 'Metasearch',
    weight: 10
  },
  {
    id: 7,
    text: "Do you run specific 'Win-Back' retargeting campaigns for guests who visited your site but didn't book?",
    subtext: "97% of visitors leave to compare rates. Retargeting is essential to bring them back to book direct.",
    category: 'Analytics',
    weight: 10
  },
  {
    id: 8,
    text: "Is your website built on a 'Mobile-First' CMS specifically architected to meet 2026 Core Web Vitals for speed?",
    subtext: "Site speed is now a primary ranking factor for Google and a critical conversion factor for mobile guests.",
    category: 'Direct Booking',
    weight: 10
  },
  {
    id: 9,
    text: "Does your website automatically personalise content and offers based on the visitor’s country (Geo-Targeting)?",
    subtext: "Relevance drives revenue. Domestic and international guests require different messaging and offers to convert.",
    category: 'Direct Booking',
    weight: 8
  },
  {
    id: 10,
    text: "Do you track your 'True Cost of Acquisition' (Direct vs OTA) across all channels?",
    subtext: "You cannot effectively optimise net profit if you only measure top-line revenue without factoring in commission costs.",
    category: 'Analytics',
    weight: 12
  },
  {
    id: 11,
    text: "Does your current strategy involve a dedicated human expert who reviews your performance data with you monthly?",
    subtext: "Automated reports are just data; human interpretation is required to turn that data into a profitable strategy.",
    category: 'CRM',
    weight: 10
  },
  {
    id: 12,
    text: "Does your tech provider use AI for the benefit of your hotel and its direct strategy?",
    subtext: "AI should be actively reducing your workload and increasing your conversion, not just used as a buzzword.",
    category: 'Analytics',
    weight: 8
  },
  {
    id: 13,
    text: "Does your marketing technology automatically stop spending budget on dates where your hotel is already sold out?",
    subtext: "Advertising unavailable rooms is the fastest way to waste digital marketing budget and frustrate potential guests.",
    category: 'Metasearch',
    weight: 12
  },
  {
    id: 14,
    text: "Is your website specifically optimised for the new wave of AI Search (GEO) in addition to traditional Google SEO?",
    subtext: "Generative Engine Optimisation (GEO) is the future of how guests will find hotels via AI assistants.",
    category: 'Direct Booking',
    weight: 10
  },
  {
    id: 15,
    text: "Does your current tech provider use an AI-powered Bidding Strategy with Dynamic Budget Management?",
    subtext: "Manual bidding cannot compete with real-time, algorithmic market adjustments that react instantly to demand.",
    category: 'Metasearch',
    weight: 10
  }
];

export const MAX_SCORE = QUESTIONS.reduce((acc, q) => acc + q.weight, 0);