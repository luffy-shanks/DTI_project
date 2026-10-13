package com.kizunaa.travel.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripPlanRequest {
    @NotBlank(message = "Origin is required")
    private String origin;

    @NotBlank(message = "Destination is required")
    private String destination;

    private String startDate;
    private String endDate;
    private Integer totalDays;

    @NotNull(message = "Travelers count is required")
    private Integer travelers;

    private String travelType;
    private Integer totalBudget;
    private List<String> interests;
    private String transportPreference;
    private String stayPreference;
    private String dietaryPreference;
    private String accessibilityNotes;
}
