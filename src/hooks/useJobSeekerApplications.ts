
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useJobSeekerApplications = () => {
  return useQuery({
    queryKey: ['job-seeker-applications'],
    queryFn: async () => {
      console.log('Fetching job seeker applications...');
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          job_posting:job_postings(*)
        `)
        .eq('user_id', user.id)
        .order('applied_at', { ascending: false });

      if (error) {
        console.error('Error fetching job seeker applications:', error);
        throw error;
      }

      console.log('Job seeker applications fetched:', data);
      return data;
    }
  });
};

export const useSubmitJobApplication = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ jobPostingId, coverLetter }: { jobPostingId: string; coverLetter?: string }) => {
      console.log('Submitting job application:', { jobPostingId, coverLetter });
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Check if user already applied
      const { data: existingApplication } = await supabase
        .from('applications')
        .select('id')
        .eq('job_posting_id', jobPostingId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingApplication) {
        throw new Error('You have already applied for this job');
      }

      const { data, error } = await supabase
        .from('applications')
        .insert([{
          job_posting_id: jobPostingId,
          user_id: user.id,
          cover_letter: coverLetter,
          status: 'applied',
          applied_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Error submitting job application:', error);
        throw error;
      }

      console.log('Job application submitted:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-seeker-applications'] });
      queryClient.invalidateQueries({ queryKey: ['job-postings'] });
      toast({
        title: "Success",
        description: "Application submitted successfully!"
      });
    },
    onError: (error) => {
      console.error('Failed to submit job application:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    }
  });
};
