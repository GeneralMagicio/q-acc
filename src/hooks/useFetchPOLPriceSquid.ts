import { useQuery } from '@tanstack/react-query';
import { fetchSquidPOLUSDPrice } from '@/helpers/token';

export const useFetchPOLPriceSquid = () => {
  return useQuery({
    queryKey: ['polTokenPrice'],
    queryFn: () => fetchSquidPOLUSDPrice(),
    refetchInterval: 60_000, // 1 minute
    refetchOnWindowFocus: false,
    staleTime: 5 * 60_000, // 5 minutes
  });
};
