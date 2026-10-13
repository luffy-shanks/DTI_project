package com.kizunaa.travel.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "destinations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(nullable = false, length = 80)
    private String state;

    @Column(length = 150)
    private String tag;

    @Column(nullable = false, length = 50)
    private String category;

    @Column
    private Double rating;

    @Column(name = "starting_budget")
    private Integer startingBudget;

    @Column(name = "budget_range", length = 50)
    private String budgetRange;

    @Column(name = "best_season", length = 100)
    private String bestSeason;

    @Column(name = "recommended_duration", length = 50)
    private String recommendedDuration;

    @Column(name = "short_description", columnDefinition = "TEXT", nullable = false)
    private String shortDescription;

    @Column(name = "cover_image", length = 500)
    private String coverImage;

    @Column(columnDefinition = "TEXT")
    private String highlights; // Stored as comma or semicolon separated

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.rating == null) this.rating = 4.5;
        if (this.startingBudget == null) this.startingBudget = 5000;
    }
}
