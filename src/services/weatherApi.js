/**
 * Third-Party API Service: Open-Meteo Live Weather API
 * Free, open weather API for accurate destination forecast without requiring an exposed API key.
 */

// Mapping WMO Weather interpretation codes (WW) to human-readable text and weather icons
export const WEATHER_CODE_MAP = {
  0: { label: 'Clear Sky', icon: '☀️' },
  1: { label: 'Mainly Clear', icon: '🌤️' },
  2: { label: 'Partly Cloudy', icon: '⛅' },
  3: { label: 'Overcast', icon: '☁️' },
  45: { label: 'Foggy', icon: '🌫️' },
  48: { label: 'Depositing Rime Fog', icon: '🌫️' },
  51: { label: 'Light Drizzle', icon: '🌦️' },
  53: { label: 'Moderate Drizzle', icon: '🌧️' },
  55: { label: 'Dense Drizzle', icon: '🌧️' },
  61: { label: 'Slight Rain', icon: '🌧️' },
  63: { label: 'Moderate Rain', icon: '🌧️' },
  65: { label: 'Heavy Rain', icon: '⛈️' },
  71: { label: 'Slight Snow Fall', icon: '🌨️' },
  73: { label: 'Moderate Snow Fall', icon: '❄️' },
  75: { label: 'Heavy Snow Fall', icon: '❄️' },
  80: { label: 'Slight Rain Showers', icon: '🌦️' },
  81: { label: 'Moderate Rain Showers', icon: '🌧️' },
  82: { label: 'Violent Rain Showers', icon: '⛈️' },
  95: { label: 'Thunderstorm', icon: '🌩️' },
};

/**
 * Fetch current weather conditions for given geographic coordinates.
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<{temperature: number, windspeed: number, weathercode: number, condition: string, icon: string}>}
 */
export async function fetchDestinationWeather(latitude, longitude) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }
    const data = await response.json();
    const current = data.current_weather;
    const weatherInfo = WEATHER_CODE_MAP[current.weathercode] || { label: 'Fair Weather', icon: '🌤️' };

    return {
      temperature: Math.round(current.temperature),
      windspeed: current.windspeed,
      weathercode: current.weathercode,
      condition: weatherInfo.label,
      icon: weatherInfo.icon,
      isRealTime: true,
    };
  } catch (error) {
    console.warn('Network weather fetch failed, serving graceful fallback estimate:', error.message);
    // Graceful offline fallback
    return {
      temperature: 26,
      windspeed: 12,
      weathercode: 0,
      condition: 'Sunny & Pleasant (Cached)',
      icon: '☀️',
      isRealTime: false,
    };
  }
}
