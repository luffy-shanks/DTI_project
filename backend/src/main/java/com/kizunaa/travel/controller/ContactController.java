package com.kizunaa.travel.controller;

import com.kizunaa.travel.dto.ContactRequest;
import com.kizunaa.travel.model.ContactMessage;
import com.kizunaa.travel.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ContactMessage> submitContact(@Valid @RequestBody ContactRequest request) {
        return ResponseEntity.ok(contactService.saveMessage(request));
    }
}
