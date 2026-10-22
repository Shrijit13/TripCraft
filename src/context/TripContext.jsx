import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { DESTINATIONS_DATA } from '../data/destinationsData';

// Create Central Context for TripCraft
const TripContext = createContext(null);

export const TripProvider = ({ children }) => {
  // Master catalog of destinations
  const [destinations] = useState(DESTINATIONS_DATA);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Currently inspected destination for quick weather/map modal
  const [activePreviewDestination, setActivePreviewDestination] = useState(null);

  // User's planned trips / selected destinations in active itinerary
  // Initialized with Bali, Manali, and Singapore to match the indicative UI specification
  const [myTripDestinations, setMyTripDestinations] = useState([
    {
      ...DESTINATIONS_DATA[0], // Bali
      startDate: '2026-11-12',
      endDate: '2026-11-18',
      activities: [...DESTINATIONS_DATA[0].defaultActivities],
    },
    {
      ...DESTINATIONS_DATA[1], // Manali
      startDate: '2026-11-20',
      endDate: '2026-11-24',
      activities: [...DESTINATIONS_DATA[1].defaultActivities],
    },
    {
      ...DESTINATIONS_DATA[4], // Singapore
      startDate: '2026-12-05',
      endDate: '2026-12-08',
      activities: [...DESTINATIONS_DATA[4].defaultActivities],
    }
  ]);

  // Overall user travel budget (defaults to ₹1,50,000 as seen in reference budget meter)
  const [totalBudgetLimit, setTotalBudgetLimit] = useState(150000);

  // HOTS CORE: Centralized mutation handler for adding a destination
  const addDestinationToTrip = useCallback((destination) => {
    setMyTripDestinations((prev) => {
      const exists = prev.some((d) => d.id === destination.id);
      if (exists) return prev; // Avoid duplicate additions

      const newTripItem = {
        ...destination,
        startDate: '2026-12-10',
        endDate: '2026-12-15',
        activities: [...(destination.defaultActivities || [])],
      };
      return [...prev, newTripItem];
    });
  }, []);

  // HOTS CORE: Centralized mutation handler for removing a destination
  const removeDestinationFromTrip = useCallback((destinationId) => {
    setMyTripDestinations((prev) => prev.filter((d) => d.id !== destinationId));
  }, []);

  // HOTS CORE: Centralized mutation handler for adding an activity to a destination
  const addActivity = useCallback((destinationId, newActivity) => {
    setMyTripDestinations((prev) =>
      prev.map((dest) => {
        if (dest.id === destinationId) {
          const activityWithId = {
            ...newActivity,
            id: `act-${Date.now()}`,
          };
          return {
            ...dest,
            activities: [...dest.activities, activityWithId],
          };
        }
        return dest;
      })
    );
  }, []);

  // =========================================================================
  // HOTS / CASE ANALYSIS KEYSTONE METHOD:
  // When an activity is removed, updating the single source of truth (myTripDestinations)
  // automatically triggers re-evaluation of useMemo for the budget calculations.
  // Both the Itinerary view and Budget view re-render simultaneously and synchronously!
  // =========================================================================
  const removeActivity = useCallback((destinationId, activityId) => {
    setMyTripDestinations((prev) =>
      prev.map((dest) => {
        if (dest.id === destinationId) {
          return {
            ...dest,
            activities: dest.activities.filter((act) => act.id !== activityId),
          };
        }
        return dest;
      })
    );
  }, []);

  // Filtered destinations list based on search and category
  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchesCategory =
        selectedCategory === 'All' || dest.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [destinations, searchQuery, selectedCategory]);

  // DERIVED STATE: Dynamic Budget Calculation using React's useMemo
  // Recalculates automatically whenever myTripDestinations or totalBudgetLimit change
  const budgetSummary = useMemo(() => {
    let destinationsBaseCost = 0;
    let activitiesCost = 0;

    const categoryBreakdown = {
      StaysAndTravel: 0,
      Sightseeing: 0,
      Adventure: 0,
      Watersports: 0,
      CultureAndArt: 0,
      CulinaryAndLeisure: 0,
      Other: 0,
    };

    myTripDestinations.forEach((dest) => {
      destinationsBaseCost += dest.baseCost;
      categoryBreakdown.StaysAndTravel += dest.baseCost;

      (dest.activities || []).forEach((act) => {
        const cost = Number(act.cost) || 0;
        activitiesCost += cost;

        const cat = act.category.toLowerCase();
        if (cat.includes('sightseeing')) categoryBreakdown.Sightseeing += cost;
        else if (cat.includes('adventure')) categoryBreakdown.Adventure += cost;
        else if (cat.includes('water')) categoryBreakdown.Watersports += cost;
        else if (cat.includes('cultur') || cat.includes('art') || cat.includes('historic') || cat.includes('museum')) {
          categoryBreakdown.CultureAndArt += cost;
        } else if (cat.includes('culinary') || cat.includes('food') || cat.includes('leisure') || cat.includes('wellness')) {
          categoryBreakdown.CulinaryAndLeisure += cost;
        } else {
          categoryBreakdown.Other += cost;
        }
      });
    });

    const totalSpent = destinationsBaseCost + activitiesCost;
    const remaining = totalBudgetLimit - totalSpent;
    const spentPercentage = totalBudgetLimit > 0 ? Math.min(Math.round((totalSpent / totalBudgetLimit) * 100), 100) : 0;

    return {
      destinationsBaseCost,
      activitiesCost,
      totalSpent,
      totalBudgetLimit,
      remaining,
      spentPercentage,
      categoryBreakdown,
      isOverBudget: totalSpent > totalBudgetLimit,
    };
  }, [myTripDestinations, totalBudgetLimit]);

  const value = {
    destinations,
    filteredDestinations,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    activePreviewDestination,
    setActivePreviewDestination,
    myTripDestinations,
    addDestinationToTrip,
    removeDestinationFromTrip,
    addActivity,
    removeActivity,
    totalBudgetLimit,
    setTotalBudgetLimit,
    budgetSummary,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

TripProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom Hook to consume TripContext safely
export const useTripContext = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTripContext must be used within a TripProvider');
  }
  return context;
};
