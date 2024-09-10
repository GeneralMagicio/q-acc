import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { fetchUserProject } from '@/services/project.service';

export const useFetchUserProject = (enabled: boolean = false) => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ['projectData', address],
    queryFn: async () => {
      if (!address) return;
      return await fetchUserProject(address);
    },
    enabled: enabled && !!address,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
