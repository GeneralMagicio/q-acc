import { useQuery } from '@tanstack/react-query';
import { getTokenPriceRangeStatus } from '@/services/tokenPrice.service';

export const useCheckProjectPriceStatus = (
  allProjects: any,
  allRounds: any,
) => {
  return useQuery({
    enabled: !!allProjects && !!allRounds,
    queryKey: ['projectPriceStatus'],
    queryFn: async () => {
      for (const project of allProjects.projects) {
        const { isPriceUpToDate } = await getTokenPriceRangeStatus({
          project,
          allRounds,
        });
        if (!isPriceUpToDate) {
          return false;
        }
      }
      return true;
    },
  });
};
