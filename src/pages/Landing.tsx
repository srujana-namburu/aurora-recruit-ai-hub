
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Building2, Users, Search, FileText, Briefcase, TrendingUp } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">TalentHub</span>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => navigate("/auth")}>
                Sign In
              </Button>
              <Button onClick={() => navigate("/auth")}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connecting Talent with Opportunity
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Whether you're looking to hire the best talent or find your dream job, 
            TalentHub provides the tools and insights you need to succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/auth")} className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5" />
              <span>Find Jobs</span>
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/auth")} className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Hire Talent</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Two-sided platform */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for Both Sides of Hiring
            </h2>
            <p className="text-lg text-gray-600">
              Powerful tools for employers and job seekers alike
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* For Job Seekers */}
            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Search className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-2xl">For Job Seekers</CardTitle>
                </div>
                <CardDescription>
                  Discover opportunities that match your skills and career goals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Smart Job Matching</h4>
                      <p className="text-gray-600 text-sm">AI-powered recommendations based on your profile</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Easy Applications</h4>
                      <p className="text-gray-600 text-sm">Apply to multiple jobs with one click</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Application Tracking</h4>
                      <p className="text-gray-600 text-sm">Stay updated on your application status</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Career AI Chat</h4>
                      <p className="text-gray-600 text-sm">Get personalized career advice and guidance</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-6" onClick={() => navigate("/auth")}>
                  Start Job Search
                </Button>
              </CardContent>
            </Card>

            {/* For Employers */}
            <Card className="border-indigo-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  <Building2 className="h-6 w-6 text-indigo-600" />
                  <CardTitle className="text-2xl">For Employers</CardTitle>
                </div>
                <CardDescription>
                  Find, evaluate, and hire the best candidates efficiently
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">AI Resume Screening</h4>
                      <p className="text-gray-600 text-sm">Automated candidate matching and ranking</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Interview Management</h4>
                      <p className="text-gray-600 text-sm">Streamlined scheduling and feedback collection</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Pipeline Tracking</h4>
                      <p className="text-gray-600 text-sm">Visual candidate journey from application to hire</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Team Collaboration</h4>
                      <p className="text-gray-600 text-sm">Share feedback and make decisions together</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-6" onClick={() => navigate("/auth")}>
                  Start Hiring
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powered by AI Technology
            </h2>
            <p className="text-lg text-gray-600">
              Leverage cutting-edge AI to make smarter hiring decisions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Resume Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  AI-powered resume parsing and candidate matching with detailed skill analysis and job fit scoring.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Interview Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Smart interview feedback analysis and bias detection to ensure fair and effective hiring practices.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Predictive Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Data-driven insights on hiring trends, candidate success prediction, and market salary benchmarks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of companies and job seekers using TalentHub
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigate("/auth")}>
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Building2 className="h-6 w-6 text-blue-400" />
            <span className="ml-2 text-lg font-bold">TalentHub</span>
          </div>
          <p className="text-center text-gray-400 mt-4">
            © 2024 TalentHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
