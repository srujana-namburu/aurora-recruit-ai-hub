
import React, { useState, useEffect } from 'react';
import { Users, Briefcase, Calendar, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [counters, setCounters] = useState({
    totalCandidates: 0,
    activeJobs: 0,
    interviews: 0,
    hired: 0
  });

  const metrics = [
    { 
      label: 'Total Candidates', 
      value: 2847, 
      icon: Users, 
      color: 'emerald',
      change: '+12%'
    },
    { 
      label: 'Active Job Postings', 
      value: 24, 
      icon: Briefcase, 
      color: 'blue',
      change: '+3%'
    },
    { 
      label: 'Interviews This Week', 
      value: 18, 
      icon: Calendar, 
      color: 'purple',
      change: '+8%'
    },
    { 
      label: 'Successful Hires', 
      value: 156, 
      icon: CheckCircle, 
      color: 'green',
      change: '+15%'
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
    { type: 'application', message: 'New application for Senior Developer', time: '2 min ago' },
    { type: 'interview', message: 'Interview scheduled with Sarah Johnson', time: '15 min ago' },
    { type: 'hire', message: 'John Doe hired for Product Manager role', time: '1 hour ago' },
    { type: 'job', message: 'New job posting: UX Designer', time: '2 hours ago' }
  ];

  const pipelineData = [
    { stage: 'Applied', count: 145, color: 'bg-blue-500' },
    { stage: 'Screening', count: 89, color: 'bg-yellow-500' },
    { stage: 'Interview', count: 34, color: 'bg-purple-500' },
    { stage: 'Offer', count: 12, color: 'bg-emerald' },
    { stage: 'Hired', count: 8, color: 'bg-green-600' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const counterValues = Object.values(counters);
          
          return (
            <div
              key={metric.label}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <p className="text-3xl font-bold text-midnight mt-2 animate-counter">
                    {counterValues[index]?.toLocaleString() || 0}
                  </p>
                  <p className="text-sm text-emerald font-medium mt-1">{metric.change} from last month</p>
                </div>
                <div className={`p-3 rounded-full bg-${metric.color}-100`}>
                  <Icon className={`h-6 w-6 text-${metric.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hiring Pipeline */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-midnight mb-6">Hiring Pipeline</h3>
          <div className="space-y-4">
            {pipelineData.map((stage, index) => (
              <div key={stage.stage} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                  <span className="font-medium text-midnight">{stage.stage}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-midnight">{stage.count}</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${stage.color} animate-progress`}
                      style={{ 
                        '--progress-width': `${(stage.count / 145) * 100}%`,
                        animationDelay: `${index * 0.2}s`
                      } as any}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-midnight mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-emerald rounded-full mt-2"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-midnight">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-emerald to-green-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition-all duration-200 ripple-effect">
            <Briefcase className="h-8 w-8 mx-auto mb-2" />
            <span className="block font-medium">Post New Job</span>
          </button>
          <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition-all duration-200 ripple-effect">
            <Users className="h-8 w-8 mx-auto mb-2" />
            <span className="block font-medium">Review Applications</span>
          </button>
          <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition-all duration-200 ripple-effect">
            <Calendar className="h-8 w-8 mx-auto mb-2" />
            <span className="block font-medium">Schedule Interview</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
