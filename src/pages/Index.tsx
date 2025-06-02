
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import JobPostings from '../components/JobPostings';
import BasicResumeMatcher from '../components/BasicResumeMatcher';
import ApplicationsPipeline from '../components/ApplicationsPipeline';
import CandidatesList from '../components/CandidatesList';
import InterviewAI from '../components/InterviewAI';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'jobs': return 'Job Management';
      case 'candidates': return 'Candidate Pipeline';
      case 'interviews': return 'Interview Coordination';
      case 'resume-matcher': return 'Resume Matcher AI';
      case 'interview-summary': return 'Interview Intelligence';
      case 'chat-summarizer': return 'Chat Analytics';
      case 'bias-detector': return 'Bias Detection';
      case 'analytics': return 'Advanced Analytics';
      case 'settings': return 'System Settings';
      default: return 'ElegantATS Platform';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'jobs':
        return <JobPostings />;
      case 'resume-matcher':
        return <BasicResumeMatcher />;
      case 'candidates':
        return <ApplicationsPipeline />;
      case 'interviews':
        return <CandidatesList />;
      case 'interview-summary':
        return <InterviewAI />;
      case 'chat-summarizer':
        return (
          <div className="p-8 min-h-screen bg-gradient-to-br from-pearl-white to-soft-lavender/20">
            <div className="elegant-card rounded-3xl p-12 text-center border border-charcoal-slate/10 bg-white/95">
              <div className="w-20 h-20 bg-gradient-to-br from-charcoal-slate to-rich-burgundy rounded-3xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">💬</span>
              </div>
              <h3 className="text-2xl font-bold text-charcoal-slate mb-4">Chat Analytics</h3>
              <p className="text-charcoal-slate/70 font-medium leading-relaxed">Intelligent conversation analysis and insights extraction coming soon...</p>
            </div>
          </div>
        );
      case 'bias-detector':
        return (
          <div className="p-8 min-h-screen bg-gradient-to-br from-pearl-white to-soft-lavender/20">
            <div className="elegant-card rounded-3xl p-12 text-center border border-charcoal-slate/10 bg-white/95">
              <div className="w-20 h-20 bg-gradient-to-br from-rich-burgundy to-warm-amber rounded-3xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">🛡️</span>
              </div>
              <h3 className="text-2xl font-bold text-charcoal-slate mb-4">Bias Detection</h3>
              <p className="text-charcoal-slate/70 font-medium leading-relaxed">Advanced fairness monitoring and bias detection algorithms coming soon...</p>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-8 min-h-screen bg-gradient-to-br from-pearl-white to-soft-lavender/20">
            <div className="elegant-card rounded-3xl p-12 text-center border border-charcoal-slate/10 bg-white/95">
              <div className="w-20 h-20 bg-gradient-to-br from-warm-amber to-rich-burgundy rounded-3xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-charcoal-slate mb-4">Advanced Analytics</h3>
              <p className="text-charcoal-slate/70 font-medium leading-relaxed">Comprehensive recruitment analytics and intelligent reporting coming soon...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8 min-h-screen bg-gradient-to-br from-pearl-white to-soft-lavender/20">
            <div className="elegant-card rounded-3xl p-12 text-center border border-charcoal-slate/10 bg-white/95">
              <div className="w-20 h-20 bg-gradient-to-br from-charcoal-slate to-soft-lavender rounded-3xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">⚙️</span>
              </div>
              <h3 className="text-2xl font-bold text-charcoal-slate mb-4">System Settings</h3>
              <p className="text-charcoal-slate/70 font-medium leading-relaxed">Platform configuration and advanced user management coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl-white to-soft-lavender/20">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="transition-all duration-300">
        <Header title={getPageTitle()} />
        <main className={`ml-80`}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
