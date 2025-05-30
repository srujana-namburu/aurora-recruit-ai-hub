
import React, { useState } from 'react';
import { Plus, MapPin, Clock, Users, DollarSign, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';

const JobPostings: React.FC = () => {
  const [jobs] = useState([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80k - $120k',
      applicants: 45,
      status: 'Active',
      posted: '2 days ago',
      deadline: '30 days left'
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$100k - $150k',
      applicants: 32,
      status: 'Active',
      posted: '5 days ago',
      deadline: '25 days left'
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$70k - $100k',
      applicants: 28,
      status: 'Draft',
      posted: '1 week ago',
      deadline: '20 days left'
    },
    {
      id: 4,
      title: 'Data Scientist',
      department: 'Analytics',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90k - $130k',
      applicants: 67,
      status: 'Active',
      posted: '3 days ago',
      deadline: '28 days left'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-emerald text-white';
      case 'Draft': return 'bg-yellow-500 text-white';
      case 'Closed': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-midnight">Job Postings</h2>
          <p className="text-gray-600 mt-1">Manage your open positions</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-emerald text-white px-6 py-3 rounded-lg hover:bg-emerald/90 transition-all duration-200 flex items-center space-x-2 ripple-effect shadow-lg"
        >
          <Plus size={20} />
          <span>Create Job Posting</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobs.map((job, index) => (
          <div
            key={job.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift animate-fade-in group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-midnight mb-2 group-hover:text-emerald transition-colors">
                  {job.title}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {job.location}
                  </span>
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {job.type}
                  </span>
                </div>
              </div>
              <div className="relative">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Department</span>
                <span className="text-sm font-medium text-midnight">{job.department}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Salary Range</span>
                <span className="text-sm font-medium text-midnight">{job.salary}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Applications</span>
                <span className="text-sm font-bold text-emerald">{job.applicants}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                {job.status}
              </span>
              <span className="text-sm text-gray-500">{job.deadline}</span>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                <Eye size={16} />
                <span>View</span>
              </button>
              <button className="flex-1 bg-emerald text-white py-2 px-4 rounded-lg hover:bg-emerald/90 transition-colors flex items-center justify-center space-x-2">
                <Edit size={16} />
                <span>Edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-midnight">Create New Job Posting</h3>
              <p className="text-gray-600 mt-1">Fill in the details for your new position</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald"
                    placeholder="e.g. Senior Frontend Developer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald">
                    <option>Engineering</option>
                    <option>Product</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald"
                    placeholder="e.g. Remote, San Francisco"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald">
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                <textarea
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald"
                  placeholder="Describe the role, responsibilities, and requirements..."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald"
                    placeholder="e.g. $80k - $120k"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald focus:border-emerald"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="bg-emerald text-white px-6 py-2 rounded-lg hover:bg-emerald/90 transition-colors ripple-effect"
              >
                Create Job Posting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostings;
