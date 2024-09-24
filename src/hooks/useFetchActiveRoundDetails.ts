import { useQuery } from '@tanstack/react-query';
import { fetchActiveRoundDetails } from '@/services/round.services';

export const useFetchActiveRoundDetails = () => {
  return useQuery({
    queryKey: ['activeRoundDetails'],
    queryFn: async () => {
      return await fetchActiveRoundDetails();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
