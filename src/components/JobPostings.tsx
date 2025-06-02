import React, { useState, useEffect } from 'react';
import { MapPin, Clock, MoreVertical, Eye, Edit, Trash2, Plus, Users, Briefcase, DollarSign } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import toast from 'react-hot-toast';

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

type JobFormData = {
  title: string;
  description: string;
  location: string;
  employment_type: string;
  salary_range_min: string;
  salary_range_max: string;
  status: string;
  expires_at: string;
  department: string;
};

const JobPostings: React.FC = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  
  // Separate state for create job form
  const [newJob, setNewJob] = useState<JobFormData>({
    title: '',
    description: '',
    location: '',
    employment_type: '',
    salary_range_min: '',
    salary_range_max: '',
    status: 'active',
    expires_at: '',
    department: ''
  });
  
  // Separate state for edit job form
  const [editJob, setEditJob] = useState<JobFormData>({
    title: '',
    description: '',
    location: '',
    employment_type: '',
    salary_range_min: '',
    salary_range_max: '',
    status: 'active',
    expires_at: '',
    department: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching jobs:', error);
        toast.error('Failed to load job postings');
        return;
      }

      setJobs(data || []);
    } catch (error: any) {
      console.error('Error:', error.message);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewJob(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditJob(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateJob = async () => {
    // Validate required fields
    if (!newJob.title.trim()) {
      toast.error('Job title is required');
      return;
    }
    
    if (!newJob.description.trim()) {
      toast.error('Job description is required');
      return;
    }

    if (!newJob.employment_type) {
      toast.error('Employment type is required');
      return;
    }

    if (!newJob.department) {
      toast.error('Department is required');
      return;
    }
    
    // These should be valid UUIDs that exist in your users and companies tables
    // For development purposes, using hardcoded UUIDs that match existing records
    const userId = '74757499-d5a8-48bc-88e1-e5b36e674d6d'; // Valid UUID for users table
    const companyId = '8f8e4463-42a3-4d50-8c7d-e7a641a8bfdb'; // Valid UUID for companies table
    
    try {
      const { data, error } = await supabase
        .from('job_postings')
        .insert({
          title: newJob.title,
          description: newJob.description,
          location: newJob.location || null,
          employment_type: newJob.employment_type as "full_time" | "part_time" | "contract" | "internship" | null,
          salary_range_min: newJob.salary_range_min ? Number(newJob.salary_range_min) : null,
          salary_range_max: newJob.salary_range_max ? Number(newJob.salary_range_max) : null,
          status: (newJob.status || 'active') as "active" | "draft" | "paused" | "closed",
          expires_at: newJob.expires_at || null,
          created_by: userId, // Valid UUID
          company_id: companyId, // Valid UUID
          department: newJob.department
        })
        .select();

      if (error) {
        console.error('Error creating job posting:', error);
        toast.error(`Failed to create job posting: ${error.message}`);
        return;
      }

      toast.success('Job posting created successfully');
      setNewJob({
        title: '',
        description: '',
        location: '',
        employment_type: '',
        salary_range_min: '',
        salary_range_max: '',
        status: 'active',
        expires_at: '',
        department: ''
      });
      setShowCreateModal(false);
      fetchJobs();
    } catch (error: any) {
      console.error('Error:', error.message);
      toast.error(`Error: ${error.message}`);
    }
  };

  const prepareJobForEdit = (job: JobPosting) => {
    setSelectedJob(job);
    setEditJob({
      title: job.title,
      description: job.description,
      location: job.location || '',
      employment_type: job.employment_type || '',
      salary_range_min: job.salary_range_min?.toString() || '',
      salary_range_max: job.salary_range_max?.toString() || '',
      status: job.status || 'active',
      expires_at: job.expires_at || '',
      department: job.department || ''
    });
    setShowEditModal(true);
  };

  const handleEditJob = async () => {
    if (!selectedJob) {
      toast.error('No job selected for editing');
      return;
    }
    
    if (!editJob.title.trim()) {
      toast.error('Job title is required');
      return;
    }
    
    if (!editJob.description.trim()) {
      toast.error('Job description is required');
      return;
    }

    if (!editJob.employment_type) {
      toast.error('Employment type is required');
      return;
    }

    if (!editJob.department) {
      toast.error('Department is required');
      return;
    }
    
    try {
      const { error } = await supabase
        .from('job_postings')
        .update({
          title: editJob.title,
          description: editJob.description,
          location: editJob.location || null,
          employment_type: editJob.employment_type as "full_time" | "part_time" | "contract" | "internship" | null,
          salary_range_min: editJob.salary_range_min ? Number(editJob.salary_range_min) : null,
          salary_range_max: editJob.salary_range_max ? Number(editJob.salary_range_max) : null,
          status: (editJob.status || 'active') as "active" | "draft" | "paused" | "closed",
          expires_at: editJob.expires_at || null,
          department: editJob.department
        })
        .eq('id', selectedJob.id);
      
      if (error) {
        console.error('Error updating job posting:', error);
        toast.error(`Error updating job: ${error.message}`);
        return;
      }
      
      toast.success('Job posting updated successfully!');
      setEditJob({
        title: '',
        description: '',
        location: '',
        employment_type: '',
        salary_range_min: '',
        salary_range_max: '',
        status: 'active',
        expires_at: '',
        department: ''
      });
      setSelectedJob(null);
      setShowEditModal(false);
      fetchJobs();
    } catch (error: any) {
      console.error('Error:', error.message);
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      const { error } = await supabase
        .from('job_postings')
        .delete()
        .eq('id', jobId);

      if (error) {
        console.error('Error deleting job posting:', error);
        toast.error('Failed to delete job posting');
        return;
      }

      toast.success('Job posting deleted successfully');
      setShowDeleteConfirm(false);
      setSelectedJob(null);
      fetchJobs();
    } catch (error: any) {
      console.error('Error:', error.message);
      toast.error(`Error: ${error.message}`);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Active</span>;
      case 'draft':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Draft</span>;
      case 'paused':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Paused</span>;
      case 'closed':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Closed</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Postings</h1>
        <button
          onClick={() => {
            setNewJob({
              title: '',
              description: '',
              location: '',
              employment_type: '',
              salary_range_min: '',
              salary_range_max: '',
              status: 'active',
              expires_at: '',
              department: ''
            });
            setShowCreateModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={16} />
          <span>Create Job</span>
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading job postings...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <Briefcase className="text-gray-400" size={48} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No job postings yet</h3>
          <p className="text-gray-500 mb-6">Create your first job posting to start attracting candidates.</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus size={16} />
            <span>Create Job</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{job.title}</h3>
                  {getStatusBadge(job.status)}
                </div>
                
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  {job.location && (
                    <div className="flex items-center mr-4">
                      <MapPin size={14} className="mr-1" />
                      <span>{job.location}</span>
                    </div>
                  )}
                  
                  {job.department && (
                    <div className="flex items-center">
                      <Users size={14} className="mr-1" />
                      <span>{job.department}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  {job.employment_type && (
                    <div className="flex items-center mr-4">
                      <Briefcase size={14} className="mr-1" />
                      <span>
                        {job.employment_type === 'full_time' ? 'Full Time' : 
                         job.employment_type === 'part_time' ? 'Part Time' : 
                         job.employment_type === 'contract' ? 'Contract' : 
                         job.employment_type === 'internship' ? 'Internship' : job.employment_type}
                      </span>
                    </div>
                  )}
                  
                  {(job.salary_range_min || job.salary_range_max) && (
                    <div className="flex items-center">
                      <DollarSign size={14} className="mr-1" />
                      <span>
                        {job.salary_range_min && job.salary_range_max 
                          ? `$${job.salary_range_min.toLocaleString()} - $${job.salary_range_max.toLocaleString()}`
                          : job.salary_range_min
                            ? `From $${job.salary_range_min.toLocaleString()}`
                            : job.salary_range_max
                              ? `Up to $${job.salary_range_max.toLocaleString()}`
                              : ''}
                      </span>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{job.description}</p>
                
                <div className="flex items-center text-gray-500 text-xs mb-4">
                  <Clock size={14} className="mr-1" />
                  <span>Posted {formatDate(job.created_at)}</span>
                  
                  {job.expires_at && (
                    <>
                      <span className="mx-2">•</span>
                      <span>Expires {formatDate(job.expires_at)}</span>
                    </>
                  )}
                </div>
                
                <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors" title="View Details">
                    <Eye size={18} />
                  </button>
                  <button 
                    onClick={() => prepareJobForEdit(job)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors" 
                    title="Edit Job"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedJob(job);
                      setShowDeleteConfirm(true);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors" 
                    title="Delete Job"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Create New Job Posting</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  &times;
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newJob.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md placeholder-gray-500"
                    placeholder="e.g., Senior Software Engineer"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={newJob.department}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md placeholder-gray-500"
                    placeholder="e.g., Engineering"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={newJob.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md placeholder-gray-500"
                    placeholder="e.g., San Francisco, CA (Remote)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employment Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="employment_type"
                    value={newJob.employment_type}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select employment type</option>
                    <option value="full_time">Full Time</option>
                    <option value="part_time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salary Range (Min)
                    </label>
                    <input
                      type="number"
                      name="salary_range_min"
                      value={newJob.salary_range_min}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="e.g., 80000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salary Range (Max)
                    </label>
                    <input
                      type="number"
                      name="salary_range_max"
                      value={newJob.salary_range_max}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="e.g., 120000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    name="expires_at"
                    value={newJob.expires_at}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={newJob.status}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="paused">Paused</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={newJob.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={5}
                    placeholder="Provide a detailed description of the job..."
                    required
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateJob}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Job Posting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {showEditModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Edit Job Posting</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  &times;
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editJob.title}
                    onChange={handleEditInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md placeholder-gray-500"
                    placeholder="e.g., Senior Software Engineer"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={editJob.department}
                    onChange={handleEditInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md placeholder-gray-500"
                    placeholder="e.g., Engineering"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={editJob.location}
                    onChange={handleEditInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md placeholder-gray-500"
                    placeholder="e.g., San Francisco, CA (Remote)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employment Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="employment_type"
                    value={editJob.employment_type}
                    onChange={handleEditInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select employment type</option>
                    <option value="full_time">Full Time</option>
                    <option value="part_time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salary Range (Min)
                    </label>
                    <input
                      type="number"
                      name="salary_range_min"
                      value={editJob.salary_range_min}
                      onChange={handleEditInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="e.g., 80000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salary Range (Max)
                    </label>
                    <input
                      type="number"
                      name="salary_range_max"
                      value={editJob.salary_range_max}
                      onChange={handleEditInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="e.g., 120000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    name="expires_at"
                    value={editJob.expires_at}
                    onChange={handleEditInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={editJob.status}
                    onChange={handleEditInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="paused">Paused</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={editJob.description}
                    onChange={handleEditInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={5}
                    placeholder="Provide a detailed description of the job..."
                    required
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditJob}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update Job Posting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the job posting <span className="font-semibold">"{selectedJob.title}"</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setSelectedJob(null);
                  setShowDeleteConfirm(false);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteJob(selectedJob.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostings;
