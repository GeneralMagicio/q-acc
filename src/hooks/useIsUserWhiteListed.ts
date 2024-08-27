import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { checkUserIsWhiteListed } from '@/services/user.service';

export const useIsUserWhiteListed = () => {
	const { address } = useAccount();
	return useQuery({
		queryKey: ['isUserWhiteListed', address],
		queryFn: async () => {
			return await checkUserIsWhiteListed(address);
		},
		enabled: !!address,
	});
};
