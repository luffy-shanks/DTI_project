import React, { useState } from 'react';
import { 
  Compass, Sparkles, Heart, ShieldCheck, ChevronDown, ChevronUp, 
  Users, Target, Award, ArrowRight 
} from 'lucide-react';

export default function About({ onNavigate }) {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'Is Kizunaa completely free to use for travelers?',
      a: 'Yes, 100%! Creating personalized AI travel itineraries, exploring destination guides, and accessing realistic budget breakdowns on Kizunaa is entirely free with zero hidden commissions.'
    },
    {
      q: 'How accurate are the AI budget and fare estimates?',
      a: 'Kizunaa estimates are tailored using seasonal average benchmarks across Andhra Pradesh, Telangana, and popular Indian travel routes. Fares for local autos, meals (like Bamboo Chicken or Biryani), and state transport reflect real on-ground prices. However, train and flight fares fluctuate dynamically on IRCTC and booking portals.'
    },
    {
      q: 'Why does Kizunaa focus especially on Andhra Pradesh and Telangana?',
      a: 'South India holds breathtaking yet under-represented gems—from the misty coffee valleys and Vistadome train line in Araku, to the grand canyon of Gandikota and Kakatiya heritage in Warangal. Kizunaa highlights these cultural treasures alongside national destinations.'
    },
    {
      q: 'Can college student groups plan custom split-budget trips?',
      a: 'Absolutely! Our planner is built with young travelers and college gangs in mind. You can set realistic per-person ceilings (like ₹4,500 – ₹7,500) and select backpacker hostels, street dining trails, and group excursions.'
    },
    {
      q: 'How can local homestays or certified tour guides partner with Kizunaa?',
      a: 'Local businesses can register via our Partner Portal. Every listing undergoes verification before being integrated into AI recommendations to guarantee safety and honest pricing for travelers.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Hero Mission */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          The Kizunaa Story
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-kizunaa-navy-950 font-['Outfit']">
          “Your Journey. Our Perfect Plan.”
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          <strong>Kizunaa</strong> (derived from the Japanese word for enduring bonds and deep connection) was created to take the stress, confusion, and overpriced tourist traps out of travel. We connect young explorers with real cultural journeys across India.
        </p>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-premium text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-xl font-bold">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Hyper-Personalized</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            No cookie-cutter commercial packages. Your itinerary respects your exact dates, group dynamic, and preferred pace.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-premium text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Transparent Budgets</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every rupee is accounted for across stay, transit, food, and activities with clear disclaimers and emergency buffers.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-premium text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto text-xl font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Local Heritage Pride</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Promoting authentic homestays, tribal artisans in Araku, and local eateries over corporate chains.
          </p>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-kizunaa-navy-950 font-['Outfit']">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500">
            Everything you need to know about planning your trip with Kizunaa.
          </p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-amber-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-amber-600" /> : <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-kizunaa-navy-950 rounded-3xl p-8 sm:p-10 text-white text-center space-y-4 shadow-2xl">
        <h3 className="text-2xl font-bold font-['Outfit']">Ready to experience seamless travel planning?</h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Try the AI planner today with our sample destinations like Araku Valley or Vizag.
        </p>
        <button
          onClick={() => onNavigate('planner')}
          className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-kizunaa-navy-950 font-bold text-xs shadow-glow transition-all"
        >
          Plan My Trip in 60 Seconds
        </button>
      </div>

    </div>
  );
}
