import { useQuery } from '@tanstack/react-query';
import { fetchTokenPrice } from '@/helpers/token';

export const useFetchTokenPrice = () => {
  return useQuery({
    queryKey: ['polTokenPrice'],
    queryFn: fetchTokenPrice,
    refetchInterval: 60_000, // 1 minute
    refetchOnWindowFocus: false,
    staleTime: 5 * 60_000, // 5 minutes
  });
};
