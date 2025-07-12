const Astronomy = require('./astronomy');

const SOLAR_TERMS = [
    { name: 'Lichun (立春)', nameEn: 'Beginning of Spring', longitude: 315, season: 'Spring' },
    { name: 'Yushui (雨水)', nameEn: 'Rain Water', longitude: 330, season: 'Spring' },
    { name: 'Jingzhe (惊蛰)', nameEn: 'Awakening of Insects', longitude: 345, season: 'Spring' },
    { name: 'Chunfen (春分)', nameEn: 'Spring Equinox', longitude: 0, season: 'Spring' },
    { name: 'Qingming (清明)', nameEn: 'Clear and Bright', longitude: 15, season: 'Spring' },
    { name: 'Guyu (谷雨)', nameEn: 'Grain Rain', longitude: 30, season: 'Spring' },
    { name: 'Lixia (立夏)', nameEn: 'Beginning of Summer', longitude: 45, season: 'Summer' },
    { name: 'Xiaoman (小满)', nameEn: 'Grain Buds', longitude: 60, season: 'Summer' },
    { name: 'Mangzhong (芒种)', nameEn: 'Grain in Ear', longitude: 75, season: 'Summer' },
    { name: 'Xiazhi (夏至)', nameEn: 'Summer Solstice', longitude: 90, season: 'Summer' },
    { name: 'Xiaoshu (小暑)', nameEn: 'Slight Heat', longitude: 105, season: 'Summer' },
    { name: 'Dashu (大暑)', nameEn: 'Great Heat', longitude: 120, season: 'Summer' },
    { name: 'Liqiu (立秋)', nameEn: 'Beginning of Autumn', longitude: 135, season: 'Autumn' },
    { name: 'Chushu (处暑)', nameEn: 'Stopping the Heat', longitude: 150, season: 'Autumn' },
    { name: 'Bailu (白露)', nameEn: 'White Dew', longitude: 165, season: 'Autumn' },
    { name: 'Qiufen (秋分)', nameEn: 'Autumn Equinox', longitude: 180, season: 'Autumn' },
    { name: 'Hanlu (寒露)', nameEn: 'Cold Dew', longitude: 195, season: 'Autumn' },
    { name: 'Shuangjiang (霜降)', nameEn: 'Frost\'s Descent', longitude: 210, season: 'Autumn' },
    { name: 'Lidong (立冬)', nameEn: 'Beginning of Winter', longitude: 225, season: 'Winter' },
    { name: 'Xiaoxue (小雪)', nameEn: 'Slight Snow', longitude: 240, season: 'Winter' },
    { name: 'Daxue (大雪)', nameEn: 'Great Snow', longitude: 255, season: 'Winter' },
    { name: 'Dongzhi (冬至)', nameEn: 'Winter Solstice', longitude: 270, season: 'Winter' },
    { name: 'Xiaohan (小寒)', nameEn: 'Slight Cold', longitude: 285, season: 'Winter' },
    { name: 'Dahan (大寒)', nameEn: 'Great Cold', longitude: 300, season: 'Winter' }
];

function calculateSolarTerm(longitude, year) {
    // Create search start date (January 1st of the given year)
    const searchStart = new Date(year, 0, 1); // Month is 0-indexed
    const searchDays = 450; // Search for 366 days
    
    // First attempt: search within the target year
    try {
        const astroTime = Astronomy.SearchSunLongitude(longitude, searchStart, searchDays);
        // Only return if the result is in the target year
        if (astroTime && astroTime.date.getFullYear() === year) {
            return astroTime;
        }
        return astroTime;
    } catch (error) {
        console.error('Error searching for solar term:', error);
    }
    
    return null; // No solar term found in the target year
}

module.exports = { SOLAR_TERMS, calculateSolarTerm };
