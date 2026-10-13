import React, { useState, useEffect } from 'react';
import {
  Compass, MapPin, Heart, Menu, X, User, LogOut,
  Sparkles, ChevronDown, Globe, Briefcase, Info, Phone
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, currentUser, onOpenAuth, onLogout, savedTripsCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);

  // Detect scroll for shrink effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest('#explore-dropdown')) setExploreOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setExploreOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Core nav items (excluding planner CTA and auth)
  const primaryNav = [
    { id: 'home', label: 'Home' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'experiences', label: 'Stays & Food' },
    { id: 'trips', label: 'My Trips', badge: savedTripsCount > 0 ? savedTripsCount : null },
  ];

  const secondaryNav = [
    { id: 'partner', label: 'Partner Portal', icon: Briefcase },
    { id: 'about', label: 'About & FAQs', icon: Info },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  const allMobileNav = [
    { id: 'home', label: 'Home', icon: Globe },
    { id: 'destinations', label: 'Explore Destinations', icon: MapPin },
    { id: 'experiences', label: 'Stays & Food', icon: Heart },
    { id: 'trips', label: 'My Trips', badge: savedTripsCount > 0 ? savedTripsCount : null, icon: Heart },
    { id: 'planner', label: 'Plan a Trip', icon: Sparkles, highlight: true },
    { id: 'partner', label: 'Partner Portal', icon: Briefcase },
    { id: 'about', label: 'About & FAQs', icon: Info },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <header
      className={`sticky top-0 z-50 text-white transition-all duration-300 ${
        scrolled
          ? 'bg-[#060f1e]/95 backdrop-blur-xl shadow-2xl border-b border-white/5'
          : 'bg-kizunaa-navy-950/90 backdrop-blur-md border-b border-white/10 shadow-lg'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-[72px]'}`}>

          {/* ── Brand Logo ── */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none flex-shrink-0"
          >
            <div className={`rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center shadow-[0_0_18px_rgba(251,191,36,0.45)] text-kizunaa-navy-950 group-hover:scale-105 group-hover:shadow-[0_0_28px_rgba(251,191,36,0.65)] transition-all duration-300 ${scrolled ? 'w-9 h-9' : 'w-10 h-10'}`}>
              <Compass className={`transition-all duration-300 ${scrolled ? 'w-5 h-5' : 'w-[22px] h-[22px]'}`} />
            </div>
            <div className="leading-none">
              <div className="flex items-center gap-1.5">
                <span className={`font-black tracking-tight text-white font-['Outfit'] transition-all duration-300 ${scrolled ? 'text-xl' : 'text-[22px]'}`}>
                  Kizunaa
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 tracking-wide">
                  AI
                </span>
              </div>
              {!scrolled && (
                <p className="text-[10px] tracking-widest uppercase text-amber-200/60 font-medium mt-0.5">
                  Your Journey. Our Perfect Plan.
                </p>
              )}
            </div>
          </button>

          {/* ── Desktop Nav (lg+) ── */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary Navigation">

            {/* Primary links */}
            {primaryNav.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-[13.5px] font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-amber-400 bg-amber-400/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/6'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-amber-400" />
                  )}
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 leading-none">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* More dropdown */}
            <div id="explore-dropdown" className="relative">
              <button
                onClick={() => setExploreOpen(!exploreOpen)}
                className={`relative px-3.5 py-2 rounded-xl text-[13.5px] font-medium transition-all duration-200 flex items-center gap-1 ${
                  exploreOpen || secondaryNav.some(n => n.id === activeTab)
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/6'
                }`}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${exploreOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown menu */}
              {exploreOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-[#0a1628]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
                  {secondaryNav.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full text-left flex items-center gap-3 px-4 py-3 text-[13px] font-medium transition-colors ${
                          isActive
                            ? 'bg-amber-400/10 text-amber-300'
                            : 'text-slate-300 hover:bg-white/6 hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4 opacity-70 flex-shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* ── Right Side: CTA + Auth ── */}
          <div className="flex items-center gap-2.5">

            {/* Plan a Trip CTA – desktop */}
            <button
              onClick={() => handleNavClick('planner')}
              className={`hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13.5px] font-bold text-kizunaa-navy-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 shadow-[0_0_16px_rgba(251,191,36,0.3)] hover:shadow-[0_0_24px_rgba(251,191,36,0.55)] transition-all duration-200 active:scale-95 ${
                activeTab === 'planner' ? 'ring-2 ring-amber-400/60 ring-offset-1 ring-offset-transparent' : ''
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Plan a Trip</span>
            </button>

            {/* Auth section */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-white/8 border border-white/10 rounded-2xl pl-1.5 pr-2.5 py-1.5">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-kizunaa-navy-950 font-black flex items-center justify-center text-xs shadow">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="hidden md:block text-left leading-tight">
                  <p className="font-semibold text-white text-[12px] truncate max-w-[90px]">{currentUser.name}</p>
                  <p className="text-[10px] text-amber-300/70">Explorer</p>
                </div>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-0.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-semibold border border-white/15 hover:border-amber-400/50 hover:bg-white/6 text-slate-200 hover:text-white transition-all duration-200"
              >
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/8 hover:bg-white/15 text-white transition-colors border border-white/10"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-[#07111f] border-t border-white/8 px-4 pt-4 pb-6 space-y-1.5">

          {allMobileNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            if (item.highlight) {
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl mt-2 text-sm font-bold text-kizunaa-navy-950 bg-gradient-to-r from-amber-400 to-yellow-300 shadow-[0_0_20px_rgba(251,191,36,0.3)] active:scale-95 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-400/12 text-amber-300 border border-amber-400/20'
                    : 'text-slate-300 hover:bg-white/6 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-amber-400' : 'opacity-60'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-slate-900">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Mobile Login inline */}
          {!currentUser && (
            <button
              onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 mt-1 rounded-xl text-sm font-semibold border border-white/15 text-slate-200 hover:bg-white/6 transition-colors"
            >
              <User className="w-4 h-4 text-amber-400" />
              <span>Login / Register</span>
            </button>
          )}
          {currentUser && (
            <button
              onClick={() => { onLogout(); setMobileMenuOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 mt-1 rounded-xl text-sm font-semibold border border-white/10 text-red-400 hover:bg-red-400/6 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out ({currentUser.name})</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
