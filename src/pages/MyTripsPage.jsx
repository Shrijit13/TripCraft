import React from 'react';
import { useTripContext } from '../context/TripContext';
import { TripCard } from '../components/TripCard';
import { BudgetSummaryCard } from '../components/BudgetSummaryCard';
import { Link } from 'react-router-dom';
import { PlusCircle, Calendar, ArrowRight, Compass } from 'lucide-react';

export const MyTripsPage = () => {
  const { myTripDestinations, removeDestinationFromTrip, budgetSummary } = useTripContext();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            My Planned Trips & Destinations
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your curated travel stops, schedule dates, and review aggregated costs.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-xs shadow-xs transition-colors self-start"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Explore More Places</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List of planned trip cards (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {myTripDestinations.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Compass className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">No Trips Scheduled Yet</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Browse through our curated destinations in the Explore tab and add them to your trip itinerary.
                </p>
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl transition-all shadow-xs"
              >
                <span>Start Exploring</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            myTripDestinations.map((destination) => (
              <TripCard
                key={destination.id}
                destination={destination}
                onRemove={removeDestinationFromTrip}
              />
            ))
          )}
        </div>

        {/* Right Column: Trip Cost Summary & Budget Meter (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <BudgetSummaryCard
            totalSpent={budgetSummary.totalSpent}
            totalBudgetLimit={budgetSummary.totalBudgetLimit}
            remaining={budgetSummary.remaining}
            spentPercentage={budgetSummary.spentPercentage}
            isOverBudget={budgetSummary.isOverBudget}
          />

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-800">Trip Actions</h3>
            <p className="text-xs text-slate-500">
              Each destination includes customized activities that you can organize day-by-day.
            </p>
            <Link
              to="/itinerary"
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Go to Activity Itinerary</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
