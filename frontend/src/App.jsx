import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';

import Home from './pages/Home';
import TripPlanner from './pages/TripPlanner';
import ItineraryView from './pages/ItineraryView';
import Destinations from './pages/Destinations';
import Experiences from './pages/Experiences';
import MyTrips from './pages/MyTrips';
import PartnerRegister from './pages/PartnerRegister';
import About from './pages/About';
import Contact from './pages/Contact';

import { api } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentItinerary, setCurrentItinerary] = useState(null);
  const [savedTrips, setSavedTrips] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [plannerInitialData, setPlannerInitialData] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  // Load user and saved trips on initial mount
  useEffect(() => {
    const user = api.getCurrentUser();
    if (user) setCurrentUser(user);

    api.getSavedTrips().then(trips => {
      setSavedTrips(trips || []);
    });
  }, []);

  const showNotification = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => (prev.message === message ? { message: '', type: 'info' } : prev));
    }, 4000);
  };

  const handleQuickPlan = (planParams) => {
    setPlannerInitialData(planParams);
    setActiveTab('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItineraryGenerated = (itinerary) => {
    setCurrentItinerary(itinerary);
    setActiveTab('itinerary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveTrip = async (itinerary) => {
    const res = await api.saveTrip(itinerary);
    const updated = await api.getSavedTrips();
    setSavedTrips(updated);
    return res;
  };

  const handleDeleteTrip = async (tripId) => {
    await api.deleteTrip(tripId);
    const updated = await api.getSavedTrips();
    setSavedTrips(updated);
  };

  const handleViewTrip = (trip) => {
    setCurrentItinerary(trip);
    setActiveTab('itinerary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
    showNotification('Logged out successfully.', 'info');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-800">
      
      {/* Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        savedTripsCount={savedTrips.length}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <Home
            onNavigate={(tab) => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            onQuickPlan={handleQuickPlan}
          />
        )}

        {activeTab === 'planner' && (
          <TripPlanner
            initialPlanData={plannerInitialData}
            onItineraryGenerated={handleItineraryGenerated}
            notify={showNotification}
          />
        )}

        {activeTab === 'itinerary' && (
          <ItineraryView
            itinerary={currentItinerary}
            onBack={() => { setActiveTab('planner'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            onSaveTrip={handleSaveTrip}
            notify={showNotification}
            onRegenerate={() => { setActiveTab('planner'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          />
        )}

        {activeTab === 'destinations' && (
          <Destinations
            onSelectDestinationForPlan={(destinationName) => handleQuickPlan({ destination: destinationName })}
          />
        )}

        {activeTab === 'experiences' && (
          <Experiences
            onQuickPlan={handleQuickPlan}
          />
        )}

        {activeTab === 'trips' && (
          <MyTrips
            savedTrips={savedTrips}
            onViewTrip={handleViewTrip}
            onDeleteTrip={handleDeleteTrip}
            onStartNewTrip={() => { setPlannerInitialData(null); setActiveTab('planner'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            currentUser={currentUser}
            onOpenAuth={() => setAuthModalOpen(true)}
            notify={showNotification}
          />
        )}

        {activeTab === 'partner' && (
          <PartnerRegister
            notify={showNotification}
          />
        )}

        {activeTab === 'about' && (
          <About
            onNavigate={(tab) => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          />
        )}

        {activeTab === 'contact' && (
          <Contact
            notify={showNotification}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={(tab) => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      />

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(user) => setCurrentUser(user)}
        notify={showNotification}
      />

      {/* Global Animated Toast Alert */}
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'info' })}
      />

    </div>
  );
}
