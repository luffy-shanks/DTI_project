package com.kizunaa.travel.controller;

import com.kizunaa.travel.model.Destination;
import com.kizunaa.travel.service.DestinationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/destinations")
@RequiredArgsConstructor
public class DestinationController {

    private final DestinationService destinationService;

    @GetMapping
    public ResponseEntity<List<Destination>> getAllDestinations(
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String name) {
        if (name != null) {
            return destinationService.getDestinationByName(name)
                    .map(d -> ResponseEntity.ok(List.of(d)))
                    .orElseGet(() -> ResponseEntity.ok(List.of()));
        }
        if (state != null) {
            return ResponseEntity.ok(destinationService.getDestinationsByState(state));
        }
        return ResponseEntity.ok(destinationService.getAllDestinations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Destination> getDestinationById(@PathVariable Long id) {
        return destinationService.getDestinationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
