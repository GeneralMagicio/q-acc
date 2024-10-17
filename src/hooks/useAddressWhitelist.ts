// useQuery to check if the address is whitelisted

import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { checkWhitelist } from '@/app/actions/check-whiltelist';

export const useAddressWhitelist = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ['whitelist', address],
    queryFn: async () => {
      return checkWhitelist(address);
    },
  });
};
