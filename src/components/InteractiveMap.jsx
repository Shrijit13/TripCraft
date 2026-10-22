import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MapPin, Navigation, Info, ExternalLink } from 'lucide-react';

export const InteractiveMap = ({ destinations, selectedDestinations, onSelectDestination }) => {
  const [activePin, setActivePin] = useState(null);

  // Approximate relative mapping onto an interactive world map coordinate projection
  // Latitudes from -60 to 75 -> Y 0% to 100%
  // Longitudes from -140 to 160 -> X 0% to 100%
  const getCoordinatesPercent = (lat, lng) => {
    const x = ((lng + 140) / 300) * 100;
    const y = ((75 - lat) / 135) * 100;
    return {
      left: `${Math.min(Math.max(x, 5), 95)}%`,
      top: `${Math.min(Math.max(y, 10), 90)}%`,
    };
  };

  return (
    <div className="relative w-full h-80 rounded-2xl bg-gradient-to-b from-sky-100/60 to-blue-200/40 border border-slate-200 overflow-hidden shadow-inner flex flex-col justify-between p-4">
      {/* Background stylized vector landmasses illustration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
        <svg className="w-full h-full text-blue-900" viewBox="0 0 1000 500" fill="currentColor">
          {/* Stylized continent silhouettes */}
          <path d="M150,120 Q200,80 280,110 T380,180 T260,280 T140,200 Z" />
          <path d="M450,110 Q520,70 600,100 T680,160 T580,260 T460,220 Z" />
          <path d="M680,180 Q760,140 850,200 T880,320 T740,360 T670,250 Z" />
          <path d="M220,310 Q280,290 320,350 T280,440 T200,410 Z" />
          <path d="M780,360 Q840,340 890,400 T830,470 T760,420 Z" />
        </svg>
      </div>

      {/* Map Header info */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xs text-xs font-semibold text-slate-800">
          <Navigation className="w-3.5 h-3.5 text-blue-600" />
          <span>Interactive Global Explorer Map</span>
        </div>
        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] font-medium text-slate-600 shadow-xs flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
          <span>Click any destination pin to inspect</span>
        </div>
      </div>

      {/* Destination Pins plotted dynamically */}
      <div className="relative w-full h-full my-2">
        {destinations.map((dest) => {
          const isSelected = selectedDestinations.some((d) => d.id === dest.id);
          const coords = getCoordinatesPercent(dest.coordinates.lat, dest.coordinates.lng);
          const isCurrentActive = activePin?.id === dest.id;

          return (
            <div
              key={dest.id}
              style={{ left: coords.left, top: coords.top }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer"
              onClick={() => {
                setActivePin(dest);
                if (onSelectDestination) onSelectDestination(dest);
              }}
            >
              {/* Pin marker */}
              <div
                className={`relative flex items-center justify-center transition-transform hover:scale-125 ${
                  isSelected ? 'scale-110' : ''
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-white shadow-lg ${
                    isSelected
                      ? 'bg-emerald-600 ring-4 ring-emerald-300/60'
                      : 'bg-blue-600 ring-4 ring-blue-300/60'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                </div>
                {/* Micro tooltip label */}
                <div className="absolute bottom-full mb-1 hidden group-hover:flex items-center gap-1 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap shadow-md">
                  <span>{dest.name}</span>
                  <span className="text-amber-300">₹{dest.baseCost.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Active Pin Detail Popup Box */}
        {activePin && (
          <div className="absolute bottom-2 left-2 right-2 sm:right-auto sm:w-80 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200 shadow-xl z-30 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  {activePin.category}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">
                  {activePin.name}, {activePin.country}
                </h4>
              </div>
              <button
                onClick={() => setActivePin(null)}
                className="text-slate-400 hover:text-slate-700 text-xs p-1"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2">
              {activePin.description}
            </p>
            <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-sm font-extrabold text-slate-900">
                ₹{activePin.baseCost.toLocaleString('en-IN')}
              </span>
              <button
                onClick={() => onSelectDestination(activePin)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <span>View Details & Weather</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Map Footer status */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-600 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-xl">
        <span>Cartographic Engine: Leaflet / OpenStreetMap Geo-Coordinates</span>
        <span className="font-semibold text-blue-700">{destinations.length} Global Hubs Plotted</span>
      </div>
    </div>
  );
};

InteractiveMap.propTypes = {
  destinations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      baseCost: PropTypes.number.isRequired,
      coordinates: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
  selectedDestinations: PropTypes.array.isRequired,
  onSelectDestination: PropTypes.func.isRequired,
};
