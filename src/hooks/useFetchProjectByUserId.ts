import { useQuery } from '@tanstack/react-query';
import { fetchProjectByUserId } from '@/services/project.service';

export const useFetchProjectByUserId = (userId: number) => {
  return useQuery({
    queryKey: ['project', userId],
    queryFn: async () => {
      if (!userId) return;
      return await fetchProjectByUserId(userId);
    },
    enabled: !!userId,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
