import React, { useState } from 'react';
import { 
  Sparkles, MapPin, Calendar, Users, Wallet, Compass, CheckCircle2, 
  ArrowRight, ArrowLeft, Heart, Shield, Train, Hotel, Utensils, 
  Car, Bus, Plane, RefreshCw, AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';

export default function TripPlanner({ initialPlanData, onItineraryGenerated, notify }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingTipIndex, setLoadingTipIndex] = useState(0);

  // Form State
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    origin: 'Hyderabad',
    destination: initialPlanData?.destination || 'Araku Valley',
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    travelers: 2,
    travelType: initialPlanData?.travelType || 'Friends',
    totalBudget: initialPlanData?.totalBudget || 12000,
    interests: ['Nature', 'Adventure', 'Food'],
    transportPreference: 'Train',
    stayPreference: 'Budget Hotel',
    dietaryPreference: 'Any / Regional Cuisine',
    accessibilityNotes: '',
    flexibleDates: false
  });

  const travelTypes = [
    { id: 'Solo', label: 'Solo Traveler', desc: 'Freedom & spontaneous discovery' },
    { id: 'Couple', label: 'Couple / Duo', desc: 'Scenic romantic retreats & dining' },
    { id: 'Friends', label: 'College Friends', desc: 'Action-packed adventures & split bills' },
    { id: 'Family', label: 'Family Vacation', desc: 'Comfortable pace & kid-friendly' }
  ];

  const interestOptions = [
    { id: 'Nature', label: 'Nature & Hills', emoji: '🌲' },
    { id: 'Adventure', label: 'Adventure & Treks', emoji: '🧗' },
    { id: 'Food', label: 'Food & Culinary', emoji: '🍛' },
    { id: 'Culture', label: 'Heritage & Culture', emoji: '🏛️' },
    { id: 'Beaches', label: 'Beaches & Ocean', emoji: '🏖️' },
    { id: 'Spirituality', label: 'Temples & Sacred', emoji: '🛕' },
    { id: 'Shopping', label: 'Markets & Handloom', emoji: '🛍️' },
    { id: 'Relaxation', label: 'Peace & Leisure', emoji: '💆' }
  ];

  const transportOptions = [
    { id: 'Train', label: 'Scenic Train', icon: <Train className="w-4 h-4" />, note: 'e.g. Vistadome Experience' },
    { id: 'Bus', label: 'AC / Express Bus', icon: <Bus className="w-4 h-4" />, note: 'APSRTC / TSRTC Super Luxury' },
    { id: 'Flight', label: 'Flight', icon: <Plane className="w-4 h-4" />, note: 'Fastest connecting travel' },
    { id: 'Car', label: 'Self Drive / Cab', icon: <Car className="w-4 h-4" />, note: 'Flexible road trip' }
  ];

  const stayOptions = [
    { id: 'Hostel', label: 'Backpacker Hostel / Dorm', badge: 'Student Pick' },
    { id: 'Budget Hotel', label: 'Comfort Budget Hotel', badge: 'Best Value' },
    { id: 'Homestay', label: 'Eco-Resort / Homestay', badge: 'Local Vibe' },
    { id: 'Luxury Hotel', label: 'Boutique Resort', badge: 'Premium' }
  ];

  // Calculate day count
  const startD = new Date(formData.startDate);
  const endD = new Date(formData.endDate);
  const diffDays = Math.max(1, Math.ceil(Math.abs(endD - startD) / (1000 * 60 * 60 * 24)) + 1);

  const toggleInterest = (id) => {
    setFormData(prev => {
      const exists = prev.interests.includes(id);
      if (exists) {
        if (prev.interests.length === 1) return prev; // keep at least 1
        return { ...prev, interests: prev.interests.filter(i => i !== id) };
      } else {
        return { ...prev, interests: [...prev.interests, id] };
      }
    });
  };

  const handleNextStep = () => {
    if (step === 1 && !formData.destination.trim()) {
      notify('Please specify your destination', 'error');
      return;
    }
    if (step === 2 && !formData.flexibleDates) {
      if (formData.startDate < today) {
        notify('Start date cannot be in the past', 'error');
        return;
      }
      if (formData.endDate < formData.startDate) {
        // Auto-correct end date
        const corrected = new Date(new Date(formData.startDate).getTime() + 2 * 24 * 60 * 60 * 1000)
          .toISOString().split('T')[0];
        setFormData(prev => ({ ...prev, endDate: corrected }));
        notify('End date was before start date — auto-corrected to +2 days.', 'info');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const travelTips = [
    'Analyzing Eastern Ghats train schedules & Vistadome availability...',
    'Curating authentic dining spots: Bamboo chicken & Gongura delicacies...',
    'Calculating realistic road transit times to avoid rush hours...',
    'Optimizing day-wise attractions against your budget in INR...'
  ];

  const handleGenerate = async () => {
    setLoading(true);
    const interval = setInterval(() => {
      setLoadingTipIndex(prev => (prev + 1) % travelTips.length);
    }, 1500);

    try {
      const itinerary = await api.generateItinerary({
        ...formData,
        totalDays: diffDays
      });
      clearInterval(interval);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      notify('Personalized Kizunaa Itinerary Generated Successfully!', 'success');
      onItineraryGenerated(itinerary);
    } catch (err) {
      clearInterval(interval);
      notify('Failed to generate itinerary: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title & Wizard Progress Header */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-800 border border-amber-400/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Intelligent Trip Architect</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-kizunaa-navy-950 font-['Outfit']">
          Build Your Personalized AI Travel Plan
        </h1>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          Tell Kizunaa what you love. We’ll calculate your day-wise timeline, estimate costs in INR, and craft unforgettable memories.
        </p>

        {/* Progress Stepper */}
        <div className="flex items-center justify-center gap-2 pt-6">
          {[
            { num: 1, label: 'Destination' },
            { num: 2, label: 'Dates & Group' },
            { num: 3, label: 'Budget & Style' },
            { num: 4, label: 'Summary & AI' }
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s.num
                    ? 'bg-amber-400 text-kizunaa-navy-950 shadow-glow ring-2 ring-amber-400/50'
                    : step > s.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {step > s.num ? '✓' : s.num}
              </div>
              <span className={`text-xs font-semibold hidden sm:inline ${step === s.num ? 'text-slate-900' : 'text-slate-400'}`}>
                {s.label}
              </span>
              {s.num < 4 && <div className="w-8 h-0.5 bg-slate-200" />}
            </div>
          ))}
        </div>
      </div>

      {/* Wizard Card Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-premium relative">
        
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-md rounded-3xl z-20 flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-3xl bg-amber-400 text-kizunaa-navy-950 flex items-center justify-center shadow-glow mb-6 animate-spin">
              <RefreshCw className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-kizunaa-navy-950 font-['Outfit'] mb-2">
              Synthesizing Your Perfect Kizunaa Plan...
            </h3>
            <p className="text-sm font-medium text-amber-700 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200/80 max-w-md animate-pulse">
              {travelTips[loadingTipIndex]}
            </p>
            <p className="text-xs text-slate-400 mt-4">
              Estimated duration: ~2 seconds. Connecting to travel intelligence engine.
            </p>
          </div>
        )}

        {/* STEP 1: DESTINATION & ORIGIN */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-['Outfit'] mb-1">
                Step 1: Where are you traveling from &amp; to?
              </h2>
              <p className="text-xs text-slate-500">Pick starting city and intended destination in India.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Starting / Departure City
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    placeholder="e.g. Hyderabad, Vijayawada, Bangalore"
                    className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Destination
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-amber-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g. Araku Valley, Visakhapatnam, Tirupati"
                    className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Quick Destination Pickers */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-500 mb-2">Popular Andhra &amp; Telangana Shortcuts:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { name: 'Araku Valley', state: 'AP', icon: '☕' },
                  { name: 'Visakhapatnam', state: 'AP', icon: '🌊' },
                  { name: 'Hyderabad', state: 'TG', icon: '🏰' },
                  { name: 'Gandikota', state: 'AP', icon: '🏜️' },
                  { name: 'Tirupati', state: 'AP', icon: '🛕' },
                  { name: 'Vijayawada', state: 'AP', icon: '🚤' },
                  { name: 'Warangal', state: 'TG', icon: '🏛️' },
                  { name: 'Goa', state: 'GA', icon: '🌴' },
                ].map(item => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setFormData({ ...formData, destination: item.name })}
                    className={`p-2.5 rounded-xl text-left border transition-all flex items-center justify-between text-xs ${
                      formData.destination === item.name
                        ? 'border-amber-500 bg-amber-50/80 font-bold text-amber-950 ring-1 ring-amber-500'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{item.state}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={handleNextStep}
                className="py-3 px-6 rounded-2xl bg-kizunaa-navy-950 hover:bg-kizunaa-navy-900 text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <span>Continue to Dates &amp; Group</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DATES & GROUP DETAILS */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-['Outfit'] mb-1">
                Step 2: Travel Dates &amp; Who is Going?
              </h2>
              <p className="text-xs text-slate-500">Pick your schedule and travel companions.</p>
            </div>

            {/* Date Pickers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Start Date
                </label>
                <input
                  type="date"
                  required
                  min={formData.flexibleDates ? undefined : today}
                  value={formData.startDate}
                  onChange={(e) => {
                    const newStart = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      startDate: newStart,
                      // Auto-bump end date if needed
                      endDate: prev.endDate < newStart
                        ? new Date(new Date(newStart).getTime() + 2 * 24*60*60*1000).toISOString().split('T')[0]
                        : prev.endDate
                    }));
                  }}
                  className="w-full px-3.5 py-3 rounded-2xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  End Date
                </label>
                <input
                  type="date"
                  required
                  min={formData.flexibleDates ? undefined : formData.startDate}
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3.5 py-3 rounded-2xl border border-slate-200 text-sm font-medium focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Flexible Dates Toggle */}
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, flexibleDates: !prev.flexibleDates }))}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                formData.flexibleDates
                  ? 'border-amber-400 bg-amber-50 text-amber-900'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <span className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                formData.flexibleDates ? 'bg-amber-400 border-amber-400' : 'border-slate-300'
              }`}>
                {formData.flexibleDates && <span className="text-white text-[10px] font-black">✓</span>}
              </span>
              <span>Flexible Dates — I'll confirm later (skips date validation)</span>
            </button>

            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between">
              <span>Calculated Journey Duration:</span>
              <span className="font-extrabold text-amber-950 text-sm">{diffDays} Days / {Math.max(1, diffDays - 1)} Nights</span>
            </div>

            {/* Travel Type Cards */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Travel Group Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {travelTypes.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, travelType: t.id })}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      formData.travelType === t.id
                        ? 'border-amber-500 bg-amber-50/80 font-bold text-amber-950 ring-1 ring-amber-500 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">{t.label}</span>
                      {formData.travelType === t.id && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                    </div>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Travelers Stepper – accessible, no label-misalignment issues */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Total Travelers Count
                </label>
                <span className="font-black text-sm text-amber-700">{formData.travelers} {formData.travelers === 1 ? 'Person' : 'Persons'}</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, travelers: Math.max(1, prev.travelers - 1) }))}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 font-black text-xl flex items-center justify-center transition-all active:scale-90 border border-slate-200"
                  aria-label="Decrease travelers"
                >
                  −
                </button>
                <div className="flex-1 grid grid-cols-8 gap-1">
                  {[1,2,3,4,5,6,7,8].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, travelers: n }))}
                      className={`h-9 rounded-lg text-xs font-bold transition-all ${
                        formData.travelers === n
                          ? 'bg-amber-400 text-kizunaa-navy-950 shadow-sm'
                          : n <= formData.travelers
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, travelers: Math.min(8, prev.travelers + 1) }))}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 font-black text-xl flex items-center justify-center transition-all active:scale-90 border border-slate-200"
                  aria-label="Increase travelers"
                >
                  +
                </button>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 px-12">
                <span>Solo</span>
                <span>Duo</span>
                <span>Gang</span>
                <span>Group (8)</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-5 rounded-2xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="py-3 px-6 rounded-2xl bg-kizunaa-navy-950 hover:bg-kizunaa-navy-900 text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <span>Continue to Budget &amp; Vibe</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: BUDGET & PREFERENCES */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-['Outfit'] mb-1">
                Step 3: Budget in INR &amp; Experience Preferences
              </h2>
              <p className="text-xs text-slate-500">Kizunaa ensures you never exceed your comfort ceiling.</p>
            </div>

            {/* Budget in INR with presets */}
            <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Total Estimated Budget (INR)
                  </label>
                  <p className="text-xs text-slate-400">Covers stay, food, activities &amp; local transport</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-amber-600 font-['Outfit']">
                    ₹{formData.totalBudget.toLocaleString('en-IN')}
                  </span>
                  <p className="text-[10px] text-slate-400 font-medium">
                    ~₹{Math.round(formData.totalBudget / (diffDays * formData.travelers)).toLocaleString('en-IN')} / person / day
                  </p>
                </div>
              </div>

              <input
                type="range"
                min="3000"
                max="60000"
                step="1000"
                value={formData.totalBudget}
                onChange={(e) => setFormData({ ...formData, totalBudget: parseInt(e.target.value, 10) })}
                className="w-full accent-amber-500 cursor-pointer"
              />

              {/* Budget Presets */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                {[
                  { label: 'Student / Budget', amount: 8000, desc: 'Dorms & Street Food' },
                  { label: 'Balanced Explorer', amount: 18000, desc: 'Hotels & Heritage' },
                  { label: 'Comfort & Luxury', amount: 35000, desc: 'Resorts & Cabs' }
                ].map(b => (
                  <button
                    key={b.label}
                    type="button"
                    onClick={() => setFormData({ ...formData, totalBudget: b.amount })}
                    className={`p-2.5 rounded-xl text-center border text-xs transition-all ${
                      formData.totalBudget === b.amount
                        ? 'border-amber-500 bg-amber-100/70 font-bold text-amber-950'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <span className="block font-bold">₹{b.amount.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-slate-500">{b.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interests Multi-Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                What interests you most? (Select at least 1)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {interestOptions.map(interest => {
                  const isSelected = formData.interests.includes(interest.id);
                  return (
                    <button
                      key={interest.id}
                      type="button"
                      onClick={() => toggleInterest(interest.id)}
                      className={`p-2.5 rounded-xl text-left border transition-all text-xs flex items-center gap-2 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50 font-bold text-amber-950 shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-base">{interest.emoji}</span>
                      <span>{interest.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Transport & Accommodation Preferences */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Preferred Transport
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {transportOptions.map(tr => (
                    <button
                      key={tr.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, transportPreference: tr.id })}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2 ${
                        formData.transportPreference === tr.id
                          ? 'border-amber-500 bg-amber-50 font-bold text-amber-950 ring-1 ring-amber-500'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-amber-600">{tr.icon}</span>
                      <span className="truncate">{tr.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Stay Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {stayOptions.map(st => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, stayPreference: st.id })}
                      className={`p-2 rounded-xl border text-left text-xs transition-all ${
                        formData.stayPreference === st.id
                          ? 'border-amber-500 bg-amber-50 font-bold text-amber-950 ring-1 ring-amber-500'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="block truncate font-semibold">{st.label}</span>
                      <span className="text-[10px] text-amber-700 font-bold">{st.badge}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dietary or Accessibility Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Dietary Preference
                </label>
                <select
                  value={formData.dietaryPreference}
                  onChange={(e) => setFormData({ ...formData, dietaryPreference: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-amber-500 bg-white"
                >
                  <option value="Any / Regional Cuisine">Any / Regional Cuisine (Non-veg &amp; Veg)</option>
                  <option value="Pure Vegetarian">Pure Vegetarian / South Indian Thali</option>
                  <option value="Jain Friendly">Jain Friendly / No Onion Garlic</option>
                  <option value="Halal Friendly">Halal Friendly</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Special Notes / Accessibility (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior citizen friendly, infant stroller"
                  value={formData.accessibilityNotes}
                  onChange={(e) => setFormData({ ...formData, accessibilityNotes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="py-3 px-5 rounded-2xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="py-3 px-6 rounded-2xl bg-kizunaa-navy-950 hover:bg-kizunaa-navy-900 text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <span>Review Summary</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: TRIP SUMMARY & AI GENERATION LAUNCH */}
        {step === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-['Outfit'] mb-1">
                Step 4: Review Your Trip Summary
              </h2>
              <p className="text-xs text-slate-500">
                Verify all parameters before our AI constructs your day-wise plan.
              </p>
            </div>

            <div className="bg-gradient-to-br from-kizunaa-navy-950 to-kizunaa-navy-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider">Itinerary Blueprint</span>
                  <h3 className="text-2xl font-black text-white font-['Outfit']">
                    {formData.origin} ➔ {formData.destination}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {diffDays} Days ({formData.startDate} to {formData.endDate})
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-right">
                  <span className="text-[10px] text-amber-300 uppercase font-bold block">Target Budget</span>
                  <span className="text-xl font-black text-amber-400 font-['Outfit']">
                    ₹{formData.totalBudget.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Attributes Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Group</span>
                  <span className="font-semibold text-white">{formData.travelers} Travelers ({formData.travelType})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Transport</span>
                  <span className="font-semibold text-white">{formData.transportPreference}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Stay Style</span>
                  <span className="font-semibold text-white">{formData.stayPreference}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Diet Style</span>
                  <span className="font-semibold text-white">{formData.dietaryPreference}</span>
                </div>
              </div>

              {/* Selected Interests */}
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1.5">Focus Interests</span>
                <div className="flex flex-wrap gap-1.5">
                  {formData.interests.map(i => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Disclaimer & Transparency Note */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Transparency Note:</p>
                <p className="text-amber-800 leading-relaxed mt-0.5">
                  Prices, train timings, opening hours, and travel times are estimated by Kizunaa's AI travel engine. Real-time availability should be verified before ticket confirmation.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="py-3 px-5 rounded-2xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-kizunaa-gold hover:from-amber-300 hover:to-amber-400 text-kizunaa-navy-950 font-black text-sm flex items-center gap-2 shadow-glow transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Generate Itinerary with Kizunaa AI</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
