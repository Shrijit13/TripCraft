import React from 'react';
import PropTypes from 'prop-types';
import { MapPin, Star, Plus, Check, CloudSun } from 'lucide-react';

export const DestinationCard = ({
  destination,
  isAdded,
  onToggleAdd,
  onPreviewWeather,
}) => {
  const { name, country, category, description, baseCost, rating, reviewsCount, imageUrl } = destination;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group">
      {/* Destination Image Banner */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
          {category}
        </span>

        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-semibold">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{rating}</span>
          <span className="text-slate-300 text-[10px]">({reviewsCount})</span>
        </div>

        {/* Quick Weather API Trigger Button */}
        <button
          onClick={() => onPreviewWeather(destination)}
          title="Check Live Weather API"
          className="absolute top-3 right-3 bg-slate-900/70 hover:bg-slate-900 text-white p-1.5 rounded-full backdrop-blur-xs transition-colors"
        >
          <CloudSun className="w-4 h-4 text-sky-300" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 mb-1">
            <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>{country}</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Price & Add Action */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-600 block">Est. Base Cost</span>
            <span className="text-base font-extrabold text-slate-900">
              ₹{baseCost.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={() => onToggleAdd(destination)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs ${
              isAdded
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Trip</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

DestinationCard.propTypes = {
  destination: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    baseCost: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    reviewsCount: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    coordinates: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  isAdded: PropTypes.bool.isRequired,
  onToggleAdd: PropTypes.func.isRequired,
  onPreviewWeather: PropTypes.func.isRequired,
};
