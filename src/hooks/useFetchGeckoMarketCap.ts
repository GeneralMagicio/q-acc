import { fetchGeckoMarketCap } from '@/services/tokenPrice.service';
import { useQuery } from '@tanstack/react-query';

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
