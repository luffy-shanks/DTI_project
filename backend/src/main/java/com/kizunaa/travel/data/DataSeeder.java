package com.kizunaa.travel.data;

import com.kizunaa.travel.model.Destination;
import com.kizunaa.travel.model.User;
import com.kizunaa.travel.repository.DestinationRepository;
import com.kizunaa.travel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final DestinationRepository destinationRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
        seedDestinations();
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            User demoUser = User.builder()
                    .name("Aarav Sharma")
                    .email("demo@kizunaa.travel")
                    .passwordHash(passwordEncoder.encode("kizunaa2026"))
                    .role("ROLE_USER")
                    .travelPreferences("Student Explorer & Budget Adventurer")
                    .build();
            userRepository.save(demoUser);
        }
    }

    private void seedDestinations() {
        if (destinationRepository.count() == 0) {
            List<Destination> list = List.of(
                Destination.builder()
                    .name("Araku Valley")
                    .state("Andhra Pradesh")
                    .tag("Misty Eastern Ghats & Coffee Plantations")
                    .category("Hill Station")
                    .rating(4.8)
                    .startingBudget(5500)
                    .budgetRange("₹4,500 - ₹9,500")
                    .bestSeason("October to March")
                    .recommendedDuration("3 Days / 2 Nights")
                    .shortDescription("Nestled in the lush Eastern Ghats near Visakhapatnam, Araku is celebrated for its panoramic Vistadome train line, million-year-old Borra limestone caves, aromatic organic coffee, and tribal folk culture.")
                    .coverImage("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80")
                    .highlights("Vistadome Glass Train, Borra Caves, Katiki Waterfalls, Padmapuram Gardens, Bamboo Chicken")
                    .build(),

                Destination.builder()
                    .name("Visakhapatnam (Vizag)")
                    .state("Andhra Pradesh")
                    .tag("The Jewel on the Coromandel Coast")
                    .category("Coastal")
                    .rating(4.7)
                    .startingBudget(6000)
                    .budgetRange("₹5,000 - ₹12,000")
                    .bestSeason("October to March")
                    .recommendedDuration("3 Days / 2 Nights")
                    .shortDescription("Where the mountains meet the sea. Vizag features the iconic decommissioned Submarine INS Kursura, scenic Kailasagiri ropeway, golden sands of Rishikonda, and historic Buddhist sanctuaries.")
                    .coverImage("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80")
                    .highlights("INS Kursura Submarine Museum, Rishikonda Water Sports, Kailasagiri Ropeway, Yarada Beach, Thotlakonda")
                    .build(),

                Destination.builder()
                    .name("Hyderabad")
                    .state("Telangana")
                    .tag("The City of Pearls & Royal Nizams")
                    .category("Heritage")
                    .rating(4.9)
                    .startingBudget(5000)
                    .budgetRange("₹4,000 - ₹11,000")
                    .bestSeason("October to February")
                    .recommendedDuration("3 Days / 2 Nights")
                    .shortDescription("A vibrant confluence of royal Nizami history and modern high-tech culture. Famous for the four-century-old Charminar, majestic Golconda Fort sound and light show, and legendary authentic Dum Biryani.")
                    .coverImage("https://images.unsplash.com/photo-1572445271230-a78b5944a659?auto=format&fit=crop&w=1200&q=80")
                    .highlights("Charminar & Laad Bazaar, Golconda Fort, Chowmahalla Palace, Salar Jung Museum, Authentic Dum Biryani")
                    .build(),

                Destination.builder()
                    .name("Gandikota")
                    .state("Andhra Pradesh")
                    .tag("The Grand Canyon of India")
                    .category("Adventure")
                    .rating(4.8)
                    .startingBudget(4500)
                    .budgetRange("₹3,500 - ₹7,500")
                    .bestSeason("November to February")
                    .recommendedDuration("2 Days / 1 Night")
                    .shortDescription("A majestic gorge carved through the Erramala hills by river Pennar, surrounded by a 13th-century red stone fort, subterranean Belum caves, and unforgettable starlit cliffside camping.")
                    .coverImage("https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80")
                    .highlights("Pennar River Gorge View, 13th Century Fort Ramparts, Raghunatha Temple, Night Camping, Belum Caves nearby")
                    .build(),

                Destination.builder()
                    .name("Tirupati")
                    .state("Andhra Pradesh")
                    .tag("Spiritual Capital & Sacred Seshachalam Hills")
                    .category("Pilgrimage")
                    .rating(4.9)
                    .startingBudget(5500)
                    .budgetRange("₹4,500 - ₹9,000")
                    .bestSeason("September to March")
                    .recommendedDuration("2 Days / 1 Night")
                    .shortDescription("Home to the revered Sri Venkateswara Swamy Temple atop Tirumala hill. The sacred landscape is dotted with ancient waterfalls like Talakona and the historic Chandragiri Fort.")
                    .coverImage("https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80")
                    .highlights("Tirumala Balaji Darshan, Silathoranam Geological Wonder, Talakona Waterfalls, Chandragiri Fort")
                    .build(),

                Destination.builder()
                    .name("Warangal")
                    .state("Telangana")
                    .tag("Legacy of the Kakatiya Dynasty")
                    .category("Heritage")
                    .rating(4.6)
                    .startingBudget(4000)
                    .budgetRange("₹3,000 - ₹7,000")
                    .bestSeason("October to March")
                    .recommendedDuration("2 Days / 1 Night")
                    .shortDescription("Steeped in medieval architecture, Warangal features the Thousand Pillar Temple, the massive stone gateway arch of Warangal Fort, and the serene Laknavaram suspension bridge.")
                    .coverImage("https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80")
                    .highlights("Thousand Pillar Temple, Warangal Fort Stone Torana, Laknavaram Lake Rope Bridge, UNESCO Ramappa Temple")
                    .build(),

                Destination.builder()
                    .name("Vijayawada")
                    .state("Andhra Pradesh")
                    .tag("The Heart of Krishna River Valley")
                    .category("Cultural")
                    .rating(4.5)
                    .startingBudget(4200)
                    .budgetRange("₹3,500 - ₹8,000")
                    .bestSeason("October to February")
                    .recommendedDuration("2 Days / 1 Night")
                    .shortDescription("Spanned by the grand Prakasam Barrage across river Krishna, featuring the Kanaka Durga Temple on Indrakeeladri hill and 4th-century Undavalli rock-cut cave temples.")
                    .coverImage("https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80")
                    .highlights("Kanaka Durga Temple, Prakasam Barrage, Undavalli Rock Caves, Bhavani Island River Resort")
                    .build()
            );

            destinationRepository.saveAll(list);
        }
    }
}
