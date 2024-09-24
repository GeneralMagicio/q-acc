import { useQuery } from '@tanstack/react-query';
import { fetchAllRoundDetails } from '@/services/round.services';

export const useFetchAllRound = () => {
  return useQuery({
    queryKey: ['allRoundDetails'],
    queryFn: async () => {
      return await fetchAllRoundDetails();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
