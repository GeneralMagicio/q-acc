import { useQuery } from '@tanstack/react-query';
import { fetchQaccRoundStats } from '@/services/round.services';

export const useFetchQaccStats = () => {
  return useQuery({
    queryKey: ['qaccstats'],
    queryFn: async () => {
      return await fetchQaccRoundStats();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
