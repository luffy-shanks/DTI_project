package com.kizunaa.travel.repository;

import com.kizunaa.travel.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContactRepository extends JpaRepository<ContactMessage, Long> {
    Optional<ContactMessage> findByTicketId(String ticketId);
}
