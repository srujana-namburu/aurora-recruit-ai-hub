
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useJobSeekerProfile = () => {
  return useQuery({
    queryKey: ['job-seeker-profile'],
    queryFn: async () => {
      console.log('Fetching job seeker profile...');
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('job_seeker_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching job seeker profile:', error);
        throw error;
      }

      console.log('Job seeker profile fetched:', data);
      return data;
    }
  });
};

export const useCreateJobSeekerProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (profileData: any) => {
      console.log('Creating job seeker profile:', profileData);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('job_seeker_profiles')
        .insert([{ ...profileData, user_id: user.id }])
        .select()
        .single();

      if (error) {
        console.error('Error creating job seeker profile:', error);
        throw error;
      }

      console.log('Job seeker profile created:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-seeker-profile'] });
      toast({
        title: "Success",
        description: "Profile created successfully!"
      });
    },
    onError: (error) => {
      console.error('Failed to create job seeker profile:', error);
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive"
      });
    }
  });
};

export const useUpdateJobSeekerProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (profileData: any) => {
      console.log('Updating job seeker profile:', profileData);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('job_seeker_profiles')
        .update(profileData)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating job seeker profile:', error);
        throw error;
      }

      console.log('Job seeker profile updated:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['job-seeker-profile'] });
      toast({
        title: "Success",
        description: "Profile updated successfully!"
      });
    },
    onError: (error) => {
      console.error('Failed to update job seeker profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    }
  });
};
