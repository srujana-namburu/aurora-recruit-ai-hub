
import React, { useState } from 'react';
import { Upload, FileText, Star, TrendingUp, Zap, Download, Eye, Brain, Target, Award, Sparkles } from 'lucide-react';

const ResumeMatcherAI: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedResumes, setUploadedResumes] = useState([
    {
      id: 1,
      name: 'John_Doe_Resume.pdf',
      score: 96,
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      experience: '5 years',
      status: 'Exceptional Match',
      aiInsights: 'Perfect technical alignment'
    },
    {
      id: 2,
      name: 'Sarah_Johnson_CV.pdf',
      score: 89,
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
      experience: '4 years',
      status: 'Strong Match',
      aiInsights: 'Excellent backend expertise'
    },
    {
      id: 3,
      name: 'Mike_Wilson_Resume.pdf',
      score: 76,
      skills: ['Java', 'Spring', 'MySQL', 'Jenkins'],
      experience: '3 years',
      status: 'Good Match',
      aiInsights: 'Solid foundation, room for growth'
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
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-rich-burgundy bg-gradient-to-r from-rich-burgundy/10 to-warm-amber/10';
    if (score >= 80) return 'text-warm-amber bg-gradient-to-r from-warm-amber/10 to-soft-lavender/10';
    return 'text-charcoal-slate bg-soft-lavender/20';
  };

  const getStatusColor = (status: string) => {
    if (status === 'Exceptional Match') return 'bg-gradient-to-r from-rich-burgundy to-warm-amber';
    if (status === 'Strong Match') return 'bg-gradient-to-r from-warm-amber to-soft-lavender';
    return 'bg-gradient-to-r from-soft-lavender to-charcoal-slate';
  };

  return (
    <div className="p-8 space-y-8 min-h-screen bg-gradient-to-br from-pearl-white to-soft-lavender/20">
      <div className="flex justify-between items-center animate-fade-in-up">
        <div>
          <h2 className="text-3xl font-bold text-elegant-gradient mb-2">Resume Matcher AI</h2>
          <p className="text-charcoal-slate/70 font-medium tracking-wide">Precision matching with intelligent analysis</p>
        </div>
        <div className="flex items-center space-x-3 lavender-highlight px-6 py-3 rounded-2xl">
          <Brain className="h-5 w-5 text-rich-burgundy smooth-pulse" />
          <span className="font-semibold text-rich-burgundy">AI Powered</span>
          <Sparkles className="h-4 w-4 text-warm-amber gentle-float" />
        </div>
      </div>

      {/* Elegant Upload Section */}
      <div
        className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-500 elegant-card ${
          dragActive 
            ? 'border-rich-burgundy bg-rich-burgundy/5 scale-102 shadow-2xl' 
            : 'border-soft-lavender/50 hover:border-rich-burgundy/50 hover:bg-rich-burgundy/5'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="animate-scale-in">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-rich-burgundy to-warm-amber rounded-3xl flex items-center justify-center shadow-lg">
            <Upload className="h-10 w-10 text-white gentle-float" />
          </div>
          <h3 className="text-2xl font-bold text-charcoal-slate mb-4">Upload Resumes for AI Analysis</h3>
          <p className="text-charcoal-slate/70 mb-8 text-lg leading-relaxed">Drop files here for intelligent matching, or browse to select</p>
          <button className="minimalist-button px-10 py-4 rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl">
            <span className="font-semibold">Choose Files</span>
          </button>
          <p className="text-sm text-charcoal-slate/60 mt-6 font-medium">Supports PDF, DOC, DOCX • Maximum 10MB per file</p>
        </div>
      </div>

      {/* Elegant Analysis Results */}
      <div className="elegant-card rounded-3xl p-8 animate-fade-in-up">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h3 className="text-2xl font-bold text-charcoal-slate">AI Analysis Results</h3>
            <Award className="h-6 w-6 text-warm-amber morph-icon" />
          </div>
          <div className="flex items-center space-x-3 text-sm text-rich-burgundy font-semibold lavender-highlight px-4 py-2 rounded-2xl">
            <TrendingUp className="h-4 w-4 smooth-pulse" />
            <span>Ranked by AI Score</span>
          </div>
        </div>

        <div className="space-y-6">
          {uploadedResumes.map((resume, index) => (
            <div
              key={resume.id}
              className="border border-soft-lavender/30 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 elegant-card animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rich-burgundy to-warm-amber rounded-2xl flex items-center justify-center shadow-lg">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-slate text-lg">{resume.name}</h4>
                    <p className="text-charcoal-slate/70 font-medium">{resume.experience} experience • {resume.aiInsights}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className={`px-6 py-3 rounded-2xl text-lg font-bold ${getScoreColor(resume.score)} shadow-lg`}>
                    {resume.score}%
                  </div>
                  <div className="flex space-x-3">
                    <button className="p-3 rounded-2xl hover:bg-soft-lavender/30 transition-all duration-300 hover:scale-110">
                      <Eye size={18} className="text-charcoal-slate morph-icon" />
                    </button>
                    <button className="p-3 rounded-2xl hover:bg-soft-lavender/30 transition-all duration-300 hover:scale-110">
                      <Download size={18} className="text-charcoal-slate morph-icon" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-charcoal-slate tracking-wide">AI Match Score</span>
                  <span className={`text-xs px-4 py-2 rounded-full text-white font-semibold ${getStatusColor(resume.status)}`}>
                    {resume.status}
                  </span>
                </div>
                <div className="w-full bg-soft-lavender/30 rounded-full h-4 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-rich-burgundy to-warm-amber h-4 rounded-full transition-all duration-1000 ease-out relative elegant-shimmer"
                    style={{ 
                      width: `${resume.score}%`,
                      animationDelay: `${index * 0.3}s`
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <span className="text-sm font-semibold text-charcoal-slate mb-4 block tracking-wide">Key Skills Analysis</span>
                <div className="flex flex-wrap gap-3">
                  {resume.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-4 py-2 lavender-highlight text-rich-burgundy rounded-2xl text-sm font-semibold hover:scale-105 transition-all duration-300 animate-fade-in-up"
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

      {/* Elegant AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="elegant-gradient rounded-3xl p-8 text-white animate-scale-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Top Candidate</h3>
            <Star className="h-7 w-7 gentle-float" />
          </div>
          <p className="text-3xl font-bold mb-3">John Doe</p>
          <p className="text-white/80 mb-4">96% AI match score</p>
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span className="text-sm">Exceptional alignment</span>
          </div>
        </div>

        <div className="elegant-card rounded-3xl p-8 animate-slide-in-right">
          <h3 className="text-xl font-bold text-charcoal-slate mb-6">Skills Analysis</h3>
          <div className="space-y-4">
            {[
              { skill: 'React', percentage: 95 },
              { skill: 'TypeScript', percentage: 88 },
              { skill: 'Node.js', percentage: 82 }
            ].map((item, index) => (
              <div key={item.skill} className="flex justify-between items-center">
                <span className="text-sm text-charcoal-slate font-medium">{item.skill}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-20 bg-soft-lavender/30 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-rich-burgundy to-warm-amber h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${item.percentage}%`, animationDelay: `${index * 0.2}s` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-rich-burgundy min-w-[40px]">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="elegant-card rounded-3xl p-8 animate-fade-in-up">
          <h3 className="text-xl font-bold text-charcoal-slate mb-6">AI Recommendations</h3>
          <div className="space-y-4">
            {[
              { text: 'Schedule immediate interview with John Doe', priority: 'high', icon: Star },
              { text: 'Consider Sarah for backend role assessment', priority: 'medium', icon: Target },
              { text: 'Mike requires additional skill evaluation', priority: 'low', icon: Brain }
            ].map((rec, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  rec.priority === 'high' ? 'bg-rich-burgundy' : 
                  rec.priority === 'medium' ? 'bg-warm-amber' : 'bg-soft-lavender'
                }`}>
                  <rec.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm text-charcoal-slate leading-relaxed font-medium">{rec.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeMatcherAI;
