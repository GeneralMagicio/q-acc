import { isContractAddress } from '@/helpers/token';
import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

export const useCheckSafeAccount = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ['checkSafeAddress', address],
    queryFn: async () => {
      if (!address) return;
      return await isContractAddress(address);
    },
    enabled: !!address,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
