import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Compass, Briefcase, CalendarCheck, Wallet, Sparkles } from 'lucide-react';

export const Sidebar = ({ myTripsCount, totalCost }) => {
  const navItems = [
    { label: 'Explore', path: '/', icon: Compass },
    { label: 'My Trips', path: '/my-trips', icon: Briefcase, badge: myTripsCount },
    { label: 'Itinerary', path: '/itinerary', icon: CalendarCheck },
    { label: 'Budget', path: '/budget', icon: Wallet },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-4 shrink-0 h-[calc(100vh-65px)] sticky top-[65px]">
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600 px-3 mb-2">
            Main Navigation
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Quick Trip Snapshot card in sidebar */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-4 text-white shadow-md">
          <div className="flex items-center gap-2 text-blue-300 text-xs font-medium mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Active Trip Estimation</span>
          </div>
          <div className="text-xl font-bold tracking-tight">
            ₹{totalCost.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Across {myTripsCount} planned destination{myTripsCount === 1 ? '' : 's'}
          </p>
          <NavLink
            to="/budget"
            className="mt-3 block text-center py-1.5 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Manage Trip Budget →
          </NavLink>
        </div>
      </div>

      {/* Academic Slot & Assignment Details */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-0.5">
        <p className="font-bold text-slate-700">BCSE203E DA-X (10 Marks)</p>
        <p>Slot: L31+L32+L51+L52</p>
        <p>Faculty: Nihaal Ahmed.K</p>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  myTripsCount: PropTypes.number.isRequired,
  totalCost: PropTypes.number.isRequired,
};
