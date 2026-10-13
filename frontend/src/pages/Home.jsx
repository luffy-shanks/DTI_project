import React, { useState } from 'react';
import { 
  Sparkles, Search, MapPin, Calendar, Users, Wallet, ArrowRight, 
  CheckCircle2, Compass, ShieldCheck, Star, Train, Coffee, Hotel, 
  Camera, Landmark, UtensilsCrossed, Share2, Award, Zap
} from 'lucide-react';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { EXPERIENCES_DATA } from '../data/experiencesData';

export default function Home({ onNavigate, onQuickPlan }) {
  const [searchDestination, setSearchDestination] = useState('');
  const [selectedStateFilter, setSelectedStateFilter] = useState('All');

  // Filtered popular destinations for preview
  const popularSpots = DESTINATIONS_DATA.slice(0, 6);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onQuickPlan({ destination: searchDestination || 'Araku Valley' });
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center bg-gradient-to-b from-kizunaa-navy-950 via-kizunaa-navy-900 to-kizunaa-navy-800 text-white overflow-hidden px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        {/* Ambient Glows & Background Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-12 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide shadow-glow animate-bounce">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AI-Powered Smart Travel for India &bull; Andhra &amp; Telangana Focus</span>
          </div>

          {/* Main Hero Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-['Outfit'] leading-[1.1] text-white">
            Your Next Adventure <br className="hidden sm:inline" />
            Starts with <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-kizunaa-gold bg-clip-text text-transparent">Kizunaa.</span>
          </h1>

          {/* Brand Tagline & Supporting Value */}
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
            “Your Journey. Our Perfect Plan.” Enter your dates, college crew or family size, and budget in INR. 
            Our AI generates day-wise realistic itineraries with authentic food, transport tips, and real cost estimates.
          </p>

          {/* Search & Plan Card */}
          <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-xl p-3 sm:p-4 rounded-3xl shadow-2xl border border-white/40 text-slate-900 text-left">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              
              {/* Destination Input */}
              <div className="sm:col-span-7 flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200/80 focus-within:border-amber-500 focus-within:bg-white transition-all">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0" />
                <div className="w-full">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Where to?</label>
                  <input
                    type="text"
                    placeholder="e.g. Araku Valley, Vizag, Hyderabad, Tirupati..."
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Quick Preset Selector */}
              <div className="sm:col-span-5 flex items-center gap-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-kizunaa-gold hover:from-amber-300 hover:to-amber-400 text-kizunaa-navy-950 font-black text-sm tracking-wide shadow-glow transition-all flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Plan My Trip with AI</span>
                </button>
              </div>

            </form>

            {/* Quick Suggestions Chips */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 px-1 text-xs">
              <span className="text-slate-500 font-medium">Trending Now:</span>
              {[
                { name: 'Araku Valley', tag: 'Vistadome & Hills' },
                { name: 'Visakhapatnam', tag: 'Beaches & Submarine' },
                { name: 'Hyderabad', tag: 'Biryani & Nizams' },
                { name: 'Gandikota', tag: 'Grand Canyon' },
                { name: 'Tirupati', tag: 'Temple & Talakona' }
              ].map(chip => (
                <button
                  key={chip.name}
                  type="button"
                  onClick={() => onQuickPlan({ destination: chip.name })}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 font-semibold transition-colors flex items-center gap-1"
                >
                  <span>{chip.name}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({chip.tag})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Social Proof Stats — honest beta metrics */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-center border-t border-white/10">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-['Outfit']">12</div>
              <p className="text-xs text-slate-300 font-medium">Destinations Covered</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-['Outfit']">₹0</div>
              <p className="text-xs text-slate-300 font-medium">Planning Fees · Always Free</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-['Outfit']">&lt;2s</div>
              <p className="text-xs text-slate-300 font-medium">AI Itinerary Generation</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-['Outfit']">AP&nbsp;&amp;&nbsp;TG</div>
              <p className="text-xs text-slate-300 font-medium">Andhra &amp; Telangana Focus</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Effortless Journey Architect
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-kizunaa-navy-950 font-['Outfit']">
            How Kizunaa Works in 3 Simple Steps
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Skip hours of messy blog reading and unverified travel advice. Kizunaa synthesizes local intelligence into a customized plan in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="relative bg-white rounded-3xl p-8 border border-slate-100 shadow-premium hover:shadow-premium-hover transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform shadow-inner">
              01
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-['Outfit']">Choose Preferences</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pick your starting city, travel dates, friends or family headcount, and total budget in INR. Select your vibe: Nature, Heritage, Food, or Coastal beaches.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative bg-white rounded-3xl p-8 border border-amber-300/60 shadow-premium hover:shadow-premium-hover transition-all group ring-2 ring-amber-400/20">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-kizunaa-navy-950 font-bold flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform shadow-glow">
              02
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-['Outfit']">AI Generates Itinerary</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our travel intelligence engine constructs a day-wise timeline with morning, afternoon, and evening slots, real-world transport routes, and transparent cost estimates.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative bg-white rounded-3xl p-8 border border-slate-100 shadow-premium hover:shadow-premium-hover transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-800 font-bold flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform shadow-inner">
              03
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-['Outfit']">Explore, Save &amp; Travel</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Fine-tune activities, view local homestays and food tips, export your itinerary to PDF or print, share with your college gang, and start packing!
            </p>
          </div>

        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => onNavigate('planner')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-kizunaa-navy-950 hover:bg-kizunaa-navy-900 text-white font-bold text-sm shadow-md transition-all active:scale-95"
          >
            <span>Start Planning Right Now</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </section>

      {/* 3. POPULAR DESTINATIONS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Curated Gateways
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-kizunaa-navy-950 font-['Outfit'] mt-2">
              Popular Destinations in Andhra &amp; Telangana
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Handpicked scenic hill stations, coastal retreats, royal heritage corridors, and adventure canyons.
            </p>
          </div>
          <button
            onClick={() => onNavigate('destinations')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors self-start md:self-auto"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularSpots.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col group"
            >
              {/* Image Banner */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.coverImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* State Tag */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
                  {dest.state}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-amber-400 text-kizunaa-navy-950 text-xs font-bold flex items-center gap-1 shadow">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{dest.rating}</span>
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold font-['Outfit'] leading-tight">{dest.name}</h3>
                  <p className="text-xs text-amber-200">{dest.tag}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {dest.shortDescription}
                </p>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Recommended</span>
                    <span className="font-semibold text-slate-800">{dest.recommendedDuration}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Budget Range</span>
                    <span className="font-semibold text-emerald-600">{dest.budgetRange}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Top Attractions</span>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.highlights.slice(0, 2).map((h, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => onQuickPlan({ destination: dest.name })}
                    className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-kizunaa-navy-950 font-bold text-xs shadow-sm transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Plan Trip Here</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. STUDENT & YOUNG TRAVELER PERKS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-kizunaa-gold rounded-3xl p-8 sm:p-12 text-kizunaa-navy-950 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-kizunaa-navy-950 text-amber-300">
              <Award className="w-3.5 h-3.5" /> College &amp; Youth Special
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-['Outfit'] tracking-tight">
              Tight Student Budget? We Got You Covered.
            </h2>
            <p className="text-sm sm:text-base text-kizunaa-navy-950/90 font-medium max-w-xl">
              From ₹4,500 weekend gang trips to Araku on the scenic Vistadome train, to shared dorms at Vizag beach and Gandikota canyon camping. Kizunaa maximizes every rupee without compromising on epic adventures.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onQuickPlan({ destination: 'Araku Valley', totalBudget: 7500, travelType: 'Friends' })}
                className="px-6 py-3.5 rounded-2xl bg-kizunaa-navy-950 hover:bg-kizunaa-navy-900 text-white font-bold text-sm shadow-xl transition-all"
              >
                Plan a ₹7,500 College Gang Trip
              </button>
              <div className="flex items-center gap-2 text-xs font-bold text-kizunaa-navy-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                <span>Affiliate links always labeled · Planning is free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LOCAL EXPERIENCES TEASER (Cuisines & Stays) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Authentic Flavors &amp; Stays
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-kizunaa-navy-950 font-['Outfit']">
            Taste &amp; Live the Destination Like a Local
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Never settle for generic hotel buffets. Kizunaa weaves local culinary staples and scenic stays directly into your itinerary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPERIENCES_DATA.cuisines.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-premium p-4 space-y-3">
              <div className="h-40 rounded-xl overflow-hidden relative">
                <img src={c.image} alt={c.dishName} className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold">
                  {c.region}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm font-['Outfit']">{c.dishName}</h4>
              <p className="text-xs text-slate-500 line-clamp-2">{c.description}</p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Est. Price</span>
                <span className="font-bold text-amber-600">{c.priceEstimate}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => onNavigate('experiences')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-amber-600 transition-colors"
          >
            <span>Explore All Stays, Cuisines &amp; Transport Guides</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 6. SAMPLE TRAVELER TESTIMONIALS (Clearly Identified Sample Content) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Community Love &bull; Sample Early Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-kizunaa-navy-950 font-['Outfit']">
            Loved by Adventurers Across South India
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Kavya S.',
              role: 'B.Tech Student, Hyderabad',
              trip: '3-Day Araku Valley Trip with College Gang',
              quote: 'Kizunaa timed the Vistadome morning train and Borra caves perfectly! We stayed under our ₹6,000 per person budget and discovered the best bamboo chicken stall.',
              rating: 5
            },
            {
              name: 'Rohit & Sneha',
              role: 'Couple Travelers, Vijayawada',
              trip: 'Vizag & Rushikonda Coastal Getaway',
              quote: 'Having the sunrise at Kailasagiri and submarine museum laid out in morning/afternoon slots saved us from endless debate. The estimated costs were spot on!',
              rating: 5
            },
            {
              name: 'Arun V.',
              role: 'Solo Trekker, Bangalore',
              trip: 'Gandikota Gorge & Belum Caves Expedition',
              quote: 'I had no idea Gandikota canyon camping was this accessible. Kizunaa gave me transport connectivity tips from Tadipatri and a verified tent partner.',
              rating: 5
            }
          ].map((t, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <p className="font-bold text-sm text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-400">{t.role}</p>
                <span className="inline-block mt-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  {t.trip}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
