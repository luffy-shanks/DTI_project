-- ==============================================================
-- Kizunaa - AI-Powered Smart Trip Planner
-- Production MySQL 8.0+ Schema Definition
-- ==============================================================

CREATE DATABASE IF NOT EXISTS kizunaadb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE kizunaadb;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO-INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(30) DEFAULT 'USER',
    travel_preferences VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Destinations Table
CREATE TABLE IF NOT EXISTS destinations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    state VARCHAR(80) NOT NULL,
    tag VARCHAR(150),
    category VARCHAR(50) NOT NULL,
    rating DOUBLE DEFAULT 4.5,
    starting_budget INT DEFAULT 4500,
    budget_range VARCHAR(50),
    best_season VARCHAR(100),
    recommended_duration VARCHAR(50),
    short_description TEXT NOT NULL,
    cover_image VARCHAR(500),
    highlights TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Trips Table (Saved Itineraries)
CREATE TABLE IF NOT EXISTS trips (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    trip_id VARCHAR(50) NOT NULL UNIQUE,
    user_id BIGINT,
    title VARCHAR(200) NOT NULL,
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    start_date VARCHAR(30) NOT NULL,
    end_date VARCHAR(30) NOT NULL,
    total_days INT NOT NULL,
    travelers INT NOT NULL,
    travel_type VARCHAR(50) NOT NULL,
    total_budget INT NOT NULL,
    transport_preference VARCHAR(50),
    stay_preference VARCHAR(50),
    dietary_preference VARCHAR(100),
    itinerary_json LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_trips_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 4. Partner Registrations Table
CREATE TABLE IF NOT EXISTS partners (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    partner_id VARCHAR(50) NOT NULL UNIQUE,
    business_name VARCHAR(150) NOT NULL,
    contact_person VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    category VARCHAR(80) NOT NULL,
    city VARCHAR(80) NOT NULL,
    state VARCHAR(80) NOT NULL,
    gst_or_license VARCHAR(100),
    description TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ticket_id VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'OPEN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
