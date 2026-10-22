import React from 'react';
import PropTypes from 'prop-types';
import { Compass, Search, Bell, User } from 'lucide-react';

export const Navbar = ({ searchQuery, onSearchChange, userName = 'Nihaal Student', userAvatarInitial = 'R' }) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between shadow-xs">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
          <Compass className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
            Trip<span className="text-blue-600">Craft</span>
          </span>
          <span className="hidden sm:inline-block text-[11px] font-semibold text-slate-600 tracking-wide uppercase ml-2 bg-slate-100 px-2 py-0.5 rounded-full">
            Smart Travel SPA
          </span>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 max-w-md mx-6 hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search destinations, countries, activities..."
            className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2 rounded-full border border-transparent focus:border-blue-500 focus:outline-none transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Right User Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
        </button>

        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm border-2 border-blue-200">
            {userAvatarInitial}
          </div>
          <div className="hidden lg:block text-left text-xs">
            <p className="font-semibold text-slate-800 leading-tight">{userName}</p>
            <p className="text-slate-600">Travel Explorer</p>
          </div>
        </div>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  userName: PropTypes.string,
  userAvatarInitial: PropTypes.string,
};
