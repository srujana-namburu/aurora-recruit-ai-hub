
import React, { useState } from 'react';
import { Upload, FileText, Star, TrendingUp, Zap, Download, Eye } from 'lucide-react';

const ResumeMatcherAI: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedResumes, setUploadedResumes] = useState([
    {
      id: 1,
      name: 'John_Doe_Resume.pdf',
      score: 92,
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      experience: '5 years',
      status: 'Excellent Match'
    },
    {
      id: 2,
      name: 'Sarah_Johnson_CV.pdf',
      score: 87,
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
      experience: '4 years',
      status: 'Good Match'
    },
    {
      id: 3,
      name: 'Mike_Wilson_Resume.pdf',
      score: 73,
      skills: ['Java', 'Spring', 'MySQL', 'Jenkins'],
      experience: '3 years',
      status: 'Fair Match'
    }
  ]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload logic here
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Excellent Match') return 'bg-green-500';
    if (status === 'Good Match') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-midnight">Resume Matcher AI</h2>
          <p className="text-gray-600 mt-1">AI-powered resume analysis and candidate ranking</p>
        </div>
        <div className="flex items-center space-x-2 text-emerald">
          <Zap size={20} />
          <span className="font-medium">AI Powered</span>
        </div>
      </div>

      {/* Upload Section */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          dragActive 
            ? 'border-emerald bg-emerald/5 scale-105' 
            : 'border-gray-300 hover:border-emerald hover:bg-emerald/5'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="animate-fade-in">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-midnight mb-2">Upload Resumes for Analysis</h3>
          <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
          <button className="bg-emerald text-white px-6 py-2 rounded-lg hover:bg-emerald/90 transition-colors ripple-effect">
            Choose Files
          </button>
          <p className="text-sm text-gray-500 mt-2">Supports PDF, DOC, DOCX files up to 10MB</p>
        </div>
      </div>

      {/* Analysis Results */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-midnight">Analysis Results</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <TrendingUp size={16} />
            <span>Ranked by AI Score</span>
          </div>
        </div>

        <div className="space-y-4">
          {uploadedResumes.map((resume, index) => (
            <div
              key={resume.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-emerald" />
                  <div>
                    <h4 className="font-medium text-midnight">{resume.name}</h4>
                    <p className="text-sm text-gray-600">{resume.experience} experience</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(resume.score)}`}>
                    {resume.score}%
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                      <Eye size={16} className="text-gray-600" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                      <Download size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Match Score</span>
                  <span className={`text-xs px-2 py-1 rounded-full text-white ${getStatusColor(resume.status)}`}>
                    {resume.status}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald to-green-600 h-2 rounded-full animate-progress"
                    style={{ 
                      '--progress-width': `${resume.score}%`,
                      animationDelay: `${index * 0.2}s`
                    } as any}
                  ></div>
                </div>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-700 mb-2 block">Key Skills</span>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-emerald/10 text-emerald rounded-full text-sm font-medium animate-fade-in"
                      style={{ animationDelay: `${(index * 0.1) + (skillIndex * 0.05)}s` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-emerald to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Top Candidate</h3>
            <Star className="h-6 w-6" />
          </div>
          <p className="text-2xl font-bold mb-2">John Doe</p>
          <p className="text-emerald-100">92% match score</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-midnight mb-4">Skills Analysis</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">React</span>
              <span className="text-sm font-bold text-emerald">95%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">TypeScript</span>
              <span className="text-sm font-bold text-emerald">88%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Node.js</span>
              <span className="text-sm font-bold text-emerald">82%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-midnight mb-4">Recommendations</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-emerald rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-600">Consider John Doe for immediate interview</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-600">Sarah Johnson needs skills assessment</span>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-600">Mike Wilson requires additional training</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeMatcherAI;
