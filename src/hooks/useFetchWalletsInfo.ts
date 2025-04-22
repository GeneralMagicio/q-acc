import { useQuery } from '@tanstack/react-query';
import { fetchWalletsInfo } from '@/services/wallets.service';

export const useFetchWalletsInfo = () => {
  return useQuery({
    queryKey: ['wallets-info'],
    queryFn: async () => {
      return await fetchWalletsInfo();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
