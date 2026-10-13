import React, { useState, lazy, Suspense } from 'react';
import { 
  Calendar, Clock, MapPin, ArrowLeft, Download, 
  Share2, Bookmark, RefreshCw, AlertCircle, Edit3, Utensils, 
  Car, Sparkles, Check, CheckCircle2,
  Map, Printer, MessageCircle, Users, CloudRain, Info,
  PieChart as PieChartIcon, Split
} from 'lucide-react';
import { api } from '../services/api';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Lazy-load Leaflet map to prevent SSR / bundle issues
const TripMap = lazy(() => import('../components/TripMap'));

const CHART_COLORS = ['#6366f1', '#f59e0b', '#10b981', '#3b82f6', '#94a3b8'];

export default function ItineraryView({ itinerary, onBack, onSaveTrip, notify, onRegenerate }) {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [editingActivity, setEditingActivity] = useState(null);
  const [currentItinerary, setCurrentItinerary] = useState(itinerary);
  const [saving, setSaving] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [budgetView, setBudgetView] = useState('total'); // 'total' | 'perPerson'
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary' | 'map' | 'budget' | 'splitbill'

  if (!currentItinerary || !currentItinerary.days || currentItinerary.days.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">No Itinerary Found</h2>
        <p className="text-sm text-slate-500 mt-2">Please return to the planner and generate an itinerary.</p>
        <button
          onClick={onBack}
          className="mt-6 px-6 py-2.5 rounded-xl bg-amber-400 font-bold text-slate-900"
        >
          Back to Planner
        </button>
      </div>
    );
  }

  const activeDay = currentItinerary.days[activeDayIndex] || currentItinerary.days[0];
  const { totalBudget, totalDays, travelers, travelType, budgetBreakdown, destination, origin, startDate } = currentItinerary;
  const numTravelers = parseInt(travelers, 10) || 1;

  // Weather warning check
  const destData = DESTINATIONS_DATA.find(d =>
    d.name.toLowerCase().includes(destination?.toLowerCase()) ||
    destination?.toLowerCase().includes(d.name?.toLowerCase())
  );
  const tripMonth = startDate ? new Date(startDate).getMonth() + 1 : null;
  const hasWeatherWarning = destData?.weatherWarning && tripMonth &&
    destData.weatherWarning.monsoonMonths.includes(tripMonth);

  // Budget chart data
  const budgetItems = [
    { label: 'Accommodation', amount: budgetBreakdown?.stay, pct: '35%', color: CHART_COLORS[0] },
    { label: 'Food & Dining', amount: budgetBreakdown?.food, pct: '25%', color: CHART_COLORS[1] },
    { label: 'Attractions', amount: budgetBreakdown?.activities, pct: '20%', color: CHART_COLORS[2] },
    { label: 'Transport', amount: budgetBreakdown?.transport, pct: '15%', color: CHART_COLORS[3] },
    { label: 'Buffer', amount: budgetBreakdown?.buffer, pct: '5%', color: CHART_COLORS[4] },
  ];

  const chartData = budgetItems.map(b => ({
    name: b.label,
    value: budgetView === 'perPerson'
      ? Math.round((b.amount || 0) / numTravelers)
      : (b.amount || 0)
  }));

  const handlePrint = () => window.print();

  const handleShareWhatsApp = () => {
    const days = currentItinerary.days.map(d =>
      `📅 Day ${d.dayNumber} (${d.dateFormatted}):\n` +
      d.activities.map(a => `  • ${a.title} — Est. ₹${a.cost}`).join('\n')
    ).join('\n\n');

    const text =
      `✈️ *Kizunaa Trip Plan*\n` +
      `🗺 *${currentItinerary.title}*\n` +
      `📍 ${origin} ➔ ${destination}\n` +
      `📅 ${currentItinerary.startDate} to ${currentItinerary.endDate} (${totalDays} Days)\n` +
      `👥 ${numTravelers} travelers · ${travelType}\n` +
      `💰 Budget: ₹${totalBudget?.toLocaleString('en-IN')}\n\n` +
      `*Day-wise Plan:*\n${days}\n\n` +
      `_Planned with Kizunaa — Your AI Travel Companion for Andhra & Telangana_`;

    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleShareLink = () => {
    const shareUrl = window.location.origin + '?trip=' + currentItinerary.tripId;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setShareCopied(true);
      notify('Itinerary link copied to clipboard!', 'success');
      setTimeout(() => setShareCopied(false), 2500);
    }).catch(() => {
      notify('Could not copy link automatically.', 'info');
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSaveTrip(currentItinerary);
      notify('Trip saved to My Trips dashboard!', 'success');
    } catch (err) {
      notify('Failed to save trip: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveActivityEdit = (e) => {
    e.preventDefault();
    if (!editingActivity) return;
    const updatedDays = [...currentItinerary.days];
    const day = updatedDays[editingActivity.dayIdx];
    day.activities[editingActivity.actIdx] = {
      ...day.activities[editingActivity.actIdx],
      title: editingActivity.title,
      description: editingActivity.description,
      location: editingActivity.location,
      foodRecommendation: editingActivity.foodRecommendation,
      cost: parseInt(editingActivity.cost, 10) || 0
    };
    setCurrentItinerary({ ...currentItinerary, days: updatedDays });
    setEditingActivity(null);
    notify('Activity updated successfully!', 'success');
  };

  const slotColors = {
    0: { border: 'border-amber-400', badge: 'bg-amber-100 text-amber-800', label: 'Morning Slot' },
    1: { border: 'border-blue-400', badge: 'bg-blue-100 text-blue-800', label: 'Afternoon Slot' },
    2: { border: 'border-indigo-400', badge: 'bg-indigo-100 text-indigo-800', label: 'Evening Slot' },
  };

  const tabs = [
    { id: 'itinerary', label: 'Day-wise Plan', icon: Calendar },
    { id: 'map', label: 'Route Map', icon: Map },
    { id: 'budget', label: 'Budget Chart', icon: PieChartIcon },
    ...(numTravelers > 1 ? [{ id: 'splitbill', label: 'Split Bill', icon: Split }] : []),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

      {/* Top Action Bar */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Modify Trip Inputs</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onRegenerate}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
            <span>Regenerate</span>
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="px-3.5 py-2 rounded-xl border border-green-300 text-green-700 bg-green-50 hover:bg-green-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleShareLink}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {shareCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{shareCopied ? 'Copied!' : 'Copy Link'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Save PDF</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-kizunaa-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            <span>{saving ? 'Saving...' : 'Save to My Trips'}</span>
          </button>
        </div>
      </div>

      {/* Banner Header */}
      <div className="itinerary-print-area">
        <div className="bg-gradient-to-r from-kizunaa-navy-950 via-kizunaa-navy-900 to-kizunaa-navy-800 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Trip ID: {currentItinerary.tripId}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] tracking-tight text-white">
                {currentItinerary.title}
              </h1>
              <p className="text-slate-300 text-sm max-w-2xl">
                Customized for <span className="font-semibold text-white">{numTravelers} Travelers</span> ({travelType}) &bull; Stay: <span className="font-semibold text-white">{currentItinerary.stayPreference}</span> &bull; Transit: <span className="font-semibold text-white">{currentItinerary.transportPreference}</span>
              </p>

              {/* Best Visit Time Badge */}
              {destData?.weatherWarning?.bestTime && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                  <Info className="w-3 h-3" />
                  Best Time: {destData.weatherWarning.bestTime}
                </span>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider block">Total Budget</span>
              <span className="text-3xl font-black text-amber-400 font-['Outfit'] block">
                ₹{totalBudget?.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-300">
                ~₹{Math.round(totalBudget / (totalDays * numTravelers)).toLocaleString('en-IN')} / person / day
              </span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Route: {origin} ➔ {destination}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Dates: {currentItinerary.startDate} to {currentItinerary.endDate} ({totalDays} Days)</span>
            </div>
          </div>
        </div>

        {/* Weather Warning Banner */}
        {hasWeatherWarning && (
          <div className="mt-4 bg-yellow-50 border border-yellow-300 rounded-2xl p-4 flex items-start gap-3 text-sm text-yellow-900">
            <CloudRain className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">⚠️ Monsoon Weather Warning</p>
              <p className="text-yellow-800 leading-relaxed mt-0.5 text-xs">{destData.weatherWarning.warningText}</p>
            </div>
          </div>
        )}

        {/* Estimates Disclaimer */}
        <div className="mt-4 bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p>
            <span className="font-bold">Estimates Notice:</span> All entry fees, restaurant prices, hotel tariffs, and transit fares are realistic local estimates for Andhra Pradesh and Telangana. Verify live availability before booking.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="no-print flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-100">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-semibold text-xs whitespace-nowrap transition-all border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-amber-400 text-amber-700 bg-amber-50'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* =================== TAB: DAY-WISE ITINERARY =================== */}
      {activeTab === 'itinerary' && (
        <div className="space-y-6">
          {/* Day Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {currentItinerary.days.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDayIndex(idx)}
                className={`px-5 py-3 rounded-2xl font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeDayIndex === idx
                    ? 'bg-kizunaa-navy-950 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span>Day {day.dayNumber}</span>
                <span className="text-[10px] font-normal opacity-75">({day.dateFormatted})</span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">{activeDay.summary}</h3>
            <span className="text-xs font-semibold text-slate-500">{activeDay.dateFormatted}</span>
          </div>

          <div className="space-y-6">
            {activeDay.activities.map((act, actIdx) => {
              const meta = slotColors[actIdx] || slotColors[0];
              return (
                <div
                  key={actIdx}
                  className={`bg-white rounded-3xl p-6 sm:p-8 border-l-4 ${meta.border} border border-slate-100 shadow-premium hover:shadow-premium-hover transition-all relative group`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${meta.badge}`}>
                          {meta.label}
                        </span>
                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{act.time}</span>
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 font-['Outfit'] mt-1">{act.title}</h4>
                      <p className="text-xs text-amber-700 font-semibold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{act.location}</span>
                      </p>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                      <span className="text-sm font-black text-emerald-600 font-['Outfit'] bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                        Est. ₹{act.cost}
                      </span>
                      <button
                        onClick={() => setEditingActivity({ ...act, dayIdx: activeDayIndex, actIdx })}
                        className="no-print p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-xs flex items-center gap-1"
                        title="Edit Activity"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline text-[11px]">Edit</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">{act.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                    {act.foodRecommendation && (
                      <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2.5">
                        <Utensils className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="block font-bold text-amber-950 text-[11px]">Culinary Recommendation:</span>
                          <span className="text-amber-900">{act.foodRecommendation}</span>
                        </div>
                      </div>
                    )}
                    {act.transportTip && (
                      <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200/60 flex items-start gap-2.5">
                        <Car className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="block font-bold text-blue-950 text-[11px]">Transport &amp; Transit Tip:</span>
                          <span className="text-blue-900">{act.transportTip}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =================== TAB: MAP =================== */}
      {activeTab === 'map' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-premium space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Map className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
                Route Map — {origin} to {destination}
              </h3>
            </div>
            <a
              href={`https://www.google.com/maps/dir/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 underline"
            >
              Open in Google Maps ↗
            </a>
          </div>

          <Suspense fallback={
            <div className="h-80 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 text-sm">
              Loading map…
            </div>
          }>
            <TripMap
              origin={origin}
              destination={destination}
              destCoords={destData?.coordinates}
              highlights={destData?.highlights}
            />
          </Suspense>

          <div className="grid grid-cols-2 gap-3 text-xs mt-2">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block font-bold uppercase text-[10px]">Departure</span>
              <span className="font-semibold text-slate-800">{origin}</span>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
              <span className="text-amber-600 block font-bold uppercase text-[10px]">Destination</span>
              <span className="font-semibold text-amber-900">{destination}</span>
            </div>
          </div>
        </div>
      )}

      {/* =================== TAB: BUDGET CHART =================== */}
      {activeTab === 'budget' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-premium space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Budget Breakdown</h3>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setBudgetView('total')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  budgetView === 'total' ? 'bg-white shadow text-slate-900' : 'text-slate-500'
                }`}
              >
                Total
              </button>
              <button
                onClick={() => setBudgetView('perPerson')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  budgetView === 'perPerson' ? 'bg-white shadow text-slate-900' : 'text-slate-500'
                }`}
              >
                Per Person
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Donut Chart */}
            <div className="w-full lg:w-1/2" style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((_, index) => (
                      <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Budget Items List */}
            <div className="w-full lg:w-1/2 space-y-3">
              {budgetItems.map((b, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: b.color }} />
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{b.label}</p>
                      <p className="text-[10px] text-slate-400">{b.pct} of total</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900 font-['Outfit']">
                      ₹{(budgetView === 'perPerson'
                        ? Math.round((b.amount || 0) / numTravelers)
                        : (b.amount || 0)
                      ).toLocaleString('en-IN')}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {budgetView === 'perPerson' ? 'per person' : `total (${numTravelers} travelers)`}
                    </p>
                  </div>
                </div>
              ))}

              {/* Total row */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 border border-amber-200 mt-2">
                <span className="text-sm font-bold text-amber-900">
                  {budgetView === 'perPerson' ? 'Your Share (Per Person)' : 'Grand Total'}
                </span>
                <span className="text-lg font-black text-amber-600 font-['Outfit']">
                  ₹{(budgetView === 'perPerson'
                    ? Math.round(totalBudget / numTravelers)
                    : totalBudget
                  ).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================== TAB: SPLIT BILL =================== */}
      {activeTab === 'splitbill' && numTravelers > 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-premium space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Split-Bill Calculator</h3>
              <p className="text-xs text-slate-500">For {numTravelers} travelers ({travelType})</p>
            </div>
          </div>

          {/* Per-person cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgetItems.map((b, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.color }} />
                  <span className="text-xs font-bold text-slate-700">{b.label}</span>
                </div>
                <div className="mt-2">
                  <p className="text-xl font-black text-slate-900 font-['Outfit']">
                    ₹{Math.round((b.amount || 0) / numTravelers).toLocaleString('en-IN')}
                    <span className="text-xs font-normal text-slate-400 ml-1">each</span>
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Total: ₹{(b.amount || 0).toLocaleString('en-IN')} ÷ {numTravelers} people
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Grand total per person */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-100 uppercase tracking-wider">Each Person Pays</p>
              <p className="text-3xl font-black font-['Outfit'] mt-1">
                ₹{Math.round(totalBudget / numTravelers).toLocaleString('en-IN')}
              </p>
              <p className="text-xs text-emerald-100 mt-0.5">
                ~₹{Math.round(totalBudget / (numTravelers * totalDays)).toLocaleString('en-IN')} per day
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-emerald-200">Group Total</p>
              <p className="text-xl font-black font-['Outfit']">
                ₹{totalBudget?.toLocaleString('en-IN')}
              </p>
              <p className="text-xs text-emerald-200">{numTravelers} travelers × {totalDays} days</p>
            </div>
          </div>

          {/* Tip */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p><span className="font-bold">Tip:</span> Share this plan on WhatsApp with your group. Each person can transfer their share via UPI before the trip. Use the buffer (₹{Math.round((budgetBreakdown?.buffer || 0) / numTravelers).toLocaleString('en-IN')} each) for unexpected expenses.</p>
          </div>
        </div>
      )}

      {/* EDIT ACTIVITY MODAL */}
      {editingActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">Customise Activity Details</h3>
            <form onSubmit={handleSaveActivityEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Activity Title</label>
                <input type="text" required value={editingActivity.title}
                  onChange={(e) => setEditingActivity({ ...editingActivity, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Location Name</label>
                <input type="text" value={editingActivity.location}
                  onChange={(e) => setEditingActivity({ ...editingActivity, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description / Notes</label>
                <textarea rows="3" value={editingActivity.description}
                  onChange={(e) => setEditingActivity({ ...editingActivity, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-amber-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Estimated Cost (INR)</label>
                  <input type="number" value={editingActivity.cost}
                    onChange={(e) => setEditingActivity({ ...editingActivity, cost: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-amber-500" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Food / Restaurant Note</label>
                  <input type="text" value={editingActivity.foodRecommendation || ''}
                    onChange={(e) => setEditingActivity({ ...editingActivity, foodRecommendation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-amber-500" />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button type="button" onClick={() => setEditingActivity(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold">
                  Cancel
                </button>
                <button type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-kizunaa-navy-950 font-bold">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
