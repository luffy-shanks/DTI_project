package com.kizunaa.travel.controller;

import com.kizunaa.travel.dto.TripPlanRequest;
import com.kizunaa.travel.model.Trip;
import com.kizunaa.travel.service.TripService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/trips")
@RequiredArgsConstructor
public class TripController {

    private final TripService tripService;

    @PostMapping("/generate")
    public ResponseEntity<Map<String, Object>> generateItinerary(@Valid @RequestBody TripPlanRequest request) {
        return ResponseEntity.ok(tripService.generateTrip(request));
    }

    @PostMapping
    public ResponseEntity<Trip> saveTrip(@RequestBody Map<String, Object> tripData, Authentication authentication) {
        String email = authentication != null ? authentication.getName() : null;
        return ResponseEntity.ok(tripService.saveTrip(tripData, email));
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getUserTrips(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(tripService.getUserTrips(authentication.getName()));
    }

    @GetMapping("/{tripId}")
    public ResponseEntity<Map<String, Object>> getTripByTripId(@PathVariable String tripId) {
        return ResponseEntity.ok(tripService.getTripByTripId(tripId));
    }

    @DeleteMapping("/{tripId}")
    public ResponseEntity<Void> deleteTrip(@PathVariable String tripId) {
        tripService.deleteTrip(tripId);
        return ResponseEntity.noContent().build();
    }
}
