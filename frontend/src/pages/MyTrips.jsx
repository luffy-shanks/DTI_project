import React, { useState } from 'react';
import { 
  Bookmark, MapPin, Calendar, Trash2, ExternalLink, Printer, 
  Sparkles, Plus, AlertCircle, User, Compass 
} from 'lucide-react';
import { api } from '../services/api';

export default function MyTrips({ savedTrips, onViewTrip, onDeleteTrip, onStartNewTrip, currentUser, onOpenAuth, notify }) {
  const [filter, setFilter] = useState('All');

  const handleDelete = async (tripId, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this saved itinerary?')) {
      await onDeleteTrip(tripId);
      notify('Trip removed from your saved list.', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Profile & Header Summary */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-premium flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-kizunaa-navy-950 font-black text-2xl flex items-center justify-center shadow-glow">
            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'E'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-kizunaa-navy-950 font-['Outfit']">
                {currentUser?.name || 'Explorer Guest Account'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                {currentUser ? 'Verified Member' : 'Guest Mode'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentUser?.email || 'Save your plans locally or log in to sync across devices.'}
            </p>
            <p className="text-xs text-amber-700 font-semibold mt-1">
              Style: {currentUser?.travelStyle || 'Student Explorer & Budget Adventurer'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!currentUser && (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
            >
              Log In to Sync
            </button>
          )}
          <button
            onClick={onStartNewTrip}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-kizunaa-navy-950 font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Plan New Trip</span>
          </button>
        </div>
      </div>

      {/* Trips Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 font-['Outfit']">
            Your Saved Itineraries ({savedTrips.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Click on any trip card to open the interactive day-by-day plan, print, or export.
          </p>
        </div>
      </div>

      {/* Trips Grid */}
      {savedTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTrips.map((trip) => (
            <div
              key={trip.tripId}
              onClick={() => onViewTrip(trip)}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-premium hover:shadow-premium-hover transition-all duration-300 cursor-pointer flex flex-col justify-between group space-y-4 relative"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200/60">
                    {trip.tripId}
                  </span>
                  <button
                    onClick={(e) => handleDelete(trip.tripId, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete Saved Trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] group-hover:text-amber-600 transition-colors">
                    {trip.title}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{trip.origin} ➔ {trip.destination}</span>
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Duration</span>
                    <span className="font-semibold text-slate-800">{trip.totalDays} Days</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Travelers</span>
                    <span className="font-semibold text-slate-800">{trip.travelers} ({trip.travelType})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500 font-medium">Budget:</span>
                  <span className="text-base font-black text-amber-600 font-['Outfit']">
                    ₹{trip.totalBudget?.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="text-[11px] font-medium text-emerald-600">
                  {trip.days?.length || trip.totalDays} Days Planned
                </span>
                <span className="font-bold text-amber-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>View Itinerary</span>
                  <span>➔</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-premium max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
            <Compass className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">No Saved Trips Yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              Ready for your next getaway? Use the AI planner to craft your first personalized itinerary in under 60 seconds.
            </p>
          </div>
          <button
            onClick={onStartNewTrip}
            className="py-3 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-kizunaa-navy-950 font-bold text-xs shadow-sm transition-all"
          >
            Plan Your First Trip
          </button>
        </div>
      )}

    </div>
  );
}
