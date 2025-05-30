
import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  Briefcase, 
  Calendar, 
  BarChart3, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Bot,
  FileText,
  MessageSquare,
  Shield,
  Sparkles,
  Zap,
  Brain
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'Overview & Analytics' },
    { id: 'jobs', label: 'Job Postings', icon: Briefcase, description: 'Manage Positions' },
    { id: 'candidates', label: 'Candidates', icon: Users, description: 'Candidate Pipeline' },
    { id: 'interviews', label: 'Interviews', icon: Calendar, description: 'Schedule & Track' },
    { id: 'resume-matcher', label: 'Resume Matcher', icon: Bot, description: 'AI-Powered Matching' },
    { id: 'interview-summary', label: 'Interview AI', icon: FileText, description: 'Smart Summaries' },
    { id: 'chat-summarizer', label: 'Chat Analyzer', icon: MessageSquare, description: 'Extract Insights' },
    { id: 'bias-detector', label: 'Bias Detector', icon: Shield, description: 'Fair Hiring' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, description: 'Data Insights' },
    { id: 'settings', label: 'Settings', icon: Settings, description: 'Configuration' },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full elegant-gradient transition-all duration-500 z-50 ${collapsed ? 'w-20' : 'w-80'} elegant-scroll`}>
      <div className="flex items-center justify-between p-8 border-b border-white/10">
        {!collapsed && (
          <div className="animate-fade-in-up">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-warm-amber to-soft-lavender rounded-xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-charcoal-slate" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">ElegantATS</h1>
                <p className="text-sm text-white/70 font-medium">AI-Powered Hiring</p>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-white hover:scale-110 glass-panel border-white/20"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="mt-8 px-6 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center px-6 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden animate-fade-in-up ${
                isActive 
                  ? 'bg-white/20 text-white shadow-xl scale-105 border border-white/30' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white hover:scale-102'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative z-10 flex items-center w-full">
                <div className={`p-2 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-white/20' 
                    : 'group-hover:bg-white/10'
                }`}>
                  <Icon size={20} className={`transition-all duration-300 morph-icon ${
                    isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
                  }`} />
                </div>
                {!collapsed && (
                  <div className="ml-4 animate-slide-in-right">
                    <div className="font-semibold text-sm">{item.label}</div>
                    <div className="text-xs opacity-70">{item.description}</div>
                  </div>
                )}
                {isActive && !collapsed && (
                  <Sparkles className="ml-auto h-4 w-4 smooth-pulse" />
                )}
              </div>
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 elegant-shimmer rounded-2xl"></div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-8 left-0 right-0 px-6">
        <div className={`glass-panel rounded-2xl p-6 border-white/20 ${collapsed ? 'text-center' : ''}`}>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-warm-amber to-soft-lavender rounded-xl flex items-center justify-center smooth-pulse">
              <Zap className="h-6 w-6 text-charcoal-slate" />
            </div>
            {!collapsed && (
              <div className="animate-fade-in-up">
                <div className="text-sm font-semibold text-white">AI Assistant</div>
                <div className="text-xs text-white/70">24/7 Smart Support</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
