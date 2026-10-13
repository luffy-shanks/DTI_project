import React, { useState } from 'react';
import { 
  Search, Filter, MapPin, Calendar, Clock, DollarSign, Star, 
  ArrowRight, Sparkles, X, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { DESTINATIONS_DATA } from '../data/destinationsData';

export default function Destinations({ onSelectDestinationForPlan }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [activeModalDest, setActiveModalDest] = useState(null);

  // Filter logic
  const filtered = DESTINATIONS_DATA.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'All' || d.state === selectedState;
    const matchesCat = selectedCategory === 'All' || d.category === selectedCategory;
    return matchesSearch && matchesState && matchesCat;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'budgetAsc') return a.startingBudget - b.startingBudget;
    if (sortBy === 'budgetDesc') return b.startingBudget - a.startingBudget;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Curated Travel Directory
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-kizunaa-navy-950 font-['Outfit']">
          Explore Incredible Destinations
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          From the misty Eastern Ghats of Araku to the royal Nizami streets of Hyderabad and coastal beaches of Vizag. Filter by state, category, or budget.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-premium space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by city, state, or attraction..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* State Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-amber-500 bg-white"
            >
              <option value="All">All States / Union Territories</option>
              <option value="Andhra Pradesh">Andhra Pradesh Focus</option>
              <option value="Telangana">Telangana Focus</option>
              <option value="Goa">Goa</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-amber-500 bg-white"
            >
              <option value="All">All Categories</option>
              <option value="Hill Station">Hill Stations</option>
              <option value="Coastal">Coastal &amp; Beaches</option>
              <option value="Heritage">Royal &amp; Heritage</option>
              <option value="Pilgrimage">Spiritual &amp; Temples</option>
              <option value="Adventure">Adventure &amp; Canyons</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-amber-500 bg-white"
            >
              <option value="rating">Top Rated</option>
              <option value="budgetAsc">Budget: Low to High</option>
              <option value="budgetDesc">Budget: High to Low</option>
            </select>
          </div>

        </div>

        {/* Quick Filter Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-semibold">Quick Filters:</span>
          {['All', 'Andhra Pradesh', 'Telangana'].map(state => (
            <button
              key={state}
              onClick={() => setSelectedState(state)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedState === state
                  ? 'bg-amber-400 text-kizunaa-navy-950 shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {state === 'All' ? 'All Destinations' : state}
            </button>
          ))}
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((dest) => (
          <div
            key={dest.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col group"
          >
            {/* Image Header */}
            <div className="relative h-60 overflow-hidden">
              <img
                src={dest.coverImage}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                {dest.state}
              </div>

              <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-amber-400 text-kizunaa-navy-950 text-xs font-bold flex items-center gap-1 shadow">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{dest.rating}</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl font-black font-['Outfit']">{dest.name}</h3>
                <p className="text-xs text-amber-200">{dest.tag}</p>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {dest.shortDescription}
              </p>

              {/* Attributes */}
              <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Best Season</span>
                  <span className="font-semibold text-slate-800">{dest.bestSeason}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Est. Budget</span>
                  <span className="font-bold text-emerald-600">{dest.budgetRange}</span>
                </div>
              </div>

              {/* Popular Attractions */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Highlights</span>
                <div className="flex flex-wrap gap-1.5">
                  {dest.highlights.slice(0, 3).map((h, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveModalDest(dest)}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors text-center"
                >
                  Explore Details
                </button>
                <button
                  onClick={() => onSelectDestinationForPlan(dest.name)}
                  className="py-2.5 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-kizunaa-navy-950 text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Plan Trip</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-premium max-w-lg mx-auto">
          <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No destinations found</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting your state or category filters.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedState('All'); setSelectedCategory('All'); }}
            className="mt-4 px-4 py-2 rounded-xl bg-amber-400 text-kizunaa-navy-950 font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* DESTINATION DETAIL MODAL */}
      {activeModalDest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-slideUp">
            
            <div className="relative h-64">
              <img src={activeModalDest.coverImage} alt={activeModalDest.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <button
                onClick={() => setActiveModalDest(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-bold inline-block mb-1">
                  {activeModalDest.category} &bull; {activeModalDest.state}
                </span>
                <h3 className="text-3xl font-black font-['Outfit']">{activeModalDest.name}</h3>
                <p className="text-xs text-amber-200">{activeModalDest.tag}</p>
              </div>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <p className="text-slate-600 text-sm leading-relaxed">
                {activeModalDest.shortDescription}
              </p>

              <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Best Season</span>
                  <span className="font-semibold text-slate-800">{activeModalDest.bestSeason}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Ideal Duration</span>
                  <span className="font-semibold text-slate-800">{activeModalDest.recommendedDuration}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Budget Starting</span>
                  <span className="font-bold text-emerald-600">{activeModalDest.budgetRange}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-2">Signature Highlights &amp; Must-Do Experiences:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalDest.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-amber-50/60 border border-amber-200/50 text-amber-950">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200/60 rounded-xl text-blue-900">
                <span className="font-bold block text-[11px]">Recommended Traveler Profile:</span>
                <span>Best suited for {activeModalDest.idealFor.join(', ')}.</span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  onClick={() => setActiveModalDest(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const name = activeModalDest.name;
                    setActiveModalDest(null);
                    onSelectDestinationForPlan(name);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-kizunaa-navy-950 font-bold shadow-sm"
                >
                  Plan a Trip to {activeModalDest.name}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
