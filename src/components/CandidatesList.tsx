
import React from 'react';
import { useCandidates } from '@/hooks/useCandidates';
import { User, Mail, Phone, MapPin, Briefcase, ExternalLink, Plus } from 'lucide-react';

const CandidatesList: React.FC = () => {
  const { data: candidates, isLoading, error } = useCandidates();

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-soft-lavender/30 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-soft-lavender/30 rounded-3xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="elegant-card rounded-3xl p-12 text-center">
          <User className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-charcoal-slate mb-2">Error Loading Candidates</h3>
          <p className="text-charcoal-slate/70">Please try again later or contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 min-h-screen bg-gradient-to-br from-pearl-white to-soft-lavender/20">
      <div className="flex justify-between items-center animate-fade-in-up">
        <div>
          <h2 className="text-3xl font-bold text-elegant-gradient mb-2">Candidate Database</h2>
          <p className="text-charcoal-slate/70 font-medium tracking-wide">Manage your talent pool with AI-powered insights</p>
        </div>
        <button className="minimalist-button px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-3 shadow-xl">
          <Plus size={18} />
          <span className="font-semibold">Add Candidate</span>
        </button>
      </div>

      {candidates && candidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate, index) => (
            <div
              key={candidate.id}
              className="elegant-card rounded-3xl p-6 hover:shadow-xl transition-all duration-300 animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-rich-burgundy to-warm-amber rounded-2xl flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal-slate text-lg group-hover:text-rich-burgundy transition-colors">
                      {candidate.first_name} {candidate.last_name}
                    </h3>
                    {candidate.current_title && (
                      <p className="text-charcoal-slate/70 text-sm font-medium">{candidate.current_title}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-rich-burgundy" />
                  <span className="text-sm text-charcoal-slate font-medium">{candidate.email}</span>
                </div>
                
                {candidate.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-rich-burgundy" />
                    <span className="text-sm text-charcoal-slate font-medium">{candidate.phone}</span>
                  </div>
                )}
                
                {candidate.location && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-rich-burgundy" />
                    <span className="text-sm text-charcoal-slate font-medium">{candidate.location}</span>
                  </div>
                )}
                
                {candidate.current_company && (
                  <div className="flex items-center space-x-3">
                    <Briefcase className="h-4 w-4 text-rich-burgundy" />
                    <span className="text-sm text-charcoal-slate font-medium">{candidate.current_company}</span>
                  </div>
                )}
              </div>

              {candidate.skills && (
                <div className="mb-6">
                  <p className="text-sm font-semibold text-charcoal-slate mb-3">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(candidate.skills) ? candidate.skills : []).slice(0, 3).map((skill: string, skillIndex: number) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 lavender-highlight text-rich-burgundy rounded-full text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                    {Array.isArray(candidate.skills) && candidate.skills.length > 3 && (
                      <span className="px-3 py-1 lavender-highlight text-charcoal-slate rounded-full text-xs font-semibold">
                        +{candidate.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <button className="flex-1 bg-gradient-to-r from-rich-burgundy to-warm-amber text-white py-2 px-4 rounded-2xl hover:scale-105 transition-all duration-300 text-sm font-semibold">
                  View Profile
                </button>
                {candidate.resume_url && (
                  <button className="p-2 lavender-highlight rounded-2xl hover:scale-105 transition-all duration-300">
                    <ExternalLink className="h-4 w-4 text-rich-burgundy" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="elegant-card rounded-3xl p-12 text-center">
          <User className="h-16 w-16 text-soft-lavender mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-charcoal-slate mb-4">No Candidates Yet</h3>
          <p className="text-charcoal-slate/70 font-medium leading-relaxed mb-8">
            Start building your talent pool by adding candidates or wait for applications to come in.
          </p>
          <button className="minimalist-button px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-300">
            Add Your First Candidate
          </button>
        </div>
      )}
    </div>
  );
};

export default CandidatesList;
