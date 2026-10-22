import React, { useState } from 'react';
import { useTripContext } from '../context/TripContext';
import { ActivityItem } from '../components/ActivityItem';
import { BudgetSummaryCard } from '../components/BudgetSummaryCard';
import { Plus, Calendar, MapPin, Sparkles, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ItineraryPage = () => {
  const {
    myTripDestinations,
    addActivity,
    removeActivity,
    budgetSummary,
  } = useTripContext();

  const [selectedDestId, setSelectedDestId] = useState(
    myTripDestinations.length > 0 ? myTripDestinations[0].id : null
  );

  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivityName, setNewActivityName] = useState('');
  const [newActivityCategory, setNewActivityCategory] = useState('Sightseeing');
  const [newActivityCost, setNewActivityCost] = useState('');
  const [newActivityDuration, setNewActivityDuration] = useState('3 hrs');
  const [newActivityDay, setNewActivityDay] = useState(1);

  const activeDestination = myTripDestinations.find((d) => d.id === selectedDestId) || myTripDestinations[0];

  const handleCreateActivity = (e) => {
    e.preventDefault();
    if (!newActivityName.trim() || !newActivityCost || !activeDestination) return;

    addActivity(activeDestination.id, {
      name: newActivityName.trim(),
      category: newActivityCategory,
      cost: Number(newActivityCost),
      duration: newActivityDuration,
      day: Number(newActivityDay),
    });

    setNewActivityName('');
    setNewActivityCost('');
    setShowAddForm(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            <span>Interactive Schedule & Activities</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Personalized Travel Itinerary
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Organize daily events, add exciting adventures, and observe instant budget recalculations.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 max-w-md text-xs text-amber-900 self-start">
          <div className="flex items-center gap-1.5 font-bold mb-0.5 text-amber-950">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>HOTS Real-Time Sync Demonstrated:</span>
          </div>
          <p>
            Removing an activity below immediately updates both the itinerary schedule and the budget breakdown through React&apos;s centralized context and <code>useMemo</code> derived state.
          </p>
        </div>
      </div>

      {myTripDestinations.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
          <p className="text-base font-bold text-slate-800">Your itinerary is empty.</p>
          <p className="text-xs mt-1">Add destinations from the Explore tab to schedule activities!</p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl"
          >
            Explore Destinations
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            {/* Destination Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {myTripDestinations.map((dest) => {
                const isSelected = activeDestination?.id === dest.id;
                return (
                  <button
                    key={dest.id}
                    onClick={() => setSelectedDestId(dest.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-xs ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-blue-500/20'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{dest.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isSelected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {dest.activities?.length || 0}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Destination Activities List */}
            {activeDestination && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">
                      {activeDestination.name}, {activeDestination.country}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Base Travel & Lodging: <strong className="text-slate-800">₹{activeDestination.baseCost.toLocaleString('en-IN')}</strong>
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs self-start"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{showAddForm ? 'Cancel' : 'Add Activity'}</span>
                  </button>
                </div>

                {showAddForm && (
                  <form
                    onSubmit={handleCreateActivity}
                    className="p-4 bg-blue-50/60 rounded-xl border border-blue-200/80 space-y-3"
                  >
                    <div className="font-bold text-xs text-blue-900">
                      Add New Activity to {activeDestination.name}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Activity Title
                        </label>
                        <input
                          type="text"
                          required
                          value={newActivityName}
                          onChange={(e) => setNewActivityName(e.target.value)}
                          placeholder="e.g. Scuba Diving Expedition"
                          className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Category
                        </label>
                        <select
                          value={newActivityCategory}
                          onChange={(e) => setNewActivityCategory(e.target.value)}
                          className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        >
                          <option>Sightseeing</option>
                          <option>Adventure</option>
                          <option>Watersports</option>
                          <option>Culture</option>
                          <option>Culinary</option>
                          <option>Wellness</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Estimated Cost (₹)
                        </label>
                        <input
                          type="number"
                          required
                          min="0"
                          value={newActivityCost}
                          onChange={(e) => setNewActivityCost(e.target.value)}
                          placeholder="e.g. 3500"
                          className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Duration
                          </label>
                          <input
                            type="text"
                            value={newActivityDuration}
                            onChange={(e) => setNewActivityDuration(e.target.value)}
                            placeholder="e.g. 4 hrs"
                            className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="w-20">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Day #
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="14"
                            value={newActivityDay}
                            onChange={(e) => setNewActivityDay(e.target.value)}
                            className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="text-xs px-3 py-1.5 text-slate-600 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="text-xs font-bold px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-xs"
                      >
                        Save Activity
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-2.5">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Scheduled Activities ({activeDestination.activities?.length || 0})
                  </div>

                  {!activeDestination.activities || activeDestination.activities.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl">
                      No activities scheduled for this destination yet. Click &quot;Add Activity&quot; above!
                    </div>
                  ) : (
                    activeDestination.activities.map((act) => (
                      <ActivityItem
                        key={act.id}
                        activity={act}
                        destinationId={activeDestination.id}
                        onRemove={removeActivity}
                      />
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <BudgetSummaryCard
              totalSpent={budgetSummary.totalSpent}
              totalBudgetLimit={budgetSummary.totalBudgetLimit}
              remaining={budgetSummary.remaining}
              spentPercentage={budgetSummary.spentPercentage}
              isOverBudget={budgetSummary.isOverBudget}
            />

            {activeDestination && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-slate-800">
                  {activeDestination.name} Financial Summary
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Base Accommodations & Travel:</span>
                    <span className="font-bold text-slate-800">₹{activeDestination.baseCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Activities Subtotal ({activeDestination.activities?.length || 0}):</span>
                    <span className="font-bold text-slate-800">
                      ₹
                      {(activeDestination.activities || [])
                        .reduce((sum, a) => sum + (Number(a.cost) || 0), 0)
                        .toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex justify-between font-extrabold text-slate-900 text-sm">
                    <span>Destination Total:</span>
                    <span className="text-blue-700">
                      ₹
                      {(
                        activeDestination.baseCost +
                        (activeDestination.activities || []).reduce((sum, a) => sum + (Number(a.cost) || 0), 0)
                      ).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
