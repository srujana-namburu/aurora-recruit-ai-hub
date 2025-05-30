
import React, { useState } from 'react';
import { Search, Bell, Plus, Filter } from 'lucide-react';

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
    <header className="bg-white border-b border-gray-200 px-6 py-4 ml-64">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-midnight">{title}</h1>
          <p className="text-gray-600 mt-1">Manage your recruitment process efficiently</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search candidates, jobs..."
              className="block w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald transition-all duration-200"
            />
          </div>

          <button className="relative p-2 text-gray-400 hover:text-emerald transition-colors">
            <Bell size={20} />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {notifications}
              </span>
            )}
          </button>

          <button className="bg-emerald text-white px-4 py-2 rounded-lg hover:bg-emerald/90 transition-all duration-200 flex items-center space-x-2 ripple-effect">
            <Plus size={16} />
            <span>Add New</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
