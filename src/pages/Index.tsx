
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import JobPostings from '../components/JobPostings';
import ResumeMatcherAI from '../components/ResumeMatcherAI';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'jobs': return 'Job Postings';
      case 'candidates': return 'Candidate Management';
      case 'interviews': return 'Interview Scheduling';
      case 'resume-matcher': return 'Resume Matcher AI';
      case 'interview-summary': return 'Interview Summary Generator';
      case 'chat-summarizer': return 'Chat Summarizer';
      case 'bias-detector': return 'Bias Detector';
      case 'analytics': return 'Analytics & Reports';
      case 'settings': return 'Settings';
      default: return 'ATS Dashboard';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'jobs':
        return <JobPostings />;
      case 'resume-matcher':
        return <ResumeMatcherAI />;
      case 'candidates':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <h3 className="text-xl font-semibold text-midnight mb-4">Candidate Management</h3>
              <p className="text-gray-600">Advanced candidate tracking and management features coming soon...</p>
            </div>
          </div>
        );
      case 'interviews':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <h3 className="text-xl font-semibold text-midnight mb-4">Interview Scheduling</h3>
              <p className="text-gray-600">Calendar integration and interview management features coming soon...</p>
            </div>
          </div>
        );
      case 'interview-summary':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <h3 className="text-xl font-semibold text-midnight mb-4">Interview Summary Generator</h3>
              <p className="text-gray-600">AI-powered interview analysis and summarization tools coming soon...</p>
            </div>
          </div>
        );
      case 'chat-summarizer':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <h3 className="text-xl font-semibold text-midnight mb-4">Chat Summarizer</h3>
              <p className="text-gray-600">Intelligent chat transcript analysis and data extraction coming soon...</p>
            </div>
          </div>
        );
      case 'bias-detector':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <h3 className="text-xl font-semibold text-midnight mb-4">Bias Detector</h3>
              <p className="text-gray-600">AI-powered bias detection and fairness monitoring coming soon...</p>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <h3 className="text-xl font-semibold text-midnight mb-4">Analytics & Reports</h3>
              <p className="text-gray-600">Comprehensive recruitment analytics and reporting dashboard coming soon...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <h3 className="text-xl font-semibold text-midnight mb-4">Settings</h3>
              <p className="text-gray-600">System configuration and user management settings coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-pearl">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="transition-all duration-300">
        <Header title={getPageTitle()} />
        <main className="ml-64">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
