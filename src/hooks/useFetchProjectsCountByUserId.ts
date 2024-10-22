import { useQuery } from '@tanstack/react-query';
import { fetchProjectsCountByUserId } from '@/services/project.service';

export const useFetchProjectsCountByUserId = (userId: number) => {
  return useQuery({
    queryKey: ['project', userId],
    queryFn: async () => {
      if (!userId) return;
      return await fetchProjectsCountByUserId(userId);
    },
    enabled: !!userId,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
