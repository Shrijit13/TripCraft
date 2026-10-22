import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchDestinationWeather } from '../services/weatherApi';
import { Cloud, Wind, Thermometer, RefreshCw, CheckCircle2 } from 'lucide-react';

export const WeatherWidget = ({ destinationName, country, coordinates }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWeather = async () => {
    if (!coordinates || coordinates.lat === undefined) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDestinationWeather(coordinates.lat, coordinates.lng);
      setWeather(data);
    } catch (err) {
      setError('Unable to fetch live weather.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, [coordinates.lat, coordinates.lng]);

  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100 rounded-2xl p-4 text-slate-800 shadow-xs">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Cloud className="w-4 h-4 text-sky-600" />
          <span className="text-xs font-bold uppercase tracking-wider text-sky-900">
            Live Weather Forecast API
          </span>
        </div>
        <button
          onClick={loadWeather}
          disabled={loading}
          className="p-1 text-sky-700 hover:text-sky-900 hover:bg-sky-100 rounded-md transition-colors"
          title="Refresh weather"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="text-xs text-slate-600 mb-3">
        Destination: <strong className="text-slate-800">{destinationName}, {country}</strong>
      </div>

      {loading ? (
        <div className="py-4 flex flex-col items-center justify-center gap-2 text-xs text-sky-700">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Contacting Open-Meteo API...</span>
        </div>
      ) : error ? (
        <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
          {error}
        </div>
      ) : weather ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl" role="img" aria-label="weather-icon">
                {weather.icon}
              </span>
              <div>
                <div className="text-2xl font-black text-slate-900 flex items-center">
                  {weather.temperature}°C
                </div>
                <div className="text-xs font-medium text-slate-600">
                  {weather.condition}
                </div>
              </div>
            </div>

            <div className="text-right text-xs space-y-1">
              <div className="flex items-center justify-end gap-1 text-slate-600">
                <Wind className="w-3.5 h-3.5 text-slate-400" />
                <span>{weather.windspeed} km/h</span>
              </div>
              <div className="flex items-center justify-end gap-1 text-emerald-700 font-semibold text-[11px]">
                <CheckCircle2 className="w-3 h-3" />
                <span>{weather.isRealTime ? 'Live REST Data' : 'Cached Data'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 rounded-xl p-2 text-[11px] text-slate-600 border border-sky-100/60 flex items-center justify-between">
            <span>Coordinates:</span>
            <code className="text-sky-800 font-mono font-medium">
              {coordinates.lat.toFixed(2)}° N, {coordinates.lng.toFixed(2)}° E
            </code>
          </div>
        </div>
      ) : null}
    </div>
  );
};

WeatherWidget.propTypes = {
  destinationName: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  coordinates: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};
