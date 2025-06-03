
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Building2, User, Briefcase, CheckCircle } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          navigate("/jobs");
          return;
        }
      } catch (error) {
        console.log("Auth check error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

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
            <div className="space-x-4">
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Find Your Perfect
            <span className="text-blue-600"> Talent Match</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
            Connect job seekers with opportunities and help employers find the best candidates with our AI-powered recruitment platform.
          </p>
          <div className="mt-10 flex justify-center space-x-6">
            <Button size="lg" onClick={() => navigate("/auth")} className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Find Jobs</span>
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/auth")} className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5" />
              <span>Post Jobs</span>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">For Job Seekers</h3>
            <p className="text-gray-600">Create your profile, browse opportunities, and apply to jobs that match your skills and preferences.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <Briefcase className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">For Employers</h3>
            <p className="text-gray-600">Post job openings, manage applications, and find the perfect candidates for your team.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Matching</h3>
            <p className="text-gray-600">Our intelligent system helps match candidates with the right opportunities based on skills and experience.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
