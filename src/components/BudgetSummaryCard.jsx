import React from 'react';
import PropTypes from 'prop-types';
import { TrendingUp, AlertCircle, ShieldCheck } from 'lucide-react';

export const BudgetSummaryCard = ({
  totalSpent,
  totalBudgetLimit,
  remaining,
  spentPercentage,
  isOverBudget,
}) => {
  // SVG circular meter calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(spentPercentage, 100) / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          Budget Overview
        </h3>
        <span
          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            isOverBudget
              ? 'bg-rose-100 text-rose-700'
              : 'bg-emerald-100 text-emerald-700'
          }`}
        >
          {isOverBudget ? 'Over Budget' : 'Within Budget'}
        </span>
      </div>

      <div className="flex items-center gap-5">
        {/* Circular Donut Meter matching page 2 Indicative UI */}
        <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
            {/* Background ring */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="#e2e8f0"
              strokeWidth="9"
              fill="transparent"
            />
            {/* Dynamic foreground progress ring */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke={isOverBudget ? '#f43f5e' : '#0284c7'}
              strokeWidth="9"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-lg font-extrabold text-slate-800 leading-tight">
              {spentPercentage}%
            </span>
            <span className="text-[10px] text-slate-600 font-medium uppercase">Used</span>
          </div>
        </div>

        {/* Breakdown Values */}
        <div className="flex-1 space-y-2.5">
          <div>
            <div className="flex items-center justify-between text-xs mb-0.5">
              <span className="text-slate-600 font-medium">Spent</span>
              <span className="font-extrabold text-slate-900">
                ₹{totalSpent.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isOverBudget ? 'bg-rose-500' : 'bg-sky-600'
                }`}
                style={{ width: `${Math.min(spentPercentage, 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-0.5">
              <span className="text-slate-600 font-medium">Remaining</span>
              <span
                className={`font-bold ${
                  remaining < 0 ? 'text-rose-600 font-extrabold' : 'text-emerald-700'
                }`}
              >
                ₹{remaining.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="pt-1 text-[11px] text-slate-600 border-t border-slate-100 flex items-center justify-between">
            <span>Budget Cap:</span>
            <span className="font-semibold text-slate-700">₹{totalBudgetLimit.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {isOverBudget && (
        <div className="mt-3.5 p-2 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Trip expenses exceed target budget limit!</span>
        </div>
      )}
    </div>
  );
};

BudgetSummaryCard.propTypes = {
  totalSpent: PropTypes.number.isRequired,
  totalBudgetLimit: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
  spentPercentage: PropTypes.number.isRequired,
  isOverBudget: PropTypes.bool.isRequired,
};
