import React from 'react';
import PropTypes from 'prop-types';
import { Trash2, Clock, Tag } from 'lucide-react';

export const ActivityItem = ({ activity, destinationId, onRemove }) => {
  const { id, name, category, cost, duration, day } = activity;

  return (
    <div className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl p-3 flex items-center justify-between transition-colors group">
      <div className="flex-1 min-w-0 pr-3">
        <div className="flex items-center gap-2 mb-1">
          {day && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              Day {day}
            </span>
          )}
          <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
            <Tag className="w-3 h-3 text-slate-400" />
            {category}
          </span>
          {duration && (
            <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {duration}
            </span>
          )}
        </div>
        <h4 className="text-sm font-semibold text-slate-800 truncate">
          {name}
        </h4>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="text-sm font-bold text-slate-900">
          ₹{Number(cost).toLocaleString('en-IN')}
        </span>

        {/* Remove button directly triggers HOTS data consistency mechanism */}
        <button
          onClick={() => onRemove(destinationId, id)}
          title="Remove activity from Itinerary and Budget"
          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

ActivityItem.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    duration: PropTypes.string,
    day: PropTypes.number,
  }).isRequired,
  destinationId: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};
