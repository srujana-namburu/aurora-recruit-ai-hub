
import { useJobSeekerProfile, useCreateJobSeekerProfile, useUpdateJobSeekerProfile } from '@/hooks/useJobSeekerProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { User, Save, Upload } from 'lucide-react';

export const JobSeekerProfile = () => {
  const { data: profile, isLoading } = useJobSeekerProfile();
  const createProfile = useCreateJobSeekerProfile();
  const updateProfile = useUpdateJobSeekerProfile();
  
  const [formData, setFormData] = useState({
    resume_url: '',
    skills: [] as string[],
    experience_summary: '',
    preferred_location: '',
    preferred_salary_min: '',
    preferred_salary_max: '',
    availability_date: ''
  });

  const [skillsInput, setSkillsInput] = useState('');

  useEffect(() => {
    if (profile) {
      setFormData({
        resume_url: profile.resume_url || '',
        skills: profile.skills || [],
        experience_summary: profile.experience_summary || '',
        preferred_location: profile.preferred_location || '',
        preferred_salary_min: profile.preferred_salary_min?.toString() || '',
        preferred_salary_max: profile.preferred_salary_max?.toString() || '',
        availability_date: profile.availability_date || ''
      });
      setSkillsInput((profile.skills || []).join(', '));
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillsChange = (value: string) => {
    setSkillsInput(value);
    const skillsArray = value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setFormData(prev => ({ ...prev, skills: skillsArray }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const profileData = {
      ...formData,
      preferred_salary_min: formData.preferred_salary_min ? parseFloat(formData.preferred_salary_min) : null,
      preferred_salary_max: formData.preferred_salary_max ? parseFloat(formData.preferred_salary_max) : null,
      availability_date: formData.availability_date || null
    };

    try {
      if (profile) {
        await updateProfile.mutateAsync(profileData);
      } else {
        await createProfile.mutateAsync(profileData);
      }
    } catch (error) {
      // Error handling is done in the hooks
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <User className="w-6 h-6" />
        <h2 className="text-2xl font-bold">My Profile</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Complete your profile to help employers find you and improve your job recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Resume URL */}
            <div>
              <Label htmlFor="resume_url">Resume URL</Label>
              <div className="flex space-x-2 mt-1">
                <Input
                  id="resume_url"
                  type="url"
                  placeholder="https://example.com/my-resume.pdf"
                  value={formData.resume_url}
                  onChange={(e) => handleInputChange('resume_url', e.target.value)}
                />
                <Button type="button" variant="outline" size="icon">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Upload your resume to a cloud service and paste the public link here.
              </p>
            </div>

            {/* Skills */}
            <div>
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                placeholder="JavaScript, React, Node.js, Python..."
                value={skillsInput}
                onChange={(e) => handleSkillsChange(e.target.value)}
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                Separate skills with commas.
              </p>
            </div>

            {/* Experience Summary */}
            <div>
              <Label htmlFor="experience_summary">Experience Summary</Label>
              <Textarea
                id="experience_summary"
                placeholder="Brief summary of your professional experience..."
                value={formData.experience_summary}
                onChange={(e) => handleInputChange('experience_summary', e.target.value)}
                className="mt-1 min-h-[100px]"
              />
            </div>

            {/* Preferred Location */}
            <div>
              <Label htmlFor="preferred_location">Preferred Location</Label>
              <Input
                id="preferred_location"
                placeholder="New York, NY or Remote"
                value={formData.preferred_location}
                onChange={(e) => handleInputChange('preferred_location', e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Salary Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preferred_salary_min">Minimum Salary</Label>
                <Input
                  id="preferred_salary_min"
                  type="number"
                  placeholder="50000"
                  value={formData.preferred_salary_min}
                  onChange={(e) => handleInputChange('preferred_salary_min', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="preferred_salary_max">Maximum Salary</Label>
                <Input
                  id="preferred_salary_max"
                  type="number"
                  placeholder="80000"
                  value={formData.preferred_salary_max}
                  onChange={(e) => handleInputChange('preferred_salary_max', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Availability Date */}
            <div>
              <Label htmlFor="availability_date">Availability Date</Label>
              <Input
                id="availability_date"
                type="date"
                value={formData.availability_date}
                onChange={(e) => handleInputChange('availability_date', e.target.value)}
                className="mt-1"
              />
            </div>

            <Button 
              type="submit" 
              disabled={createProfile.isPending || updateProfile.isPending}
              className="flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>
                {createProfile.isPending || updateProfile.isPending 
                  ? 'Saving...' 
                  : 'Save Profile'
                }
              </span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
