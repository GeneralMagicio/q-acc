import { useQuery } from '@tanstack/react-query';
import { fetchEarlyRoundDetails } from '@/services/project.service';

export const useFetchRoundDetails = () => {
  return useQuery({
    queryKey: ['roundDetails'],
    queryFn: async () => {
      return await fetchEarlyRoundDetails();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
