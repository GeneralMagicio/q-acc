import { useQuery } from '@tanstack/react-query';
import { fetchAllProjects } from '@/services/project.service';

export const useFetchAllProjects = () => {
  return useQuery({
    queryKey: ['allProjects'],
    queryFn: async () => {
      return await fetchAllProjects();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
