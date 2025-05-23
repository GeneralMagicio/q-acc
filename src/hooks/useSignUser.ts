import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';

import { getLocalStorageToken, signWithEVM } from '@/helpers/generateJWT';
import { IUser } from '@/types/user.type';
import { useFetchUser } from './useFetchUser';

export const useSignUser = (onSigned?: (user: IUser) => void) => {
  const { address, chain, connector } = useAccount();
  const { refetch } = useFetchUser();

  return useQuery({
    queryKey: ['token', address],
    queryFn: async () => {
      if (!address) return;

      // Check if token exists in localStorage
      const localStorageToken = getLocalStorageToken(address);
      console.log('localStorageToken', localStorageToken);
      if (localStorageToken) {
        const { data: newUser } = await refetch();
        if (newUser) {
          onSigned?.(newUser); // Pass the latest user data to the callback
        }
        return localStorageToken;
      }

      // Token generation logic
      if (!chain?.id || !connector) return;
      try {
        const checkSumAddress = ethers.getAddress(address);
        const newToken = await signWithEVM(
          checkSumAddress,
          chain?.id,
          connector,
        );
        if (newToken) {
          localStorage.setItem('token', JSON.stringify(newToken));
          const { data: newUser } = await refetch();
          if (newUser) {
            onSigned?.(newUser as IUser); // Pass the latest user data to the callback
          }
          return newToken;
        }
        return null;
      } catch (error) {
        console.log('Error generating token:', error);
        return null;
      }
    },
    enabled: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
