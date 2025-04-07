import { useQuery } from '@tanstack/react-query';
import { fetchLeaderBoard, IOrderBy } from '@/services/points.service';

export const useFetchLeaderBoard = (
  take: number,
  skip: number,
  orderBy: IOrderBy,
) => {
  return useQuery({
    queryKey: ['leaderboard', take, skip, orderBy.direction, orderBy.field],
    queryFn: async () => {
      return await fetchLeaderBoard(take, skip, orderBy);
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
