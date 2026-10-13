package com.kizunaa.travel.service;

import com.kizunaa.travel.dto.ContactRequest;
import com.kizunaa.travel.model.ContactMessage;
import com.kizunaa.travel.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactMessage saveMessage(ContactRequest request) {
        String ticketId = "KZN-TCK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        ContactMessage msg = ContactMessage.builder()
                .ticketId(ticketId)
                .name(request.getName())
                .email(request.getEmail().toLowerCase().trim())
                .subject(request.getSubject() != null ? request.getSubject() : "General Inquiry")
                .message(request.getMessage())
                .status("OPEN")
                .build();

        return contactRepository.save(msg);
    }
}
