import { useQuery } from '@tanstack/react-query';
import { Address } from 'viem';
import { fetchPointsHistoryOfUser } from '@/services/points.service';

export const useFetchPointsHistoryOfUser = (userAddress?: Address) => {
  return useQuery({
    queryKey: ['pointsHistory'],
    queryFn: async () => {
      return await fetchPointsHistoryOfUser();
    },
    enabled: !!userAddress,
  });
};
