import { useQuery } from '@tanstack/react-query';
import { fetchPointsHistoryOfUser } from '@/services/points.service';

export const useFetchPointsHistoryOfUser = () => {
  return useQuery({
    queryKey: ['pointsHistory'],
    queryFn: async () => {
      return await fetchPointsHistoryOfUser();
    },
    enabled: false,
  });
};
