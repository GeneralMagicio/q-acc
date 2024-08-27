import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { getLocalStorageToken, signWithEVM } from '@/helpers/generateJWT';

export const useSignUser = (onSinged?: () => void) => {
	const { address, chain, connector } = useAccount();
	return useQuery({
		queryKey: ['token', address],
		queryFn: async () => {
			if (!address) return;
			// Check if token exists in localStorage
			const localStorageToken = getLocalStorageToken(address);
			if (localStorageToken) {
				onSinged?.();
				return localStorageToken;
			}

			// Token generation logic
			if (!chain?.id || !connector) return;
			try {
				const newToken = await signWithEVM(
					address,
					chain?.id,
					connector,
				);
				if (newToken) {
					onSinged?.();
					localStorage.setItem('token', JSON.stringify(newToken));
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
