import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'wagmi';
import { refreshUserGitcoinPassportScore } from '@/services/user.service';

export const useFetchUserGitcoinPassportScore = () => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ['user', address],
    queryFn: async () => {
      if (!address) return;
      return await refreshUserGitcoinPassportScore(address);
    },
    enabled: false,
  });
};
