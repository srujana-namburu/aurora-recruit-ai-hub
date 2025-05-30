
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
  Zap
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'AI Dashboard', icon: Home, gradient: 'from-electric-purple to-bright-coral' },
    { id: 'jobs', label: 'Smart Jobs', icon: Briefcase, gradient: 'from-forest-green to-electric-purple' },
    { id: 'candidates', label: 'Candidates', icon: Users, gradient: 'from-bright-coral to-forest-green' },
    { id: 'interviews', label: 'Interviews', icon: Calendar, gradient: 'from-electric-purple to-forest-green' },
    { id: 'resume-matcher', label: 'AI Resume Matcher', icon: Bot, gradient: 'from-bright-coral to-electric-purple' },
    { id: 'interview-summary', label: 'Interview AI', icon: FileText, gradient: 'from-forest-green to-bright-coral' },
    { id: 'chat-summarizer', label: 'Chat Analyzer', icon: MessageSquare, gradient: 'from-electric-purple to-bright-coral' },
    { id: 'bias-detector', label: 'Bias Detector', icon: Shield, gradient: 'from-bright-coral to-forest-green' },
    { id: 'analytics', label: 'Analytics AI', icon: BarChart3, gradient: 'from-forest-green to-electric-purple' },
    { id: 'settings', label: 'Settings', icon: Settings, gradient: 'from-electric-purple to-forest-green' },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full gradient-bg transition-all duration-500 z-50 particle-bg ${collapsed ? 'w-20' : 'w-72'}`}>
      <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
        {!collapsed && (
          <div className="text-2xl font-bold text-snow-white animate-fade-in">
            <span className="text-gradient">ATS</span>
            <span className="text-snow-white ml-2">AI</span>
            <Sparkles className="inline-block ml-2 h-6 w-6 text-electric-purple animate-bounce-gentle" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-3 rounded-xl hover:bg-sidebar-accent transition-all duration-300 text-snow-white hover:scale-110 glass-effect"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="mt-8 px-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center px-4 py-4 mb-3 rounded-xl transition-all duration-300 group relative overflow-hidden animate-fade-in hover-lift ${
                isActive 
                  ? `bg-gradient-to-r ${item.gradient} text-snow-white shadow-xl scale-105` 
                  : 'text-snow-white hover:bg-sidebar-accent glass-effect'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative z-10 flex items-center w-full">
                <Icon size={22} className={`flex-shrink-0 ${isActive ? 'animate-bounce-gentle' : 'group-hover:animate-wiggle'}`} />
                {!collapsed && (
                  <span className="ml-4 font-medium animate-slide-in">{item.label}</span>
                )}
                {isActive && !collapsed && (
                  <Zap className="ml-auto h-4 w-4 animate-pulse-glow" />
                )}
              </div>
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              )}
              {!collapsed && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-20 rounded-xl`}></div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-0 right-0 px-4">
        <div className={`flex items-center p-4 rounded-xl glass-effect hover-lift ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 bg-gradient-to-r from-electric-purple to-bright-coral rounded-full flex items-center justify-center text-snow-white font-bold animate-pulse-glow">
            AI
          </div>
          {!collapsed && (
            <div className="ml-4 animate-fade-in">
              <div className="text-sm font-medium text-snow-white">AI Assistant</div>
              <div className="text-xs text-snow-white/70">Smart Recruiting</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
