import { useQuery } from '@tanstack/react-query';
import { fetchLeaderBoard, IOrderBy } from '@/services/points.service';

export const useFetchLeaderBoard = (
  take: number,
  skip: number,
  orderBy: IOrderBy,
  walletAddress?: string,
) => {
  return useQuery({
    queryKey: [
      'leaderboard',
      take,
      skip,
      orderBy.direction,
      orderBy.field,
      walletAddress,
    ],
    queryFn: async () => {
      return await fetchLeaderBoard(take, skip, orderBy, walletAddress);
    },
    // staleTime: Infinity,
    // gcTime: Infinity,
  });
};
