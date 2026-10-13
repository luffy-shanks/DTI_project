package com.kizunaa.travel.repository;

import com.kizunaa.travel.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
    Optional<Trip> findByTripId(String tripId);
    List<Trip> findByUserIdOrderByCreatedAtDesc(Long userId);
    void deleteByTripId(String tripId);
}
