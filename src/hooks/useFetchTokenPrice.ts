import { useQuery } from '@tanstack/react-query';
import { fetchTokenPrice } from '@/helpers/token';

export const useFetchTokenPrice = (coingeckoId?: string) => {
  return useQuery({
    queryKey: ['polTokenPrice'],
    queryFn: () => fetchTokenPrice(coingeckoId),
    refetchInterval: 60_000, // 1 minute
    refetchOnWindowFocus: false,
    staleTime: 5 * 60_000, // 5 minutes
  });
};
