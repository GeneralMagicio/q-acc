import { useQuery } from '@tanstack/react-query';
import { getTokenSupplyDetails } from '@/services/tokenPrice.service';

export const useTokenSupplyDetails = (contract_address: string) => {
  return useQuery({
    queryKey: ['token-supply-details', contract_address],
    queryFn: async () => {
      return await getTokenSupplyDetails(contract_address);
    },
  });
};
