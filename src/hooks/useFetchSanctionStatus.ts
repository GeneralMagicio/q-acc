import { useQuery } from '@tanstack/react-query';
import { isWalletSanctioned } from '@/services/user.service';

export const useFetchSanctionStatus = (walletAddress: string) => {
  return useQuery({
    queryKey: ['sanctionStatus', walletAddress],
    queryFn: async () => {
      return await isWalletSanctioned(walletAddress);
    },
    enabled: !!walletAddress,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
