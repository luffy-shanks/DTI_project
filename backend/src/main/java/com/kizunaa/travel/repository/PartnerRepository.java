package com.kizunaa.travel.repository;

import com.kizunaa.travel.model.PartnerListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PartnerRepository extends JpaRepository<PartnerListing, Long> {
    Optional<PartnerListing> findByPartnerId(String partnerId);
}
