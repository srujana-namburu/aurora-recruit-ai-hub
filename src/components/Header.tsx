
import React, { useState } from 'react';
import { Search, Bell, Plus, Filter, Sparkles, Zap, User } from 'lucide-react';

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
    <header className="bg-snow-white/95 backdrop-blur-xl border-b border-electric-purple/10 px-8 py-6 ml-72 glass-card">
      <div className="flex items-center justify-between">
        <div className="animate-fade-in">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-gradient">{title}</h1>
            <Sparkles className="ml-3 h-6 w-6 text-electric-purple animate-bounce-gentle" />
          </div>
          <p className="text-forest-green/70 mt-2 font-medium">AI-powered recruitment intelligence</p>
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-electric-purple group-hover:animate-bounce-gentle transition-all" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="AI-powered search..."
              className="block w-96 pl-12 pr-4 py-4 border-2 border-electric-purple/20 rounded-xl leading-5 glass-effect placeholder-forest-green/50 focus:outline-none focus:ring-2 focus:ring-electric-purple focus:border-electric-purple/50 transition-all duration-300 text-forest-green font-medium hover:shadow-lg"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-electric-purple/5 to-bright-coral/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>

          <button className="relative p-4 text-forest-green hover:text-electric-purple transition-all duration-300 glass-effect rounded-xl hover-lift">
            <Bell size={22} className="hover:animate-wiggle" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-bright-coral to-electric-purple text-snow-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-pulse-glow font-bold">
                {notifications}
              </span>
            )}
          </button>

          <button className="bg-gradient-to-r from-electric-purple to-bright-coral text-snow-white px-6 py-4 rounded-xl hover:scale-105 transition-all duration-300 flex items-center space-x-3 shadow-xl hover:shadow-2xl animate-fade-in-scale">
            <Plus size={18} className="animate-bounce-gentle" />
            <span className="font-bold">AI Create</span>
            <Zap size={16} className="animate-pulse" />
          </button>

          <button className="relative p-4 text-forest-green hover:text-electric-purple transition-all duration-300 glass-effect rounded-xl hover-lift">
            <User size={22} className="hover:animate-wiggle" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
