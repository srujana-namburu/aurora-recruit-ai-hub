
import React, { useState, useEffect } from 'react';
import { Users, Briefcase, Calendar, TrendingUp, Clock, CheckCircle, Zap, Brain, Target, Sparkles } from 'lucide-react';

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
      gradient: 'from-electric-purple to-bright-coral',
      change: '+12%',
      aiScore: 95
    },
    { 
      label: 'Smart Job Postings', 
      value: 24, 
      icon: Briefcase, 
      gradient: 'from-forest-green to-electric-purple',
      change: '+3%',
      aiScore: 88
    },
    { 
      label: 'AI Scheduled Interviews', 
      value: 18, 
      icon: Calendar, 
      gradient: 'from-bright-coral to-forest-green',
      change: '+8%',
      aiScore: 92
    },
    { 
      label: 'AI Predicted Hires', 
      value: 156, 
      icon: CheckCircle, 
      gradient: 'from-electric-purple to-forest-green',
      change: '+15%',
      aiScore: 89
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
    { type: 'ai-match', message: 'AI matched 5 perfect candidates for Senior Developer', time: '2 min ago', score: 98 },
    { type: 'ai-interview', message: 'AI scheduled interview with Sarah Johnson (96% match)', time: '15 min ago', score: 96 },
    { type: 'ai-hire', message: 'AI predicted hire: John Doe (94% success rate)', time: '1 hour ago', score: 94 },
    { type: 'ai-analysis', message: 'AI analyzed 50 resumes in 30 seconds', time: '2 hours ago', score: 92 }
  ];

  const pipelineData = [
    { stage: 'AI Screening', count: 145, color: 'bg-electric-purple', percentage: 100 },
    { stage: 'Smart Filter', count: 89, color: 'bg-bright-coral', percentage: 61 },
    { stage: 'AI Interview', count: 34, color: 'bg-forest-green', percentage: 38 },
    { stage: 'AI Score', count: 12, color: 'bg-gradient-to-r from-electric-purple to-bright-coral', percentage: 35 },
    { stage: 'AI Hired', count: 8, color: 'bg-gradient-to-r from-forest-green to-electric-purple', percentage: 67 }
  ];

  return (
    <div className="p-8 space-y-8 particle-bg min-h-screen">
      {/* AI Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const counterValues = Object.values(counters);
          
          return (
            <div
              key={metric.label}
              className="glass-card rounded-2xl p-8 hover-lift animate-fade-in relative overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-xl bg-gradient-to-r ${metric.gradient} shadow-lg`}>
                    <Icon className="h-8 w-8 text-snow-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-electric-purple animate-pulse" />
                    <span className="text-xs font-bold text-electric-purple">{metric.aiScore}% AI</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-forest-green/70 mb-2">{metric.label}</p>
                  <p className="text-4xl font-bold text-forest-green mb-2">
                    {counterValues[index]?.toLocaleString() || 0}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-bright-coral">{metric.change} AI boost</p>
                    <Brain className="h-4 w-4 text-electric-purple animate-bounce-gentle" />
                  </div>
                </div>
              </div>
              
              {/* Animated background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${metric.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-r from-electric-purple/10 to-bright-coral/10 rounded-full animate-float"></div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Pipeline */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-8 animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-bold text-forest-green">AI Hiring Pipeline</h3>
              <Target className="h-6 w-6 text-electric-purple animate-bounce-gentle" />
            </div>
            <div className="flex items-center space-x-2 text-sm text-electric-purple font-medium">
              <Brain className="h-4 w-4 animate-pulse" />
              <span>Smart Analytics</span>
            </div>
          </div>
          
          <div className="space-y-6">
            {pipelineData.map((stage, index) => (
              <div 
                key={stage.stage} 
                className="flex items-center justify-between p-6 bg-gradient-to-r from-snow-white to-electric-purple/5 rounded-xl border border-electric-purple/10 hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${stage.color} animate-pulse-glow`}></div>
                  <span className="font-semibold text-forest-green">{stage.stage}</span>
                  <Sparkles className="h-4 w-4 text-electric-purple animate-bounce-gentle" />
                </div>
                
                <div className="flex items-center space-x-6">
                  <span className="text-2xl font-bold text-forest-green">{stage.count}</span>
                  <div className="w-32 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                    <div
                      className={`h-3 rounded-full ${stage.color} transition-all duration-1000 ease-out relative`}
                      style={{ 
                        width: `${stage.percentage}%`,
                        animationDelay: `${index * 0.2}s`
                      }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-electric-purple">{stage.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Activity Feed */}
        <div className="glass-card rounded-2xl p-8 animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-forest-green">AI Activity Feed</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-bright-coral rounded-full animate-pulse"></div>
              <span className="text-sm text-forest-green/70">Live</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-electric-purple/5 to-bright-coral/5 border border-electric-purple/10 hover-lift animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 bg-gradient-to-r from-electric-purple to-bright-coral rounded-full animate-pulse-glow"></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-forest-green mb-1">{activity.message}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-forest-green/60">{activity.time}</p>
                    <div className="flex items-center space-x-2">
                      <Brain className="h-3 w-3 text-electric-purple" />
                      <span className="text-xs font-bold text-electric-purple">{activity.score}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Quick Actions */}
      <div className="glass-card rounded-2xl p-8 bg-gradient-to-r from-forest-green to-electric-purple text-snow-white animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <h3 className="text-2xl font-bold">AI Quick Actions</h3>
            <Zap className="h-6 w-6 animate-bounce-gentle" />
          </div>
          <Sparkles className="h-8 w-8 animate-float" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="glass-effect rounded-xl p-6 text-center hover-lift transition-all duration-300 group">
            <Briefcase className="h-10 w-10 mx-auto mb-4 group-hover:animate-bounce-gentle" />
            <span className="block font-bold text-lg">AI Job Creator</span>
            <span className="block text-sm opacity-80 mt-2">Smart job posting generation</span>
          </button>
          
          <button className="glass-effect rounded-xl p-6 text-center hover-lift transition-all duration-300 group">
            <Users className="h-10 w-10 mx-auto mb-4 group-hover:animate-bounce-gentle" />
            <span className="block font-bold text-lg">AI Matcher</span>
            <span className="block text-sm opacity-80 mt-2">Intelligent candidate matching</span>
          </button>
          
          <button className="glass-effect rounded-xl p-6 text-center hover-lift transition-all duration-300 group">
            <Calendar className="h-10 w-10 mx-auto mb-4 group-hover:animate-bounce-gentle" />
            <span className="block font-bold text-lg">AI Scheduler</span>
            <span className="block text-sm opacity-80 mt-2">Smart interview scheduling</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
