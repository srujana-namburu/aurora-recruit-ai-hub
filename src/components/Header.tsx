
import React, { useState } from 'react';
import { Search, Bell, Plus, User, Sparkles, Zap } from 'lucide-react';

interface HeaderProps {
  title: string;
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ title, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState(3);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <header className="bg-pearl-white/95 backdrop-blur-xl border-b border-soft-lavender/30 px-8 py-6 ml-80 elegant-card border-0 rounded-none shadow-none">
      <div className="flex items-center justify-between">
        <div className="animate-fade-in-up">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-elegant-gradient">{title}</h1>
            <div className="w-2 h-2 bg-warm-amber rounded-full smooth-pulse"></div>
          </div>
          <p className="text-charcoal-slate/70 mt-2 font-medium tracking-wide">Elegant AI-powered recruitment intelligence</p>
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-rich-burgundy/50 group-hover:text-rich-burgundy transition-all duration-300" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search with AI precision..."
              className="block w-96 pl-12 pr-4 py-4 border-2 border-soft-lavender/30 rounded-2xl leading-5 glass-panel placeholder-charcoal-slate/50 focus:outline-none focus:ring-2 focus:ring-rich-burgundy/30 focus:border-rich-burgundy/50 transition-all duration-300 text-charcoal-slate font-medium hover:shadow-lg elegant-shimmer"
            />
          </div>

          <button className="relative p-4 text-charcoal-slate hover:text-rich-burgundy transition-all duration-300 glass-panel rounded-2xl hover:scale-105 border-soft-lavender/30">
            <Bell size={22} className="morph-icon" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-warm-amber to-rich-burgundy text-white text-xs rounded-full h-6 w-6 flex items-center justify-center smooth-pulse font-bold">
                {notifications}
              </span>
            )}
          </button>

          <button className="minimalist-button px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-3 shadow-xl">
            <Plus size={18} className="morph-icon" />
            <span className="font-semibold">Create with AI</span>
            <Sparkles size={16} className="smooth-pulse" />
          </button>

          <button className="relative p-4 text-charcoal-slate hover:text-rich-burgundy transition-all duration-300 glass-panel rounded-2xl hover:scale-105 border-soft-lavender/30">
            <User size={22} className="morph-icon" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
