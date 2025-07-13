#!/usr/bin/env node

/**
 * seoul_solar_time.js - True Solar Time for Seoul, South Korea
 * 
 * This program calculates the true solar time for Seoul, South Korea.
 * Seoul coordinates: 37.5665° N, 126.9780° E
 * 
 * True solar time is based on the actual position of the Sun in the sky,
 * where 12:00 represents when the Sun is at its highest point (solar noon).
 */

const Astronomy = require('./astronomy.js');

// Seoul, South Korea coordinates
const SEOUL_LATITUDE = 37.5665;   // North
const SEOUL_LONGITUDE = 126.9780; // East
const SEOUL_ELEVATION = 38;       // meters above sea level

function formatTime(hours) {
    // Convert decimal hours to HH:MM:SS.mmm format
    const totalMilliseconds = Math.round(hours * 3.6e6);
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const milliseconds = totalMilliseconds % 1000;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const displayHours = totalHours % 24;
    
    return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function calculateTrueSolarTime(date) {
    // Create observer for Seoul
    const observer = new Astronomy.Observer(SEOUL_LATITUDE, SEOUL_LONGITUDE, SEOUL_ELEVATION);
    
    // Calculate hour angle of the Sun
    const hourAngle = Astronomy.HourAngle(Astronomy.Body.Sun, date, observer);
    
    // Convert hour angle to true solar time
    // True solar time = (hour angle + 12) % 24
    // This gives us the time since solar midnight
    const solarTimeHours = (hourAngle + 12.0) % 24.0;
    
    return {
        hourAngle: hourAngle,
        solarTimeHours: solarTimeHours,
        formattedTime: formatTime(solarTimeHours)
    };
}

function getAdjustedLocalTime() {
    // 1. Get the current date
    const currentDate = new Date();
    
    // 2. Get the hour angle
    const solarTime = calculateTrueSolarTime(currentDate);
    const hourAngle = solarTime.hourAngle;
    
    // 3. Get the solarTimeHours
    const solarTimeHours = solarTime.solarTimeHours;
    
    // 4. Get the current date at 00:00 AM
    const dateAtMidnight = new Date(currentDate);
    dateAtMidnight.setHours(0, 0, 0, 0);
    
    // 5. Add the solarTimeHours to get the adjusted date object
    const adjustedDate = new Date(dateAtMidnight.getTime() + (solarTimeHours * 60 * 60 * 1000));
    
    return {
        currentDate: currentDate,
        hourAngle: hourAngle,
        solarTimeHours: solarTimeHours,
        dateAtMidnight: dateAtMidnight,
        adjustedDate: adjustedDate,
        formattedAdjustedTime: formatTime(solarTimeHours)
    };
}

function main() {
    console.log("=== True Solar Time for Seoul, South Korea ===\n");
    console.log(`Location: Seoul, South Korea`);
    console.log(`Coordinates: ${SEOUL_LATITUDE}° N, ${SEOUL_LONGITUDE}° E`);
    console.log(`Elevation: ${SEOUL_ELEVATION} meters\n`);
    
    const result = getAdjustedLocalTime();
    
    console.log("=== Results ===");
    console.log(`Current date: ${result.currentDate.toISOString()}`);
    console.log(`Hour angle: ${result.hourAngle.toFixed(4)} hours`);
    console.log(`Solar time hours: ${result.solarTimeHours.toFixed(4)} hours`);
    console.log(`Date at midnight: ${result.dateAtMidnight.toISOString()}`);
    console.log(`Adjusted date: ${result.adjustedDate.toISOString()}`);
    console.log(`Formatted adjusted time: ${result.formattedAdjustedTime}`);
}

if (require.main === module) {
    main();
}

module.exports = {
    getAdjustedLocalTime,
    calculateTrueSolarTime,
    formatTime,
    SEOUL_LATITUDE,
    SEOUL_LONGITUDE,
    SEOUL_ELEVATION
}; 