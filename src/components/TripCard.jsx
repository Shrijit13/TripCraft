import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, Trash2, ArrowRight, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TripCard = ({ destination, onRemove }) => {
  const { id, name, country, imageUrl, baseCost, activities = [], startDate, endDate } = destination;

  const activitiesCost = activities.reduce((sum, act) => sum + (Number(act.cost) || 0), 0);
  const totalItemCost = baseCost + activitiesCost;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row">
      <div className="sm:w-48 h-36 sm:h-auto bg-slate-100 shrink-0 relative">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {country}
        </span>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">{name}</h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                <span>
                  {startDate || '12 Nov'} – {endDate || '18 Nov 2026'}
                </span>
              </div>
            </div>

            <button
              onClick={() => onRemove(id)}
              title="Remove destination and recalculate budget"
              className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 flex items-center gap-4 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-medium">
              {activities.length} planned activit{activities.length === 1 ? 'y' : 'ies'}
            </span>
            <span className="text-slate-500">
              Base: ₹{baseCost.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-500">Total:</span>
            <span className="text-sm font-extrabold text-slate-900">
              ₹{totalItemCost.toLocaleString('en-IN')}
            </span>
          </div>

          <Link
            to="/itinerary"
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>Customize Itinerary</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

TripCard.propTypes = {
  destination: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    baseCost: PropTypes.number.isRequired,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    activities: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};
