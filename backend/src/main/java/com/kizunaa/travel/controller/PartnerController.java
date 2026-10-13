package com.kizunaa.travel.controller;

import com.kizunaa.travel.dto.PartnerRequest;
import com.kizunaa.travel.model.PartnerListing;
import com.kizunaa.travel.service.PartnerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/partners")
@RequiredArgsConstructor
public class PartnerController {

    private final PartnerService partnerService;

    @PostMapping("/register")
    public ResponseEntity<PartnerListing> registerPartner(@Valid @RequestBody PartnerRequest request) {
        return ResponseEntity.ok(partnerService.registerPartner(request));
    }

    @GetMapping
    public ResponseEntity<List<PartnerListing>> getAllPartners() {
        return ResponseEntity.ok(partnerService.getAllPartners());
    }
}
