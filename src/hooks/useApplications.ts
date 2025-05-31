
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useApplications = () => {
  return useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      console.log('Fetching applications...');
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          candidate:candidates(*),
          job_posting:job_postings(*)
        `)
        .order('applied_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        throw error;
      }

      console.log('Applications fetched:', data);
      return data;
    }
  });
};

export const useCreateApplication = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (applicationData: any) => {
      console.log('Creating application:', applicationData);
      const { data, error } = await supabase
        .from('applications')
        .insert([applicationData])
        .select()
        .single();

      if (error) {
        console.error('Error creating application:', error);
        throw error;
      }

      console.log('Application created:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      queryClient.invalidateQueries({ queryKey: ['job-postings'] });
      toast({
        title: "Success",
        description: "Application submitted successfully!"
      });
    },
    onError: (error) => {
      console.error('Failed to create application:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    }
  });
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      console.log('Updating application status:', id, status);
      const { data, error } = await supabase
        .from('applications')
        .update({ 
          status,
          stage_changed_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating application status:', error);
        throw error;
      }

      console.log('Application status updated:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      toast({
        title: "Success",
        description: "Application status updated successfully!"
      });
    },
    onError: (error) => {
      console.error('Failed to update application status:', error);
      toast({
        title: "Error",
        description: "Failed to update application status. Please try again.",
        variant: "destructive"
      });
    }
  });
};
