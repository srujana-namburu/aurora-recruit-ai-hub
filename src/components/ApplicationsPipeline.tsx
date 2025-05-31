
import React from 'react';
import { useApplications } from '@/hooks/useApplications';
import { Users, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

const ApplicationsPipeline: React.FC = () => {
  const { data: applications, isLoading, error } = useApplications();

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-soft-lavender/30 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-soft-lavender/30 rounded-2xl"></div>
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
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-charcoal-slate mb-2">Error Loading Applications</h3>
          <p className="text-charcoal-slate/70">Please try again later or contact support.</p>
        </div>
      </div>
    );
  }

  const stages = [
    { name: 'Applied', status: 'applied', icon: Users, color: 'from-soft-lavender to-charcoal-slate' },
    { name: 'Screening', status: 'screening', icon: Clock, color: 'from-warm-amber to-soft-lavender' },
    { name: 'Interview', status: 'technical_interview', icon: TrendingUp, color: 'from-rich-burgundy to-warm-amber' },
    { name: 'Hired', status: 'hired', icon: CheckCircle, color: 'from-charcoal-slate to-rich-burgundy' }
  ];

  const getApplicationsByStatus = (status: string) => {
    return applications?.filter(app => app.status === status) || [];
  };

  return (
    <div className="p-8 space-y-8 min-h-screen bg-gradient-to-br from-pearl-white to-soft-lavender/20">
      <div className="animate-fade-in-up">
        <h2 className="text-3xl font-bold text-elegant-gradient mb-2">Applications Pipeline</h2>
        <p className="text-charcoal-slate/70 font-medium tracking-wide">Track candidate progress through your hiring process</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const stageApplications = getApplicationsByStatus(stage.status);
          
          return (
            <div
              key={stage.name}
              className="elegant-card rounded-3xl p-6 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stage.color} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-3xl font-bold text-charcoal-slate">{stageApplications.length}</span>
              </div>
              
              <h3 className="text-lg font-bold text-charcoal-slate mb-4">{stage.name}</h3>
              
              <div className="space-y-3">
                {stageApplications.slice(0, 3).map((application) => (
                  <div key={application.id} className="lavender-highlight rounded-2xl p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-charcoal-slate text-sm">
                          {application.candidate?.first_name} {application.candidate?.last_name}
                        </p>
                        <p className="text-xs text-charcoal-slate/70 mt-1">
                          {application.job_posting?.title}
                        </p>
                        {application.ai_match_score && (
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="w-12 bg-soft-lavender/30 rounded-full h-1">
                              <div 
                                className="bg-gradient-to-r from-rich-burgundy to-warm-amber h-1 rounded-full"
                                style={{ width: `${application.ai_match_score}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-bold text-rich-burgundy">{application.ai_match_score}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {stageApplications.length > 3 && (
                  <div className="text-center">
                    <span className="text-sm text-charcoal-slate/60 font-medium">
                      +{stageApplications.length - 3} more
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {applications && applications.length === 0 && (
        <div className="elegant-card rounded-3xl p-12 text-center">
          <Users className="h-16 w-16 text-soft-lavender mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-charcoal-slate mb-4">No Applications Yet</h3>
          <p className="text-charcoal-slate/70 font-medium leading-relaxed">
            Once candidates start applying to your job postings, you'll see their progress here.
          </p>
        </div>
      )}
    </div>
  );
};

export default ApplicationsPipeline;
