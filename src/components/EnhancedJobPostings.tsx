
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, MoreVertical, Eye, Edit, Trash2, Plus, Users, Briefcase, DollarSign, UserCheck } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type JobPosting = {
  id: string;
  title: string;
  description: string;
  location: string | null;
  employment_type: string | null;
  salary_range_min: number | null;
  salary_range_max: number | null;
  status: string | null;
  expires_at: string | null;
  created_at: string;
  created_by: string;
  company_id: string;
  department?: string;
  application_count?: number;
};

type Application = {
  id: string;
  candidate_id: string;
  job_posting_id: string;
  status: string;
  applied_at: string;
  cover_letter?: string;
  candidate?: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    current_title?: string;
    experience_years?: number;
  };
};

const EnhancedJobPostings: React.FC = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      setLoading(true);
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      
      setCurrentUser(user);
      
      // Fetch jobs owned by current user
      await fetchOwnedJobs(user?.id);
    } catch (error: any) {
      console.error('Error initializing data:', error);
      toast({
        title: "Error",
        description: "Failed to load data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchOwnedJobs = async (userId?: string) => {
    try {
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .eq('created_by', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error: any) {
      console.error('Error fetching owned jobs:', error);
      toast({
        title: "Error",
        description: "Failed to load your job postings.",
        variant: "destructive"
      });
    }
  };

  const fetchApplicationsForJob = async (jobId: string) => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          candidate:candidates(
            first_name,
            last_name,
            email,
            phone,
            current_title,
            experience_years
          )
        `)
        .eq('job_posting_id', jobId)
        .order('applied_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error: any) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to load applications for this job.",
        variant: "destructive"
      });
    }
  };

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ 
          status: newStatus,
          stage_changed_at: new Date().toISOString(),
          stage_changed_by: currentUser?.id 
        })
        .eq('id', applicationId);

      if (error) throw error;

      // Refresh applications
      if (selectedJobId) {
        await fetchApplicationsForJob(selectedJobId);
      }

      toast({
        title: "Success",
        description: "Application status updated successfully!"
      });
    } catch (error: any) {
      console.error('Error updating application status:', error);
      toast({
        title: "Error",
        description: "Failed to update application status.",
        variant: "destructive"
      });
    }
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

  const statusOptions = [
    'applied', 'screening', 'phone_screen', 'technical_interview', 
    'final_interview', 'offer_sent', 'hired', 'rejected'
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Job Postings & Candidates</h1>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Create New Job
        </Button>
      </div>

      {jobs.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No job postings yet</h3>
            <p className="text-gray-500 mb-6">Create your first job posting to start attracting candidates.</p>
            <Button>Create Job Posting</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Jobs List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold">Your Jobs ({jobs.length})</h2>
            {jobs.map((job) => (
              <Card 
                key={job.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedJobId === job.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => {
                  setSelectedJobId(job.id);
                  fetchApplicationsForJob(job.id);
                }}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                      {job.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {job.location || 'Remote'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {job.application_count || 0} applications
                    </span>
                    <span>{new Date(job.created_at).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Applications for Selected Job */}
          <div className="lg:col-span-2">
            {selectedJobId ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    Candidates ({applications.length})
                  </h2>
                  <Button variant="outline" size="sm">
                    Export Candidates
                  </Button>
                </div>

                {applications.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                      <p className="text-gray-500">Applications will appear here once candidates apply.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {applications.map((application) => (
                      <Card key={application.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-lg">
                                  {application.candidate?.first_name} {application.candidate?.last_name}
                                </h3>
                                <Badge className={getStatusColor(application.status)}>
                                  {application.status?.replace('_', ' ').toUpperCase()}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">Email:</span>
                                  <span>{application.candidate?.email}</span>
                                </div>
                                {application.candidate?.phone && (
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">Phone:</span>
                                    <span>{application.candidate.phone}</span>
                                  </div>
                                )}
                                {application.candidate?.current_title && (
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">Current Role:</span>
                                    <span>{application.candidate.current_title}</span>
                                  </div>
                                )}
                                {application.candidate?.experience_years && (
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">Experience:</span>
                                    <span>{application.candidate.experience_years} years</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                                <Clock className="h-4 w-4" />
                                Applied on {new Date(application.applied_at).toLocaleDateString()}
                              </div>

                              {application.cover_letter && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-md">
                                  <p className="text-sm font-medium mb-1">Cover Letter:</p>
                                  <p className="text-sm text-gray-700 line-clamp-3">
                                    {application.cover_letter}
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            <div className="ml-4 space-y-2">
                              <select
                                value={application.status}
                                onChange={(e) => updateApplicationStatus(application.id, e.target.value)}
                                className="text-sm border rounded px-2 py-1"
                              >
                                {statusOptions.map(status => (
                                  <option key={status} value={status}>
                                    {status.replace('_', ' ').toUpperCase()}
                                  </option>
                                ))}
                              </select>
                              
                              <div className="flex gap-1">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a job posting</h3>
                  <p className="text-gray-500">Choose a job from the left to view and manage candidates.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedJobPostings;
