
import { useJobSeekerProfile } from '@/hooks/useJobSeekerProfile';
import { useJobSeekerApplications } from '@/hooks/useJobSeekerApplications';
import { useJobPostings } from '@/hooks/useJobPostings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, FileText, User, Search } from 'lucide-react';
import { useState } from 'react';
import { JobSearchFilters } from './JobSearchFilters';
import { JobCard } from './JobCard';
import { JobSeekerProfile } from './JobSeekerProfile';

export const JobSeekerDashboard = () => {
  const [activeTab, setActiveTab] = useState('browse');
  const { data: profile } = useJobSeekerProfile();
  const { data: applications } = useJobSeekerApplications();
  const { data: jobPostings } = useJobPostings();
  const [filteredJobs, setFilteredJobs] = useState(jobPostings);

  const activeJobs = jobPostings?.filter(job => job.status === 'active') || [];
  const recentApplications = applications?.slice(0, 5) || [];

  const handleFilterChange = (filters: any) => {
    let filtered = activeJobs;

    if (filters.location) {
      filtered = filtered.filter(job => 
        job.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.employmentType.length > 0) {
      filtered = filtered.filter(job => 
        filters.employmentType.includes(job.employment_type)
      );
    }

    if (filters.experienceLevel.length > 0) {
      filtered = filtered.filter(job => 
        filters.experienceLevel.includes(job.experience_level)
      );
    }

    if (filters.salaryRange[0] > 0 || filters.salaryRange[1] < 200000) {
      filtered = filtered.filter(job => {
        const minSalary = job.salary_range_min || 0;
        const maxSalary = job.salary_range_max || 200000;
        return minSalary >= filters.salaryRange[0] && maxSalary <= filters.salaryRange[1];
      });
    }

    if (filters.remoteOnly) {
      filtered = filtered.filter(job => job.remote_allowed);
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term)
      );
    }

    setFilteredJobs(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'screening': return 'bg-yellow-100 text-yellow-800';
      case 'phone_screen': return 'bg-purple-100 text-purple-800';
      case 'technical_interview': return 'bg-orange-100 text-orange-800';
      case 'final_interview': return 'bg-indigo-100 text-indigo-800';
      case 'offer_sent': return 'bg-green-100 text-green-800';
      case 'hired': return 'bg-green-500 text-white';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Job Seeker Dashboard</h1>
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'browse' ? 'default' : 'outline'}
            onClick={() => setActiveTab('browse')}
            className="flex items-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Browse Jobs</span>
          </Button>
          <Button
            variant={activeTab === 'applications' ? 'default' : 'outline'}
            onClick={() => setActiveTab('applications')}
            className="flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>My Applications</span>
          </Button>
          <Button
            variant={activeTab === 'profile' ? 'default' : 'outline'}
            onClick={() => setActiveTab('profile')}
            className="flex items-center space-x-2"
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeJobs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications?.length || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Status</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {profile ? 'Complete' : 'Incomplete'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      {activeTab === 'browse' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <JobSearchFilters onFilterChange={handleFilterChange} />
          </div>
          <div className="lg:col-span-3">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                {filteredJobs ? `${filteredJobs.length} Jobs Found` : `${activeJobs.length} Jobs Available`}
              </h2>
              {(filteredJobs || activeJobs).map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">My Applications</h2>
          {applications && applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map((application) => (
                <Card key={application.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{application.job_posting?.title}</CardTitle>
                        <CardDescription>
                          Applied on {new Date(application.applied_at || '').toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(application.status || 'applied')}>
                        {application.status?.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">
                      {application.job_posting?.location} • {application.job_posting?.employment_type}
                    </p>
                    {application.cover_letter && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Cover Letter:</h4>
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                          {application.cover_letter}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                <p className="text-gray-500 mb-4">Start browsing jobs to submit your first application.</p>
                <Button onClick={() => setActiveTab('browse')}>Browse Jobs</Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'profile' && <JobSeekerProfile />}
    </div>
  );
};
