package com.kizunaa.travel.service;

import com.kizunaa.travel.dto.PartnerRequest;
import com.kizunaa.travel.model.PartnerListing;
import com.kizunaa.travel.repository.PartnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PartnerService {

    private final PartnerRepository partnerRepository;

    public PartnerListing registerPartner(PartnerRequest request) {
        String partnerId = "KZN-PTR-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        PartnerListing partner = PartnerListing.builder()
                .partnerId(partnerId)
                .businessName(request.getBusinessName())
                .contactPerson(request.getContactPerson())
                .email(request.getEmail().toLowerCase().trim())
                .phone(request.getPhone())
                .category(request.getCategory() != null ? request.getCategory() : "Hotel / Homestay")
                .city(request.getCity() != null ? request.getCity() : "Araku Valley")
                .state(request.getState() != null ? request.getState() : "Andhra Pradesh")
                .gstOrLicense(request.getGstOrLicense())
                .description(request.getDescription())
                .isVerified(false) // Always false initially until verified
                .build();

        return partnerRepository.save(partner);
    }

    public List<PartnerListing> getAllPartners() {
        return partnerRepository.findAll();
    }
}
