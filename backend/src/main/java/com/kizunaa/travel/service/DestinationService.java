package com.kizunaa.travel.service;

import com.kizunaa.travel.model.Destination;
import com.kizunaa.travel.repository.DestinationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DestinationService {

    private final DestinationRepository destinationRepository;

    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    public Optional<Destination> getDestinationById(Long id) {
        return destinationRepository.findById(id);
    }

    public Optional<Destination> getDestinationByName(String name) {
        return destinationRepository.findByNameIgnoreCase(name);
    }

    public List<Destination> getDestinationsByState(String state) {
        return destinationRepository.findByStateIgnoreCase(state);
    }

    public Destination saveDestination(Destination destination) {
        return destinationRepository.save(destination);
    }
}
