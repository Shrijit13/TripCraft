import React, { useState } from 'react';
import { useTripContext } from '../context/TripContext';
import { BudgetSummaryCard } from '../components/BudgetSummaryCard';
import { Wallet, DollarSign, PieChart, ShieldAlert, CheckCircle2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BudgetPage = () => {
  const {
    myTripDestinations,
    totalBudgetLimit,
    setTotalBudgetLimit,
    budgetSummary,
    removeActivity,
  } = useTripContext();

  const [customCapInput, setCustomCapInput] = useState(totalBudgetLimit.toString());

  const handleUpdateLimit = (e) => {
    e.preventDefault();
    const val = Number(customCapInput);
    if (!isNaN(val) && val > 0) {
      setTotalBudgetLimit(val);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Wallet className="w-4 h-4" />
            <span>Financial Manager & Cost Estimator</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Trip Budget & Expense Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage spending limits, observe category breakdowns, and audit real-time itinerary costs.
          </p>
        </div>

        {/* Budget Limit Form */}
        <form onSubmit={handleUpdateLimit} className="flex items-center gap-2 self-start">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
              ₹
            </span>
            <input
              type="number"
              min="1000"
              step="5000"
              value={customCapInput}
              onChange={(e) => setCustomCapInput(e.target.value)}
              placeholder="Total Budget Limit"
              className="pl-7 pr-3 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 w-36 shadow-xs"
            />
          </div>
          <button
            type="submit"
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            Update Cap
          </button>
        </form>
      </div>

      {/* Main Budget Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Big Breakdown & Details (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Total Spent</span>
              <span className="text-xl font-extrabold text-slate-900 mt-1 block">
                ₹{budgetSummary.totalSpent.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Across {myTripDestinations.length} destinations
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Remaining Pool</span>
              <span
                className={`text-xl font-extrabold mt-1 block ${
                  budgetSummary.remaining < 0 ? 'text-rose-600' : 'text-emerald-700'
                }`}
              >
                ₹{budgetSummary.remaining.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                {budgetSummary.remaining < 0 ? 'Over limit by deficit' : 'Available for activities'}
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Allocated Cap</span>
              <span className="text-xl font-extrabold text-blue-700 mt-1 block">
                ₹{totalBudgetLimit.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                {budgetSummary.spentPercentage}% consumed
              </span>
            </div>
          </div>

          {/* Spending by Category Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-blue-600" />
                <span>Expenditure by Category</span>
              </h3>
              <span className="text-xs text-slate-500">Live Calculated</span>
            </div>

            <div className="space-y-3">
              {Object.entries(budgetSummary.categoryBreakdown || {}).map(([category, amount]) => {
                const percent =
                  budgetSummary.totalSpent > 0
                    ? Math.round((amount / budgetSummary.totalSpent) * 100)
                    : 0;

                return (
                  <div key={category} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-700">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="font-bold text-slate-900">
                        ₹{amount.toLocaleString('en-IN')}{' '}
                        <span className="text-slate-400 font-normal">({percent}%)</span>
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Destination Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Destination Cost Distribution
            </h3>

            {myTripDestinations.length === 0 ? (
              <p className="text-xs text-slate-400">No destinations added.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {myTripDestinations.map((dest) => {
                  const actSum = (dest.activities || []).reduce(
                    (sum, a) => sum + (Number(a.cost) || 0),
                    0
                  );
                  const total = dest.baseCost + actSum;

                  return (
                    <div key={dest.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{dest.name}</h4>
                        <p className="text-slate-500">
                          Base: ₹{dest.baseCost.toLocaleString('en-IN')} + Activities ({dest.activities?.length || 0}): ₹{actSum.toLocaleString('en-IN')}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-slate-900 text-sm">
                          ₹{total.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Visual Summary Card & HOTS Info (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <BudgetSummaryCard
            totalSpent={budgetSummary.totalSpent}
            totalBudgetLimit={budgetSummary.totalBudgetLimit}
            remaining={budgetSummary.remaining}
            spentPercentage={budgetSummary.spentPercentage}
            isOverBudget={budgetSummary.isOverBudget}
          />

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Quick Navigation</h4>
            <p className="text-xs text-slate-500">
              Modify activities or scheduled events directly from your itinerary view.
            </p>
            <Link
              to="/itinerary"
              className="block w-full text-center py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Go to Itinerary →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
