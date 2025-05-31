
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useCandidates = () => {
  return useQuery({
    queryKey: ['candidates'],
    queryFn: async () => {
      console.log('Fetching candidates...');
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching candidates:', error);
        throw error;
      }

      console.log('Candidates fetched:', data);
      return data;
    }
  });
};

export const useCreateCandidate = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (candidateData: any) => {
      console.log('Creating candidate:', candidateData);
      const { data, error } = await supabase
        .from('candidates')
        .insert([candidateData])
        .select()
        .single();

      if (error) {
        console.error('Error creating candidate:', error);
        throw error;
      }

      console.log('Candidate created:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      toast({
        title: "Success",
        description: "Candidate added successfully!"
      });
    },
    onError: (error) => {
      console.error('Failed to create candidate:', error);
      toast({
        title: "Error",
        description: "Failed to add candidate. Please try again.",
        variant: "destructive"
      });
    }
  });
};
