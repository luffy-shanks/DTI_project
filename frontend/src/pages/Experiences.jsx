import React, { useState } from 'react';
import { 
  Hotel, Utensils, Train, Sparkles, MapPin, Star, ShieldCheck, 
  ExternalLink, Compass, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { EXPERIENCES_DATA } from '../data/experiencesData';

export default function Experiences({ onQuickPlan }) {
  const [activeTab, setActiveTab] = useState('stays');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Local Living &amp; Flavors
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-kizunaa-navy-950 font-['Outfit']">
          Accommodation, Food &amp; Transit
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Experience Andhra Pradesh and Telangana through trusted local stays, legendary street kitchens, and scenic Vistadome train journeys.
        </p>

        {/* Tab Buttons */}
        <div className="flex items-center justify-center gap-2 pt-4">
          {[
            { id: 'stays', label: 'Curated Stays', icon: <Hotel className="w-4 h-4" /> },
            { id: 'food', label: 'Local Cuisines', icon: <Utensils className="w-4 h-4" /> },
            { id: 'transport', label: 'Transit Guides', icon: <Train className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-kizunaa-navy-950 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notice */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900 max-w-4xl mx-auto">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <span className="font-bold">Transparency &amp; Partner Verification:</span> Listings below represent vetted sample accommodations and iconic regional culinary landmarks. Live booking integrations are currently onboarding via our official partner portal.
        </p>
      </div>

      {/* 1. STAYS SECTION */}
      {activeTab === 'stays' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeIn">
          {EXPERIENCES_DATA.accommodations.map((acc) => (
            <div
              key={acc.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-premium hover:shadow-premium-hover transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img src={acc.image} alt={acc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold">
                    {acc.badge}
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{acc.rating}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base font-['Outfit'] leading-snug">{acc.name}</h3>
                    <p className="text-xs text-amber-700 font-medium flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{acc.location}</span>
                    </p>
                  </div>

                  <div className="space-y-1">
                    {acc.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">From</span>
                  <span className="text-base font-black text-slate-900 font-['Outfit']">{acc.pricePerNight}</span>
                  <span className="text-[10px] text-slate-500"> / night</span>
                </div>
                <button
                  onClick={() => onQuickPlan({ destination: acc.location.split(',')[0], stayPreference: acc.category })}
                  className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-kizunaa-navy-950 font-bold text-xs shadow-sm transition-all"
                >
                  Plan Around
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. CUISINE SECTION */}
      {activeTab === 'food' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
          {EXPERIENCES_DATA.cuisines.map((c) => (
            <div key={c.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium flex flex-col sm:flex-row gap-6">
              <div className="sm:w-1/2 h-48 rounded-2xl overflow-hidden relative shrink-0">
                <img src={c.image} alt={c.dishName} className="w-full h-full object-cover" />
                <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold">
                  {c.type}
                </span>
              </div>
              <div className="sm:w-1/2 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-600">{c.region}</span>
                  <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] mt-0.5">{c.dishName}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{c.description}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Approx. Price:</span>
                    <span className="font-bold text-emerald-600">{c.priceEstimate}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">Must Try Spot:</span> {c.mustTryAt}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. TRANSIT SECTION */}
      {activeTab === 'transport' && (
        <div className="space-y-6 animate-fadeIn">
          {EXPERIENCES_DATA.transportTips.map((tr, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-premium flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold">
                  <Train className="w-3.5 h-3.5" />
                  <span>{tr.mode}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">{tr.route}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{tr.tip}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs pt-1 text-slate-500">
                  <span><strong>Schedule:</strong> {tr.frequency}</span>
                  <span>&bull;</span>
                  <span><strong>Fare Range:</strong> <span className="text-emerald-700 font-bold">{tr.cost}</span></span>
                </div>
              </div>

              <button
                onClick={() => onQuickPlan({ destination: tr.route.split('➔')[1]?.trim() || 'Araku Valley' })}
                className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-kizunaa-navy-950 font-bold text-xs shadow-sm transition-all whitespace-nowrap self-start md:self-auto"
              >
                Plan Itinerary for this Route
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
