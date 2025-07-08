import { useQuery } from '@tanstack/react-query';
import { usePublicClient } from 'wagmi';
import {
  checkBondingCurvePermissions,
  RoleCheckResult,
} from '@/services/roleCheck.service';

export const useRoleCheck = (bondingCurveAddress: string, address: string) => {
  const publicClient = usePublicClient();

  return useQuery<RoleCheckResult>({
    queryKey: ['roleCheck', bondingCurveAddress, address],
    queryFn: async () => {
      if (!publicClient || !bondingCurveAddress || !address) {
        throw new Error('Missing required parameters for role check');
      }

      return await checkBondingCurvePermissions(
        publicClient,
        bondingCurveAddress,
        address,
      );
    },
    enabled: !!publicClient && !!bondingCurveAddress && !!address,
    staleTime: 30000, // 30 seconds
    gcTime: 300000, // 5 minutes
  });
};
