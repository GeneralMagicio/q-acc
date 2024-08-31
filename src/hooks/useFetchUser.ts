import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { fetchUserInfo } from '@/services/user.service';

export const useFetchUser = (enabled: boolean = false) => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ['user', address],
    queryFn: async () => {
      if (!address) return;
      return await fetchUserInfo(address);
    },
    enabled: enabled && !!address,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
