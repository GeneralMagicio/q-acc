import { useQuery } from "@tanstack/react-query";
import { fetchProjectById } from "@/services/user.service";

export const useFetchProjectById = (projectId: number) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      if (!projectId) return;
      return await fetchProjectById(projectId);
    },
    enabled: !!projectId,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
