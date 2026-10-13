package com.kizunaa.travel.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "trips")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "trip_id", nullable = false, unique = true, length = 50)
    private String tripId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 100)
    private String origin;

    @Column(nullable = false, length = 100)
    private String destination;

    @Column(name = "start_date", nullable = false, length = 30)
    private String startDate;

    @Column(name = "end_date", nullable = false, length = 30)
    private String endDate;

    @Column(name = "total_days", nullable = false)
    private Integer totalDays;

    @Column(nullable = false)
    private Integer travelers;

    @Column(name = "travel_type", nullable = false, length = 50)
    private String travelType;

    @Column(name = "total_budget", nullable = false)
    private Integer totalBudget;

    @Column(name = "transport_preference", length = 50)
    private String transportPreference;

    @Column(name = "stay_preference", length = 50)
    private String stayPreference;

    @Column(name = "dietary_preference", length = 100)
    private String dietaryPreference;

    @Column(name = "itinerary_json", columnDefinition = "LONGTEXT", nullable = false)
    private String itineraryJson;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
