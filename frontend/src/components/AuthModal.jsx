import React, { useState } from 'react';
import { X, User, Mail, Lock, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, notify }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [travelStyle, setTravelStyle] = useState('Student Budget Backpacker');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let result;
      if (isRegister) {
        if (!name.trim()) throw new Error('Please enter your full name');
        result = await api.register(name, email, password, travelStyle);
        notify('Welcome to Kizunaa! Your account has been created.', 'success');
      } else {
        result = await api.login(email, password);
        notify(`Welcome back, ${result.user.name}!`, 'success');
      }
      onAuthSuccess(result.user);
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      const result = await api.login('gowtham.explorer@kizunaa.travel', 'demoPass123');
      notify('Signed in as Demo Explorer (Student Traveler)!', 'success');
      onAuthSuccess(result.user);
      onClose();
    } catch (err) {
      setError('Demo login failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-kizunaa-navy-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-kizunaa-navy-900 to-kizunaa-navy-800 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kizunaa Travel Passport</span>
          </div>
          <h3 className="text-2xl font-bold font-['Outfit']">
            {isRegister ? 'Join Kizunaa Community' : 'Welcome Back, Explorer'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {isRegister
              ? 'Unlock AI itineraries, budget sharing, and member discounts.'
              : 'Sign in to access your saved trips and customized travel plans.'}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Quick 1-Click Demo Evaluation Button */}
          <div className="mb-5 p-3 rounded-2xl bg-amber-50 border border-amber-200/80 text-center">
            <p className="text-xs text-amber-900 font-semibold mb-2">
              Evaluating Kizunaa? Try Instant 1-Click Demo Login:
            </p>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-2 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-kizunaa-navy-950 text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Login as Demo Student Traveler</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-5">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Or use your credentials
            </span>
            <div className="border-t border-slate-200 w-full" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gowtham Kudipudi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Travel Style</label>
                <select
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all bg-white"
                >
                  <option value="Student Budget Backpacker">Student Budget Backpacker</option>
                  <option value="Couple Getaway Explorer">Couple Getaway Explorer</option>
                  <option value="Solo Adventurer">Solo Adventurer</option>
                  <option value="Family Vacationer">Family Vacationer</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl bg-kizunaa-navy-950 hover:bg-kizunaa-navy-900 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating...' : isRegister ? 'Create Account' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </form>

          {/* Toggle Tab */}
          <div className="mt-5 text-center text-xs text-slate-600">
            {isRegister ? (
              <p>
                Already have a Kizunaa account?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  className="font-bold text-amber-600 hover:text-amber-700 underline"
                >
                  Sign In here
                </button>
              </p>
            ) : (
              <p>
                New traveler?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(true)}
                  className="font-bold text-amber-600 hover:text-amber-700 underline"
                >
                  Create free account
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
