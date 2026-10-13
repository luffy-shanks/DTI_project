package com.kizunaa.travel.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kizunaa.travel.dto.TripPlanRequest;
import com.kizunaa.travel.model.Trip;
import com.kizunaa.travel.model.User;
import com.kizunaa.travel.repository.TripRepository;
import com.kizunaa.travel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class TripService {

    private final TripRepository tripRepository;
    private final UserRepository userRepository;
    private final AiItineraryService aiItineraryService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Map<String, Object> generateTrip(TripPlanRequest request) {
        return aiItineraryService.generateItinerary(request);
    }

    @Transactional
    public Trip saveTrip(Map<String, Object> tripData, String userEmail) {
        String tripId = (String) tripData.getOrDefault("tripId", "KZN-" + UUID.randomUUID().toString().substring(0, 8));
        String title = (String) tripData.getOrDefault("title", "Custom Trip");
        String origin = (String) tripData.getOrDefault("origin", "Hyderabad");
        String destination = (String) tripData.getOrDefault("destination", "Araku Valley");
        String startDate = (String) tripData.getOrDefault("startDate", "");
        String endDate = (String) tripData.getOrDefault("endDate", "");
        Integer totalDays = (Integer) tripData.getOrDefault("totalDays", 3);
        Integer travelers = (Integer) tripData.getOrDefault("travelers", 2);
        String travelType = (String) tripData.getOrDefault("travelType", "Friends");
        Integer totalBudget = (Integer) tripData.getOrDefault("totalBudget", 12000);
        String transport = (String) tripData.getOrDefault("transportPreference", "Train");
        String stay = (String) tripData.getOrDefault("stayPreference", "Budget Hotel");
        String diet = (String) tripData.getOrDefault("dietaryPreference", "Regional");

        User user = null;
        if (userEmail != null && !userEmail.isBlank()) {
            user = userRepository.findByEmail(userEmail.toLowerCase().trim()).orElse(null);
        }

        String json = "{}";
        try {
            json = objectMapper.writeValueAsString(tripData);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        Trip trip = Trip.builder()
                .tripId(tripId)
                .user(user)
                .title(title)
                .origin(origin)
                .destination(destination)
                .startDate(startDate)
                .endDate(endDate)
                .totalDays(totalDays)
                .travelers(travelers)
                .travelType(travelType)
                .totalBudget(totalBudget)
                .transportPreference(transport)
                .stayPreference(stay)
                .dietaryPreference(diet)
                .itineraryJson(json)
                .build();

        return tripRepository.save(trip);
    }

    public List<Map<String, Object>> getUserTrips(String userEmail) {
        User user = userRepository.findByEmail(userEmail.toLowerCase().trim())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Trip> trips = tripRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        List<Map<String, Object>> list = new ArrayList<>();

        for (Trip t : trips) {
            try {
                @SuppressWarnings("unchecked")
                Map<String, Object> map = objectMapper.readValue(t.getItineraryJson(), Map.class);
                map.put("id", t.getId());
                list.add(map);
            } catch (Exception e) {
                Map<String, Object> fallback = new HashMap<>();
                fallback.put("tripId", t.getTripId());
                fallback.put("title", t.getTitle());
                fallback.put("destination", t.getDestination());
                fallback.put("totalDays", t.getTotalDays());
                fallback.put("totalBudget", t.getTotalBudget());
                list.add(fallback);
            }
        }
        return list;
    }

    public Map<String, Object> getTripByTripId(String tripId) {
        Trip trip = tripRepository.findByTripId(tripId)
                .orElseThrow(() -> new IllegalArgumentException("Trip not found: " + tripId));
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> map = objectMapper.readValue(trip.getItineraryJson(), Map.class);
            return map;
        } catch (Exception e) {
            Map<String, Object> map = new HashMap<>();
            map.put("tripId", trip.getTripId());
            map.put("title", trip.getTitle());
            map.put("destination", trip.getDestination());
            return map;
        }
    }

    @Transactional
    public void deleteTrip(String tripId) {
        tripRepository.deleteByTripId(tripId);
    }
}
