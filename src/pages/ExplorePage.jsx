import React, { useState } from 'react';
import { useTripContext } from '../context/TripContext';
import { DestinationCard } from '../components/DestinationCard';
import { InteractiveMap } from '../components/InteractiveMap';
import { BudgetSummaryCard } from '../components/BudgetSummaryCard';
import { WeatherWidget } from '../components/WeatherWidget';
import { CATEGORIES } from '../data/destinationsData';
import { Map, Grid, ArrowRight, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ExplorePage = () => {
  const {
    filteredDestinations,
    selectedCategory,
    setSelectedCategory,
    myTripDestinations,
    addDestinationToTrip,
    removeDestinationFromTrip,
    budgetSummary,
    activePreviewDestination,
    setActivePreviewDestination,
  } = useTripContext();

  const [showMapView, setShowMapView] = useState(true);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner / Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Discover & Curate Experiences</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore Dream Destinations
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Plan your trip, discover new places, analyze weather, and organize personalized itineraries.
          </p>
        </div>

        {/* View Toggle (Map vs Grid) */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start">
          <button
            onClick={() => setShowMapView(false)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              !showMapView
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Cards</span>
          </button>
          <button
            onClick={() => setShowMapView(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              showMapView
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Map + Cards</span>
          </button>
        </div>
      </div>

      {/* Category Pills matching Page 2 reference */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shadow-xs ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-blue-500/25 ring-2 ring-blue-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Main 2-Column Responsive Layout matching assignment UI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Destinations & Map (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {showMapView && (
            <InteractiveMap
              destinations={filteredDestinations}
              selectedDestinations={myTripDestinations}
              onSelectDestination={(dest) => setActivePreviewDestination(dest)}
            />
          )}

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">
                Available Destinations ({filteredDestinations.length})
              </h2>
              <span className="text-xs text-slate-500">
                Showing categories for {selectedCategory}
              </span>
            </div>

            {filteredDestinations.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
                <p className="text-base font-semibold">No destinations match your criteria.</p>
                <p className="text-xs mt-1">Try resetting the search query or selecting "All".</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredDestinations.map((dest) => {
                  const isAdded = myTripDestinations.some((d) => d.id === dest.id);
                  return (
                    <DestinationCard
                      key={dest.id}
                      destination={dest}
                      isAdded={isAdded}
                      onToggleAdd={(d) => {
                        if (isAdded) {
                          removeDestinationFromTrip(d.id);
                        } else {
                          addDestinationToTrip(d);
                        }
                      }}
                      onPreviewWeather={(d) => setActivePreviewDestination(d)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Quick Trip Sidebar & Budget Overview (4 cols) matching assignment UI */}
        <div className="lg:col-span-4 space-y-6 sticky top-20">
          {/* My Trip Quick Panel matching page 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>🧳</span> My Trip ({myTripDestinations.length})
              </h3>
              <Link
                to="/my-trips"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                View All →
              </Link>
            </div>

            {myTripDestinations.length === 0 ? (
              <div className="py-6 text-center text-slate-400 text-xs">
                No destinations added yet. Click &quot;Add to Trip&quot; on any card!
              </div>
            ) : (
              <div className="divide-y divide-slate-100 mt-2">
                {myTripDestinations.map((dest) => (
                  <div key={dest.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="min-w-0 pr-2">
                      <p className="font-bold text-slate-800 truncate">{dest.name}</p>
                      <p className="text-[11px] text-slate-400">
                        {dest.startDate || '12 Nov'} – {dest.endDate || '18 Nov 2026'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900">
                        ₹{dest.baseCost.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => removeDestinationFromTrip(dest.id)}
                        className="text-slate-300 hover:text-rose-500 p-1"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}

                <div className="pt-3 mt-1 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Total Base Cost:</span>
                  <span className="text-base font-black text-blue-700">
                    ₹{budgetSummary.destinationsBaseCost.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="pt-3">
                  <Link
                    to="/itinerary"
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md shadow-blue-500/20 transition-all"
                  >
                    <span>View Full Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Budget Overview Widget matching page 2 */}
          <BudgetSummaryCard
            totalSpent={budgetSummary.totalSpent}
            totalBudgetLimit={budgetSummary.totalBudgetLimit}
            remaining={budgetSummary.remaining}
            spentPercentage={budgetSummary.spentPercentage}
            isOverBudget={budgetSummary.isOverBudget}
          />
        </div>
      </div>

      {/* Modal: Live Weather & Geocoding API Preview */}
      {activePreviewDestination && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setActivePreviewDestination(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                Third-Party API Integration
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-2">
                {activePreviewDestination.name}, {activePreviewDestination.country}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {activePreviewDestination.description}
              </p>
            </div>

            <WeatherWidget
              destinationName={activePreviewDestination.name}
              country={activePreviewDestination.country}
              coordinates={activePreviewDestination.coordinates}
            />

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-600 block">Est. Cost</span>
                <span className="text-base font-black text-slate-900">
                  ₹{activePreviewDestination.baseCost.toLocaleString('en-IN')}
                </span>
              </div>
              <button
                onClick={() => {
                  addDestinationToTrip(activePreviewDestination);
                  setActivePreviewDestination(null);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs"
              >
                Add to My Itinerary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
