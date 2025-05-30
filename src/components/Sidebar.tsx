
import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  Briefcase, 
  Calendar, 
  BarChart3, 
  Settings, 
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  Bot,
  FileText,
  MessageSquare,
  Shield
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'jobs', label: 'Job Postings', icon: Briefcase },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'interviews', label: 'Interviews', icon: Calendar },
    { id: 'resume-matcher', label: 'Resume Matcher AI', icon: Bot },
    { id: 'interview-summary', label: 'Interview Summary', icon: FileText },
    { id: 'chat-summarizer', label: 'Chat Summarizer', icon: MessageSquare },
    { id: 'bias-detector', label: 'Bias Detector', icon: Shield },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full gradient-bg transition-all duration-300 z-50 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="text-xl font-bold text-sidebar-foreground animate-fade-in">
            ATS <span className="text-emerald">Pro</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="mt-6 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center px-3 py-3 mb-1 rounded-lg transition-all duration-200 group relative overflow-hidden ${
                isActive 
                  ? 'bg-emerald text-white shadow-lg' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-white'
              }`}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!collapsed && (
                <span className="ml-3 font-medium animate-fade-in">{item.label}</span>
              )}
              {isActive && (
                <div className="absolute inset-0 bg-emerald opacity-20 animate-pulse-glow rounded-lg"></div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-0 right-0 px-3">
        <div className={`flex items-center p-3 rounded-lg bg-sidebar-accent ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-emerald rounded-full flex items-center justify-center text-white font-bold">
            HR
          </div>
          {!collapsed && (
            <div className="ml-3 animate-fade-in">
              <div className="text-sm font-medium text-sidebar-foreground">HR Manager</div>
              <div className="text-xs text-sidebar-foreground opacity-70">admin@company.com</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
