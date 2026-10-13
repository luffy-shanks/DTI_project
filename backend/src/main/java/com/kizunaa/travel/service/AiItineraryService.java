package com.kizunaa.travel.service;

import com.kizunaa.travel.dto.TripPlanRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class AiItineraryService {

    public Map<String, Object> generateItinerary(TripPlanRequest request) {
        String dest = request.getDestination() != null ? request.getDestination().trim() : "Araku Valley";
        String origin = request.getOrigin() != null ? request.getOrigin().trim() : "Hyderabad";
        int days = request.getTotalDays() != null && request.getTotalDays() > 0 ? request.getTotalDays() : 3;
        int travelers = request.getTravelers() != null && request.getTravelers() > 0 ? request.getTravelers() : 2;
        int budget = request.getTotalBudget() != null && request.getTotalBudget() > 0 ? request.getTotalBudget() : 12000;
        String travelType = request.getTravelType() != null ? request.getTravelType() : "Friends";
        String transport = request.getTransportPreference() != null ? request.getTransportPreference() : "Train";
        String stay = request.getStayPreference() != null ? request.getStayPreference() : "Budget Hotel";

        String tripId = "KZN-" + Math.abs((dest + System.currentTimeMillis()).hashCode() % 90000 + 10000);

        // Budget allocation
        Map<String, Integer> breakdown = new LinkedHashMap<>();
        breakdown.put("stay", (int) (budget * 0.35));
        breakdown.put("food", (int) (budget * 0.25));
        breakdown.put("activities", (int) (budget * 0.20));
        breakdown.put("transport", (int) (budget * 0.15));
        breakdown.put("buffer", (int) (budget * 0.05));

        List<Map<String, Object>> daysList = new ArrayList<>();
        LocalDate startDate = LocalDate.now().plusDays(7);
        if (request.getStartDate() != null && !request.getStartDate().isBlank()) {
            try {
                startDate = LocalDate.parse(request.getStartDate());
            } catch (Exception ignored) {}
        }

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("EEE, dd MMM yyyy");

        for (int i = 1; i <= days; i++) {
            LocalDate dayDate = startDate.plusDays(i - 1);
            Map<String, Object> dayMap = new LinkedHashMap<>();
            dayMap.put("dayNumber", i);
            dayMap.put("dateFormatted", dayDate.format(dtf));
            dayMap.put("summary", "Day " + i + ": Exploring " + dest + " Highlights");

            List<Map<String, Object>> activities = getActivitiesForDay(dest, i, days, transport);
            dayMap.put("activities", activities);
            daysList.add(dayMap);
        }

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("tripId", tripId);
        response.put("title", days + "-Day " + dest + " Exploration Plan");
        response.put("origin", origin);
        response.put("destination", dest);
        response.put("state", getStateForDestination(dest));
        response.put("startDate", startDate.toString());
        response.put("endDate", startDate.plusDays(days - 1).toString());
        response.put("totalDays", days);
        response.put("travelers", travelers);
        response.put("travelType", travelType);
        response.put("totalBudget", budget);
        response.put("transportPreference", transport);
        response.put("stayPreference", stay);
        response.put("dietaryPreference", request.getDietaryPreference() != null ? request.getDietaryPreference() : "Regional Delicacies");
        response.put("budgetBreakdown", breakdown);
        response.put("days", daysList);

        return response;
    }

    private String getStateForDestination(String dest) {
        String lower = dest.toLowerCase();
        if (lower.contains("araku") || lower.contains("visakhapatnam") || lower.contains("vizag") ||
            lower.contains("gandikota") || lower.contains("tirupati") || lower.contains("vijayawada")) {
            return "Andhra Pradesh";
        } else if (lower.contains("hyderabad") || lower.contains("warangal")) {
            return "Telangana";
        }
        return "India";
    }

    private List<Map<String, Object>> getActivitiesForDay(String dest, int dayNum, int totalDays, String transport) {
        List<Map<String, Object>> acts = new ArrayList<>();
        String lower = dest.toLowerCase();

        if (lower.contains("araku")) {
            if (dayNum == 1) {
                acts.add(createActivity("07:00 AM - 11:30 AM", "Vistadome Glass-Coach Rail Journey",
                        "Board the iconic scenic train through 58 mountain tunnels and over 80 bridges in the Eastern Ghats.",
                        "Visakhapatnam to Araku Line", "Pack warm idli / vada breakfast on the platform",
                        "Book train #18551 Vistadome coach at least 3 weeks ahead", 320));
                acts.add(createActivity("01:30 PM - 04:30 PM", "Padmapuram Gardens & Treehouses",
                        "Stroll through historic botanical gardens planted during WWII with hanging wooden huts and toy train.",
                        "Padmapuram, Araku", "Lunch: Authentic tribal Bongu Chicken (Bamboo Chicken cooked in wild fire)",
                        "Walking distance from Araku railway junction", 150));
                acts.add(createActivity("05:30 PM - 08:00 PM", "Tribal Cultural Museum & Coffee Tasting",
                        "Discover indigenous tribal handicrafts, metal archery art, and freshly roasted organic Araku Arabica coffee.",
                        "Araku Town Center", "Dinner: Hot steamed Andhra spicy rice & Gongura pickle",
                        "Shared auto easily hailed outside the gate", 100));
            } else if (dayNum == 2) {
                acts.add(createActivity("08:00 AM - 12:30 PM", "Borra Caves Stalactites Exploration",
                        "Marvel at million-year-old subterranean karstic limestone formations naturally sculpted by the Gosthani river.",
                        "Borra Caves, Ananthagiri Hills", "Try roasted sweet corn & fresh hill guava at entrance",
                        "Hire a pre-booked local cab or APSRTC hill bus", 250));
                acts.add(createActivity("01:30 PM - 04:30 PM", "Katiki Waterfalls Trek",
                        "Adventurous off-road jeep trail through lush teak forests leading to a cascading 50-foot natural mountain pool.",
                        "Katiki Village", "Sip wild herbal ginger tea prepared by local hill tribes",
                        "Share 4x4 rugged jeep from Borra railway crossing (~₹200/person)", 200));
                acts.add(createActivity("06:00 PM - 08:30 PM", "Sunset Bonfire & Dhimsa Dance",
                        "Watch traditional Dhimsa tribal community folk dance around an evening bonfire under clear starlit skies.",
                        "Valley Campsite / Resort Lawn", "Dinner: Traditional Pappu Charu & Bamboo Biryani",
                        "Most eco-resorts host bonfires complimentary", 0));
            } else {
                acts.add(createActivity("07:00 AM - 10:30 AM", "Chaparai Water Cascades",
                        "Glide over smooth slanted river rock beds where cold mountain streams cascade into scenic shallow pools.",
                        "Chaparai, 15 km from Araku", "Breakfast: Hot Mirchi Bajji and piping filter coffee",
                        "Local auto rickshaw round-trip fare ~₹350", 80));
                acts.add(createActivity("11:30 AM - 02:30 PM", "Ananthagiri Coffee Plantations",
                        "Breathe in cool aromas walking through shaded mountain slopes covered in coffee cherries and silver oaks.",
                        "Ananthagiri Hills", "Lunch: Regional South Indian vegetarian banana leaf thali",
                        "En-route on the return downhill highway", 100));
                acts.add(createActivity("04:30 PM - 08:00 PM", "Return Downhill Scenic Highway",
                        "Descend the twisting Ghat road with panoramic sunset photography points looking over coastal plains.",
                        "Eastern Ghats Viewpoints", "Evening snack: Punugulu with spicy peanut chutney",
                        "Safe descent before twilight fog sets in", 150));
            }
        } else if (lower.contains("vizag") || lower.contains("visakhapatnam")) {
            if (dayNum == 1) {
                acts.add(createActivity("08:00 AM - 11:30 AM", "Kailasagiri Hilltop Park & Ropeway",
                        "Ride the panoramic cable car to the hilltop overlooking the turquoise Bay of Bengal coastline.",
                        "Kailasagiri, Visakhapatnam", "Breakfast: Pesarattu Upma at a coastal tiffin center",
                        "Cable car return ticket ₹120 per head", 180));
                acts.add(createActivity("02:00 PM - 05:00 PM", "INS Kursura Submarine Museum",
                        "Step inside an authentic decommissioned Soviet-built submarine preserved right on the sands of RK Beach.",
                        "Ramakrishna Beach Road", "Try fresh sea fish fry & prawn curry near harbor",
                        "Direct city bus stops right opposite the submarine", 70));
                acts.add(createActivity("05:30 PM - 08:30 PM", "RK Beach Promenade & Street Food Walk",
                        "Evening breeze walk along the paved boulevard watching local art installations and ocean waves.",
                        "RK Beach Promenade", "Dinner: Vizag special Muri Mixture & tomato bajji",
                        "Pedestrian-friendly promenade", 120));
            } else {
                acts.add(createActivity("08:30 AM - 12:30 PM", "Rishikonda Beach Water Sports",
                        "Blue Flag certified beach ideal for kayaking, speed boating, and pristine seaside morning swims.",
                        "Rishikonda, Bheemili Highway", "Coconut water & local tender palm fruit",
                        "Auto or bike rental via Beach Road (~15 km)", 350));
                acts.add(createActivity("02:00 PM - 05:00 PM", "Thotlakonda Buddhist Monastery Ruins",
                        "Explore 2,000-year-old Hinayana Buddhist ruins perched on a breezy cliff overlooking the ocean.",
                        "Thotlakonda Hill", "Lunch: Andhra spicy chicken biryani",
                        "Short cab hop from Rishikonda", 50));
                acts.add(createActivity("06:00 PM - 08:30 PM", "Dolphin’s Nose Lighthouse Sunset",
                        "View the panoramic harbor lighthouse perched 174 meters above the crashing surf.",
                        "Yarada Ridge, Vizag Port", "Dinner: Coastal prawn pulao & lemon soda",
                        "Cab recommended due to port road gradient", 150));
            }
        } else {
            // General / Hyderabad / Regional
            acts.add(createActivity("09:00 AM - 12:30 PM", "Historical Landmark & Heritage Walk",
                    "Explore key regional monuments, stone architecture, and curated archaeological galleries.",
                    dest + " Old City Center", "Regional tiffin: Crispy Dosa & Filter Kaapi",
                    "Public transit / Metro / Cab available", 150));
            acts.add(createActivity("01:30 PM - 05:00 PM", "Artisan Markets & Cultural Trails",
                    "Wander through traditional craft bazaars, handloom saree looms, and souvenir arcades.",
                    dest + " Bazaar Quarter", "Lunch: Authentic Regional Pulao & Curd Chutney",
                    "Walking friendly alleys", 200));
            acts.add(createActivity("05:30 PM - 08:30 PM", "Sunset Lake Promenade & Evening Dining",
                    "Scenic dusk views over the water followed by vibrant street food dining.",
                    dest + " Waterfront Promenade", "Dinner: Local evening specialties & dessert",
                    "Shared transport / e-rickshaws", 250));
        }

        return acts;
    }

    private Map<String, Object> createActivity(String time, String title, String desc,
                                              String location, String food, String transport, int cost) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("time", time);
        map.put("title", title);
        map.put("description", desc);
        map.put("location", location);
        map.put("foodRecommendation", food);
        map.put("transportTip", transport);
        map.put("cost", cost);
        return map;
    }
}
