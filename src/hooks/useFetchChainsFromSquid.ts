import { useQuery } from '@tanstack/react-query';
import config from '@/config/configuration';

const headers = {
  'x-integrator-id': config.SQUID_INTEGRATOR_ID,
};

export const useFetchChainsFromSquid = () => {
  return useQuery({
    queryKey: ['activeRoundDetails'],
    queryFn: async () => {
      const chainsResponse = await fetch(
        'https://apiplus.squidrouter.com/v2/chains',
        {
          headers: headers,
        },
      );

      return await chainsResponse.json();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
