
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useJobPostings = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['job-postings'],
    queryFn: async () => {
      console.log('Fetching job postings...');
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching job postings:', error);
        throw error;
      }

      console.log('Job postings fetched:', data);
      return data;
    }
  });
};

export const useCreateJobPosting = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (jobData: any) => {
      console.log('Creating job posting:', jobData);
      const { data, error } = await supabase
        .from('job_postings')
        .insert([jobData])
        .select()
        .single();

      if (error) {
        console.error('Error creating job posting:', error);
        throw error;
      }

      console.log('Job posting created:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-postings'] });
      toast({
        title: "Success",
        description: "Job posting created successfully!"
      });
    },
    onError: (error) => {
      console.error('Failed to create job posting:', error);
      toast({
        title: "Error",
        description: "Failed to create job posting. Please try again.",
        variant: "destructive"
      });
    }
  });
};

export const useUpdateJobPosting = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      console.log('Updating job posting:', id, updates);
      const { data, error } = await supabase
        .from('job_postings')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating job posting:', error);
        throw error;
      }

      console.log('Job posting updated:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-postings'] });
      toast({
        title: "Success",
        description: "Job posting updated successfully!"
      });
    },
    onError: (error) => {
      console.error('Failed to update job posting:', error);
      toast({
        title: "Error",
        description: "Failed to update job posting. Please try again.",
        variant: "destructive"
      });
    }
  });
};
