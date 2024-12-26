import { useQuery } from '@tanstack/react-query';
import { checkSafeAddress } from '@/app/actions/check-whiltelist';

export const useIsAddressSafe = (walletAddress: string) => {
  return useQuery({
    queryKey: ['safeAddress', walletAddress],
    queryFn: async () => {
      return await checkSafeAddress(walletAddress);
    },
    enabled: !!walletAddress,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
