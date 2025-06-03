
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSubmitJobApplication } from '@/hooks/useJobSeekerApplications';
import { MapPin, Clock, DollarSign, Building, Calendar } from 'lucide-react';
import { useState } from 'react';

interface JobCardProps {
  job: any;
}

export const JobCard = ({ job }: JobCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const submitApplication = useSubmitJobApplication();

  const handleApply = async () => {
    try {
      await submitApplication.mutateAsync({
        jobPostingId: job.id,
        coverLetter: coverLetter.trim() || undefined
      });
      setIsDialogOpen(false);
      setCoverLetter('');
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Salary not specified';
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    if (min) return `From $${min.toLocaleString()}`;
    if (max) return `Up to $${max.toLocaleString()}`;
    return 'Salary not specified';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <CardDescription className="flex items-center space-x-4 text-sm">
              <span className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location || 'Location not specified'}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Building className="w-4 h-4" />
                <span>{job.department || 'Department not specified'}</span>
              </span>
            </CardDescription>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge variant="secondary">
              {job.employment_type?.replace('_', ' ').toUpperCase() || 'FULL TIME'}
            </Badge>
            {job.remote_allowed && (
              <Badge variant="outline">Remote Friendly</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-700 line-clamp-3">{job.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="flex items-center space-x-1">
            <DollarSign className="w-4 h-4" />
            <span>{formatSalary(job.salary_range_min, job.salary_range_max)}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>Posted {formatDate(job.created_at)}</span>
          </span>
        </div>

        {job.experience_level && (
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {job.experience_level.charAt(0).toUpperCase() + job.experience_level.slice(1)} level
            </span>
          </div>
        )}

        <div className="flex justify-between items-center pt-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Apply Now</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Apply for {job.title}</DialogTitle>
                <DialogDescription>
                  Submit your application for this position. A cover letter is optional but recommended.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cover-letter">Cover Letter (Optional)</Label>
                  <Textarea
                    id="cover-letter"
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="mt-1 min-h-[120px]"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleApply}
                    disabled={submitApplication.isPending}
                  >
                    {submitApplication.isPending ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <span className="text-sm text-gray-500">
            {job.application_count || 0} applications
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
