import { useQuery } from "@tanstack/react-query";
import { fetchProjectById } from "@/services/user.service";
import { useAccount } from "wagmi";

export const useFetchProjectById = (projectId: number) => {
  const { address } = useAccount();
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      if (!projectId) return;
      return await fetchProjectById(projectId, address);
    },
    enabled: !!projectId,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
