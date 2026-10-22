import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTripContext } from './context/TripContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ExplorePage } from './pages/ExplorePage';
import { MyTripsPage } from './pages/MyTripsPage';
import { ItineraryPage } from './pages/ItineraryPage';
import { BudgetPage } from './pages/BudgetPage';

export default function App() {
  const { searchQuery, setSearchQuery, myTripDestinations, budgetSummary } = useTripContext();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        userName="Nihaal Student"
        userAvatarInitial="R"
      />
      <div className="flex-1 flex">
        <Sidebar
          myTripsCount={myTripDestinations.length}
          totalCost={budgetSummary.totalSpent}
        />
        <main className="flex-1 min-w-0 overflow-y-auto">
          <Routes>
            <Route path="/" element={<ExplorePage />} />
            <Route path="/explore" element={<Navigate to="/" replace />} />
            <Route path="/my-trips" element={<MyTripsPage />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
