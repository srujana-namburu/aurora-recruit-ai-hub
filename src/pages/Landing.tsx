
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Users, Briefcase, Brain, Shield, BarChart3 } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Advanced algorithms match candidates to perfect job opportunities with unprecedented accuracy."
    },
    {
      icon: Users,
      title: "Candidate Pipeline",
      description: "Streamlined candidate management with comprehensive tracking and analytics."
    },
    {
      icon: Briefcase,
      title: "Job Management",
      description: "Create, manage, and track job postings with intelligent workflow automation."
    },
    {
      icon: Shield,
      title: "Bias Detection",
      description: "Ensure fair hiring practices with our advanced bias detection technology."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive insights and reporting to optimize your recruitment process."
    },
    {
      icon: Sparkles,
      title: "Smart Automation",
      description: "Automate repetitive tasks and focus on what matters most - finding great talent."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl-white to-soft-lavender/20">
      {/* Header */}
      <header className="px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-warm-amber to-soft-lavender rounded-xl flex items-center justify-center">
              <Brain className="h-7 w-7 text-charcoal-slate" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-charcoal-slate">ElegantATS</h1>
              <p className="text-sm text-charcoal-slate/70 font-medium">AI-Powered Hiring Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/auth')}
              className="border-charcoal-slate text-charcoal-slate hover:bg-charcoal-slate hover:text-white"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate('/auth')}
              className="minimalist-button px-6 py-2 rounded-xl"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-8 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl font-bold text-charcoal-slate mb-6 leading-tight">
              Transform Your Hiring with
              <span className="text-elegant-gradient block mt-2">AI-Powered Intelligence</span>
            </h1>
            <p className="text-xl text-charcoal-slate/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              ElegantATS revolutionizes recruitment with advanced AI matching, bias detection, and intelligent automation. 
              Find the perfect candidates faster and build diverse, high-performing teams.
            </p>
            <div className="flex items-center justify-center space-x-6 mt-12">
              <Button 
                size="lg"
                onClick={() => navigate('/auth')}
                className="minimalist-button px-8 py-4 text-lg rounded-2xl"
              >
                Start Free Trial
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-charcoal-slate text-charcoal-slate hover:bg-charcoal-slate hover:text-white px-8 py-4 text-lg rounded-2xl"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal-slate mb-4">
              Powerful Features for Modern Hiring
            </h2>
            <p className="text-xl text-charcoal-slate/70 max-w-2xl mx-auto">
              Everything you need to streamline your recruitment process and make data-driven hiring decisions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={feature.title}
                  className="elegant-card rounded-3xl p-8 text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-warm-amber to-soft-lavender rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-charcoal-slate" />
                  </div>
                  <h3 className="text-xl font-bold text-charcoal-slate mb-4">{feature.title}</h3>
                  <p className="text-charcoal-slate/70 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="elegant-card rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-charcoal-slate mb-6">
              Ready to Revolutionize Your Hiring?
            </h2>
            <p className="text-xl text-charcoal-slate/70 mb-8 leading-relaxed">
              Join thousands of companies using ElegantATS to build exceptional teams with AI-powered recruitment.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/auth')}
              className="minimalist-button px-12 py-4 text-lg rounded-2xl"
            >
              Get Started Today
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-charcoal-slate/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-charcoal-slate/60">
            © 2024 ElegantATS. All rights reserved. Powered by AI for smarter hiring.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
