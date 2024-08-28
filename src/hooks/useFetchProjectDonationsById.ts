import { useQuery } from '@tanstack/react-query';
import { fecthProjectDonationsById } from '@/services/user.service';

export const useFetchProjectDonationsById = (
  projectId: number,
  take: number,
  skip: number,
) => {
  return useQuery({
    queryKey: ['projectDonations', projectId],
    queryFn: async () => {
      if (!projectId) return;
      return await fecthProjectDonationsById(projectId, take, skip);
    },
    enabled: !!projectId,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
