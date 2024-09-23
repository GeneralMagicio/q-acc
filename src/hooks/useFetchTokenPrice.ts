import { useQuery } from '@tanstack/react-query';
import { fetchTokenPrice } from '@/helpers/token';

export const useFetchTokenPrice = () => {
  return useQuery({
    queryKey: ['token-price'],
    queryFn: async () => {
      return await fetchTokenPrice();
    },
    enabled: true,
    staleTime: Infinity,
    gcTime: Infinity,
    initialData: 1,
  });
};
