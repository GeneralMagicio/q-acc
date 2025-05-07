import { useQuery } from '@tanstack/react-query';
import { fetchGeckoMarketCap } from '@/services/tokenPrice.service';

export const useFetchGeckoMarketCap = (tokenAddress: string) => {
  return useQuery({
    queryKey: ['fetch-gecko-marketcap', tokenAddress],
    queryFn: async () => {
      return await fetchGeckoMarketCap(tokenAddress);
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
