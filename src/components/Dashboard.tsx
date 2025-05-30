
import React, { useState, useEffect } from 'react';
import { Users, Briefcase, Calendar, TrendingUp, CheckCircle, Zap, Brain, Target, Sparkles, Award, Star } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [counters, setCounters] = useState({
    totalCandidates: 0,
    activeJobs: 0,
    interviews: 0,
    hired: 0
  });

  const metrics = [
    { 
      label: 'AI Matched Candidates', 
      value: 2847, 
      icon: Users, 
      change: '+12%',
      aiScore: 95,
      color: 'from-rich-burgundy to-warm-amber'
    },
    { 
      label: 'Active Positions', 
      value: 24, 
      icon: Briefcase, 
      change: '+3%',
      aiScore: 88,
      color: 'from-warm-amber to-soft-lavender'
    },
    { 
      label: 'Scheduled Interviews', 
      value: 18, 
      icon: Calendar, 
      change: '+8%',
      aiScore: 92,
      color: 'from-soft-lavender to-charcoal-slate'
    },
    { 
      label: 'Successful Hires', 
      value: 156, 
      icon: CheckCircle, 
      change: '+15%',
      aiScore: 89,
      color: 'from-charcoal-slate to-rich-burgundy'
    }
  ];

  useEffect(() => {
    const animateCounters = () => {
      metrics.forEach((metric, index) => {
        let start = 0;
        const end = metric.value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }
          
          setCounters(prev => ({
            ...prev,
            [Object.keys(prev)[index]]: Math.floor(start)
          }));
        }, 16);
      });
    };

    animateCounters();
  }, []);

  const recentActivities = [
    { 
      type: 'match', 
      message: 'AI matched 5 perfect candidates for Senior Developer', 
      time: '2 min ago', 
      score: 98,
      priority: 'high'
    },
    { 
      type: 'interview', 
      message: 'Interview scheduled with Sarah Johnson (96% match)', 
      time: '15 min ago', 
      score: 96,
      priority: 'medium'
    },
    { 
      type: 'hire', 
      message: 'Successful hire: John Doe (94% prediction accuracy)', 
      time: '1 hour ago', 
      score: 94,
      priority: 'high'
    },
    { 
      type: 'analysis', 
      message: 'AI analyzed 50 resumes in 30 seconds', 
      time: '2 hours ago', 
      score: 92,
      priority: 'low'
    }
  ];

  const pipelineData = [
    { stage: 'AI Screening', count: 145, percentage: 100, color: 'bg-rich-burgundy' },
    { stage: 'Smart Filter', count: 89, percentage: 61, color: 'bg-warm-amber' },
    { stage: 'Interview Ready', count: 34, percentage: 38, color: 'bg-gradient-to-r from-soft-lavender to-charcoal-slate' },
    { stage: 'Final Review', count: 12, percentage: 35, color: 'bg-gradient-to-r from-warm-amber to-rich-burgundy' },
    { stage: 'Hired', count: 8, percentage: 67, color: 'bg-gradient-to-r from-charcoal-slate to-rich-burgundy' }
  ];

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Star className="h-3 w-3 text-warm-amber" />;
      case 'medium': return <Target className="h-3 w-3 text-soft-lavender" />;
      default: return <Brain className="h-3 w-3 text-charcoal-slate" />;
    }
  };

  return (
    <div className="p-8 space-y-8 min-h-screen bg-gradient-to-br from-pearl-white to-soft-lavender/20">
      {/* Elegant Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const counterValues = Object.values(counters);
          
          return (
            <div
              key={metric.label}
              className="elegant-card rounded-3xl p-8 relative overflow-hidden group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${metric.color} shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-rich-burgundy smooth-pulse" />
                    <span className="text-xs font-bold text-rich-burgundy">{metric.aiScore}%</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm font-medium text-charcoal-slate/70 tracking-wide">{metric.label}</p>
                  <p className="text-4xl font-bold text-charcoal-slate">
                    {counterValues[index]?.toLocaleString() || 0}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-warm-amber">{metric.change} this week</p>
                    <Sparkles className="h-4 w-4 text-rich-burgundy gentle-float" />
                  </div>
                </div>
              </div>
              
              <div className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${metric.color} opacity-10 rounded-full gentle-float`}></div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Elegant Pipeline */}
        <div className="lg:col-span-2 elegant-card rounded-3xl p-8 animate-scale-in">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h3 className="text-2xl font-bold text-charcoal-slate">Hiring Pipeline</h3>
              <div className="w-3 h-3 bg-gradient-to-r from-rich-burgundy to-warm-amber rounded-full smooth-pulse"></div>
            </div>
            <div className="flex items-center space-x-3 text-sm text-rich-burgundy font-semibold lavender-highlight px-4 py-2 rounded-2xl">
              <Brain className="h-4 w-4 smooth-pulse" />
              <span>Smart Analytics</span>
            </div>
          </div>
          
          <div className="space-y-6">
            {pipelineData.map((stage, index) => (
              <div 
                key={stage.stage} 
                className="flex items-center justify-between p-6 bg-gradient-to-r from-pearl-white to-soft-lavender/20 rounded-2xl border border-soft-lavender/30 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-6">
                  <div className={`w-4 h-4 rounded-full ${stage.color} smooth-pulse shadow-lg`}></div>
                  <span className="font-semibold text-charcoal-slate text-lg">{stage.stage}</span>
                  <Award className="h-4 w-4 text-warm-amber morph-icon" />
                </div>
                
                <div className="flex items-center space-x-8">
                  <span className="text-3xl font-bold text-charcoal-slate">{stage.count}</span>
                  <div className="w-32 bg-soft-lavender/50 rounded-full h-3 relative overflow-hidden">
                    <div
                      className={`h-3 rounded-full ${stage.color} transition-all duration-1000 ease-out relative elegant-shimmer`}
                      style={{ 
                        width: `${stage.percentage}%`,
                        animationDelay: `${index * 0.2}s`
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-rich-burgundy min-w-[40px]">{stage.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Elegant Activity Feed */}
        <div className="elegant-card rounded-3xl p-8 animate-slide-in-right">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-charcoal-slate">Live Activity</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warm-amber rounded-full smooth-pulse"></div>
              <span className="text-sm text-charcoal-slate/70 font-medium">Real-time</span>
            </div>
          </div>
          
          <div className="space-y-4 elegant-scroll max-h-96 overflow-y-auto">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-5 rounded-2xl lavender-highlight hover:shadow-md transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-rich-burgundy to-warm-amber rounded-full smooth-pulse"></div>
                  {getPriorityIcon(activity.priority)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-charcoal-slate mb-2 leading-relaxed">{activity.message}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-charcoal-slate/60 font-medium">{activity.time}</p>
                    <div className="flex items-center space-x-2 lavender-highlight px-3 py-1 rounded-full">
                      <Brain className="h-3 w-3 text-rich-burgundy" />
                      <span className="text-xs font-bold text-rich-burgundy">{activity.score}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Elegant Quick Actions */}
      <div className="elegant-card rounded-3xl p-8 elegant-gradient text-white animate-fade-in-up">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h3 className="text-2xl font-bold">AI-Powered Actions</h3>
            <Zap className="h-6 w-6 gentle-float" />
          </div>
          <Sparkles className="h-8 w-8 smooth-pulse" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="glass-panel rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 group border-white/20">
            <Briefcase className="h-12 w-12 mx-auto mb-4 morph-icon" />
            <span className="block font-bold text-lg mb-2">Smart Job Creator</span>
            <span className="block text-sm opacity-80 leading-relaxed">AI-generated job descriptions with precision targeting</span>
          </button>
          
          <button className="glass-panel rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 group border-white/20">
            <Users className="h-12 w-12 mx-auto mb-4 morph-icon" />
            <span className="block font-bold text-lg mb-2">Intelligent Matcher</span>
            <span className="block text-sm opacity-80 leading-relaxed">Advanced candidate-role compatibility analysis</span>
          </button>
          
          <button className="glass-panel rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 group border-white/20">
            <Calendar className="h-12 w-12 mx-auto mb-4 morph-icon" />
            <span className="block font-bold text-lg mb-2">Smart Scheduler</span>
            <span className="block text-sm opacity-80 leading-relaxed">Automated interview coordination with AI optimization</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
