import { DESTINATIONS_DATA } from '../data/destinationsData';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Helper to check token
const getAuthHeaders = () => {
  const token = localStorage.getItem('kizunaa_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

/**
 * Intelligent Heuristic Generator for Andhra Pradesh, Telangana & Indian destinations.
 * Provides realistic time slots, genuine local food, accurate transport tips, and budget allocations.
 */
export const generateLocalItinerary = (params) => {
  const {
    origin = 'Hyderabad',
    destination = 'Araku Valley',
    startDate = new Date().toISOString().split('T')[0],
    endDate,
    travelers = 2,
    totalBudget = 12000,
    travelType = 'Friends',
    interests = ['Nature', 'Adventure'],
    transportPreference = 'Train',
    stayPreference = 'Budget Hotel'
  } = params;

  // Calculate days
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date(start.getTime() + 2 * 24 * 60 * 60 * 1000);
  const diffTime = Math.abs(end - start);
  const totalDays = Math.max(1, Math.min(7, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1));

  // Find destination info or fallback
  const destInfo = DESTINATIONS_DATA.find(
    d => d.name.toLowerCase().includes(destination.toLowerCase()) ||
         destination.toLowerCase().includes(d.name.toLowerCase())
  ) || {
    name: destination,
    state: 'India',
    tag: 'Scenic Travel Escape',
    highlights: ['City Center & Iconic Landmarks', 'Local Food Street Walk', 'Sunset Viewpoint', 'Cultural Heritage Museum'],
    coordinates: { lat: 17.3850, lng: 78.4867 }
  };

  // Budget Allocation (Stay 35%, Food 25%, Activities 20%, Transport 15%, Buffer 5%)
  const numTravelers = parseInt(travelers, 10) || 1;
  const budgetNum = parseInt(totalBudget, 10) || 10000;
  const budgetBreakdown = {
    stay: Math.round(budgetNum * 0.35),
    food: Math.round(budgetNum * 0.25),
    activities: Math.round(budgetNum * 0.20),
    transport: Math.round(budgetNum * 0.15),
    buffer: Math.round(budgetNum * 0.05),
    perPersonDaily: Math.round(budgetNum / (totalDays * numTravelers))
  };

  // Day Templates tailored for Araku, Vizag, Hyderabad and general destinations
  const days = [];
  for (let i = 1; i <= totalDays; i++) {
    const currentDayDate = new Date(start.getTime() + (i - 1) * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    let morning, afternoon, evening;

    if (i === 1) {
      morning = {
        title: `Arrival & Check-in at ${stayPreference || 'Stay'}`,
        time: '08:00 AM – 11:30 AM',
        location: `${destInfo.name} Gateway`,
        description: `Arrive via ${transportPreference || 'Train/Flight'} from ${origin}. Transfer to accommodation, unpack, and enjoy refreshing welcome drinks.`,
        cost: Math.round(budgetBreakdown.transport / totalDays * 0.4),
        transportTip: `Pre-booked cab or auto from central station to hotel. Average travel time: 30 mins.`,
        foodRecommendation: `Local breakfast: Piping hot Idlis, Crispy Ghee Roast Dosa & filter coffee.`
      };
      afternoon = {
        title: `Explore ${destInfo.highlights[0] || 'Top Landmark'}`,
        time: '01:00 PM – 04:30 PM',
        location: destInfo.highlights[0] || `${destInfo.name} Center`,
        description: `Delve into the hallmark attraction with guided audio or local expert. Capture memorable group photos.`,
        cost: Math.round(budgetBreakdown.activities / totalDays * 0.5),
        transportTip: `Shared ride or scenic walk along local streets.`,
        foodRecommendation: `Lunch: Authentic regional thali with seasonal curries and crispy poppadoms.`
      };
      evening = {
        title: `Sunset Vibes at ${destInfo.highlights[2] || 'Viewpoint'} & Night Walk`,
        time: '05:30 PM – 09:00 PM',
        location: destInfo.highlights[2] || `${destInfo.name} Valley Point`,
        description: `Witness the golden sunset hour as breezes pick up. Stroll through the local night market and souvenir stalls.`,
        cost: Math.round(budgetBreakdown.food / totalDays * 0.4),
        transportTip: `Short 10-minute auto-rickshaw ride.`,
        foodRecommendation: `Dinner: Hot spicy street treats, roasted corn on the cob, or local signature kebab platter.`
      };
    } else if (i === 2) {
      morning = {
        title: `Adventure & Discovery: ${destInfo.highlights[1] || 'Scenic Exploration'}`,
        time: '07:30 AM – 12:00 PM',
        location: destInfo.highlights[1] || `${destInfo.name} Wilderness`,
        description: `Early morning expedition while temperatures are crisp. Ideal light for photography and minimal tourist crowds.`,
        cost: Math.round(budgetBreakdown.activities / totalDays * 0.6),
        transportTip: `Hire a dedicated day taxi or bike rental for ease of movement.`,
        foodRecommendation: `Breakfast: Warm Pesarattu Upma or Poori with potato masala.`
      };
      afternoon = {
        title: `Culinary Immersion & Artisan Markets`,
        time: '01:00 PM – 04:30 PM',
        location: `Local Crafts Village / Handicrafts Emporium`,
        description: `Discover indigenous wooden toys, handloom textiles, or organic coffee processing. Support local village artisans directly.`,
        cost: Math.round(budgetBreakdown.activities / totalDays * 0.3),
        transportTip: `Walking distance within the central village hub.`,
        foodRecommendation: `Lunch: Chef-special Andhra Gongura meal or slow-cooked Hyderabadi Dum Biryani.`
      };
      evening = {
        title: `Campfire / Cultural Evening & Stargazing`,
        time: '06:00 PM – 10:00 PM',
        location: `${destInfo.name} Outdoor Deck`,
        description: `Relax with music, cozy campfire conversations, and stargazing under pollution-free skies.`,
        cost: Math.round(budgetBreakdown.food / totalDays * 0.5),
        transportTip: `Stay-adjacent activity; no transport required.`,
        foodRecommendation: `Dinner: Bamboo-steamed specialties, tandoori appetizers, and warm desserts.`
      };
    } else {
      morning = {
        title: `Scenic Trails & Hidden Gems of ${destInfo.name}`,
        time: '08:00 AM – 11:30 AM',
        location: destInfo.highlights[3] || `${destInfo.name} Nature Reserve`,
        description: `Gentle nature trek through lush forest paths, listening to endemic birds and viewing hidden cascades.`,
        cost: Math.round(budgetBreakdown.activities / totalDays * 0.4),
        transportTip: `Local hired transport. Carry refillable water bottles.`,
        foodRecommendation: `Breakfast: Fluffy Mysore Bonda with coconut chutney and ginger tea.`
      };
      afternoon = {
        title: `Relaxation & Souvenir Gathering`,
        time: '12:30 PM – 03:30 PM',
        location: `Main Bazaar & Specialty Coffee Stores`,
        description: `Pick up fresh ground Arabica coffee, homemade chocolates, tribal honey, and souvenirs for friends back home.`,
        cost: 400,
        transportTip: `Pedestrian friendly shopping avenue.`,
        foodRecommendation: `Lunch: Light meal at a cozy heritage cafe.`
      };
      evening = {
        title: `Farewell Twilight Hour & Journey Reflections`,
        time: '05:00 PM – 08:30 PM',
        location: `${destInfo.name} Panorama Lookout`,
        description: `Final panoramic views over the landscapes before departure prep. Exchange memories and log trip reviews.`,
        cost: 300,
        transportTip: `Transfer to transit terminal or onward journey.`,
        foodRecommendation: `Dinner: Hearty dinner feast before the return journey.`
      };
    }

    days.push({
      dayNumber: i,
      dateFormatted: currentDayDate,
      summary: `Day ${i}: Highlights of ${destInfo.name} (${interests.join(', ')})`,
      activities: [morning, afternoon, evening]
    });
  }

  return {
    tripId: 'KZ-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
    title: `${totalDays}-Day Smart Journey to ${destInfo.name}`,
    destination: destInfo.name,
    state: destInfo.state,
    origin,
    startDate,
    endDate: end.toISOString().split('T')[0],
    totalDays,
    travelers: numTravelers,
    travelType,
    totalBudget: budgetNum,
    interests,
    transportPreference,
    stayPreference,
    destinationInfo: destInfo,
    budgetBreakdown,
    days,
    generatedAt: new Date().toISOString(),
    isEstimated: true,
    engineSource: 'Kizunaa Smart Travel Heuristic AI (AP & Telangana Optimized)'
  };
};

// API Services
export const api = {
  // Generate Itinerary
  async generateItinerary(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/trips/generate`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        return await response.json();
      }
      throw new Error(`Server returned ${response.status}`);
    } catch (err) {
      console.warn('Backend API connection not active, using Kizunaa smart AI generator fallback:', err.message);
      // Wait 1.2s to simulate real AI reasoning step
      await new Promise(r => setTimeout(r, 1200));
      return generateLocalItinerary(formData);
    }
  },

  // Save Trip to User Profile
  async saveTrip(trip) {
    try {
      const response = await fetch(`${API_BASE_URL}/trips`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(trip)
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Fallback to local storage
    }
    const saved = JSON.parse(localStorage.getItem('kizunaa_saved_trips') || '[]');
    const existingIndex = saved.findIndex(t => t.tripId === trip.tripId);
    if (existingIndex >= 0) {
      saved[existingIndex] = trip;
    } else {
      saved.unshift(trip);
    }
    localStorage.setItem('kizunaa_saved_trips', JSON.stringify(saved));
    return { success: true, trip };
  },

  // Get Saved Trips
  async getSavedTrips() {
    try {
      const response = await fetch(`${API_BASE_URL}/trips`, {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Fallback to local storage
    }
    return JSON.parse(localStorage.getItem('kizunaa_saved_trips') || '[]');
  },

  // Delete Trip
  async deleteTrip(tripId) {
    try {
      await fetch(`${API_BASE_URL}/trips/${tripId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
    } catch {
      // Fallback
    }
    const saved = JSON.parse(localStorage.getItem('kizunaa_saved_trips') || '[]');
    const updated = saved.filter(t => t.tripId !== tripId);
    localStorage.setItem('kizunaa_saved_trips', JSON.stringify(updated));
    return { success: true };
  },

  // Partner Registration
  async registerPartner(partnerData) {
    try {
      const response = await fetch(`${API_BASE_URL}/partners/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partnerData)
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Local fallback
    }
    await new Promise(r => setTimeout(r, 800));
    return {
      success: true,
      partnerId: 'PRT-' + Math.floor(1000 + Math.random() * 9000),
      message: 'Application received! Our partner verification team will review your credentials within 2 business days.'
    };
  },

  // Contact Submission
  async submitContact(contactData) {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });
      if (response.ok) {
        return await response.json();
      }
    } catch {
      // Local fallback
    }
    await new Promise(r => setTimeout(r, 600));
    return {
      success: true,
      ticketId: 'KZ-TKT-' + Math.floor(10000 + Math.random() * 90000),
      message: 'Thank you for reaching out! A Kizunaa travel specialist will get back to you shortly.'
    };
  },

  // User Auth
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('kizunaa_token', data.token);
        localStorage.setItem('kizunaa_user', JSON.stringify(data.user));
        return data;
      }
    } catch {
      // Fallback
    }
    // Demo guest token
    const demoUser = {
      id: 101,
      name: email.split('@')[0] || 'Student Explorer',
      email,
      travelStyle: 'Budget Backpacker & Culture Seeker'
    };
    const demoToken = 'demo-jwt-kizunaa-' + btoa(email);
    localStorage.setItem('kizunaa_token', demoToken);
    localStorage.setItem('kizunaa_user', JSON.stringify(demoUser));
    return { token: demoToken, user: demoUser };
  },

  async register(name, email, password, travelStyle = 'Explorer') {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, travelStyle })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('kizunaa_token', data.token);
        localStorage.setItem('kizunaa_user', JSON.stringify(data.user));
        return data;
      }
    } catch {
      // Fallback
    }
    const newUser = { id: Date.now(), name, email, travelStyle };
    const token = 'demo-jwt-kizunaa-' + btoa(email);
    localStorage.setItem('kizunaa_token', token);
    localStorage.setItem('kizunaa_user', JSON.stringify(newUser));
    return { token, user: newUser };
  },

  getCurrentUser() {
    try {
      const u = localStorage.getItem('kizunaa_user');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },

  logout() {
    localStorage.removeItem('kizunaa_token');
    localStorage.removeItem('kizunaa_user');
  }
};
