import React, { useState } from 'react';
import { Compass, Mail, Phone, MapPin, Heart, ShieldCheck, Sparkles, ArrowRight, CheckCircle2, Globe, Share2 } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-kizunaa-navy-950 text-slate-300 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Partner CTA Banner */}
        <div className="bg-gradient-to-r from-kizunaa-navy-800 to-kizunaa-navy-900 border border-amber-400/20 rounded-3xl p-8 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-3">
                <Sparkles className="w-3.5 h-3.5" /> For Tourism Businesses & Guides
              </span>
              <h3 className="text-2xl font-bold text-white font-['Outfit']">Partner with Kizunaa</h3>
              <p className="text-slate-300 text-sm max-w-xl mt-1">
                Are you a verified homestay, eco-resort, adventure operator, or certified local guide in Andhra Pradesh or Telangana? List your services for thousands of travelers.
              </p>
            </div>
            <button
              onClick={() => { onNavigate('partner'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-kizunaa-navy-950 font-bold text-sm shadow-glow transition-all flex items-center gap-2 whitespace-nowrap active:scale-95"
            >
              <span>Register Your Business</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-kizunaa-navy-950 shadow-glow">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-white font-['Outfit']">Kizunaa</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Kizunaa is India’s smart, AI-powered travel companion. We craft hyper-personalized, realistic, and budget-friendly itineraries for students, young travelers, and families with a primary focus on domestic hidden gems.
            </p>
            <p className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
              “Your Journey. Our Perfect Plan.”
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-all text-slate-300" aria-label="Social">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-amber-400 hover:text-slate-950 flex items-center justify-center transition-all text-slate-300" aria-label="Share">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 font-['Outfit'] uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-300 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('planner'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-300 transition-colors">
                  AI Trip Planner
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('destinations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-300 transition-colors">
                  Explore Destinations
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('experiences'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-300 transition-colors">
                  Stays & Local Food
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('trips'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-300 transition-colors">
                  My Saved Trips
                </button>
              </li>
            </ul>
          </div>

          {/* Featured Destinations */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 font-['Outfit'] uppercase tracking-wider">Spotlight Regions</h4>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-amber-300 transition-colors">Araku Valley (Visakhapatnam)</button></li>
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-amber-300 transition-colors">Hyderabad Nizam Heritage</button></li>
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-amber-300 transition-colors">Gandikota (Grand Canyon)</button></li>
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-amber-300 transition-colors">Tirupati & Talakona Falls</button></li>
              <li><button onClick={() => onNavigate('destinations')} className="hover:text-amber-300 transition-colors">Warangal & Laknavaram</button></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 font-['Outfit'] uppercase tracking-wider">Student Travel Alerts</h4>
            <p className="text-xs text-slate-400 mb-3">
              Get secret student discounts, IRCTC Vistadome availability alerts, and weekend trip guides.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>You're subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your student email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition-all"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-kizunaa-navy-950 font-bold text-xs transition-all shadow-sm"
                >
                  Join Free
                </button>
              </form>
            )}
            <p className="text-[10px] text-slate-500 mt-2">No spam. Unsubscribe anytime.</p>
          </div>

        </div>

        {/* Bottom Credits & Policies */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Kizunaa Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('about')} className="hover:text-slate-300 transition-colors">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => onNavigate('about')} className="hover:text-slate-300 transition-colors">Terms of Service</button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300 transition-colors">Support & Grievances</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
