import { createPublicClient, http } from 'viem';
import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
// eslint-disable-next-line import/named
import config from '@/config/configuration';
import { requestGraphQL } from '@/helpers/request';
import { CHECK_USER_PRIVADO_VERIFIED_STATE } from '@/queries/project.query';
import { useFetchUser } from './useFetchUser';

const { chain, contractAddress, requestId } = config.privadoConfig;

export const usePrivadoChainStatus = ({ disable }: { disable: boolean }) => {
  const { address } = useAccount();
  const publicClient = createPublicClient({
    chain: chain,
    transport: http(),
  });
  return useQuery({
    queryKey: ['isPrivadoVerified', address],
    enabled: !disable && !!address,
    queryFn: async () => {
      console.log('get privado state onchain');
      const abi = [
        {
          inputs: [
            { internalType: 'address', name: 'sender', type: 'address' },
            { internalType: 'uint64', name: 'requestId', type: 'uint64' },
          ],
          name: 'isProofVerified',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'view',
          type: 'function',
        },
      ];

      return await publicClient.readContract({
        address: contractAddress,
        abi,
        functionName: 'isProofVerified',
        args: [address, requestId],
      });
    },
    staleTime: 10 * 1000, // Refetch every 10 seconds
  });
};

// Triggers backend to check the user's privado status
export const useTriggerUserPrivadoStatusCheck = ({
  trigger,
}: {
  trigger: boolean;
}) => {
  const { address } = useAccount();
  return useQuery({
    gcTime: Infinity,
    enabled: trigger && !!address,
    queryKey: ['triggerUserPrivadoStatusCheck', address],
    queryFn: async () => {
      if (!address) return;
      console.log('calling checkUserPrivadoVerifiedState for user:', address);
      const res = await requestGraphQL<{
        checkUserPrivadoVerifiedState: boolean;
      }>(
        CHECK_USER_PRIVADO_VERIFIED_STATE,
        {},
        {
          auth: true,
        },
      );
      return { [address]: res?.checkUserPrivadoVerifiedState };
    },
  });
};

export const usePrivado = () => {
  const userFetch = useFetchUser();

  const privadoChainStatus = usePrivadoChainStatus({
    disable: userFetch.isPending || !!userFetch.data?.privadoVerified,
  });

  useTriggerUserPrivadoStatusCheck({
    trigger:
      userFetch.data?.privadoVerified === false &&
      privadoChainStatus.data === true,
  });
  const error = privadoChainStatus.error || userFetch.error;
  const isVerified =
    userFetch.data?.privadoVerified || (privadoChainStatus.data as boolean);

  const isLoading = privadoChainStatus.isLoading || userFetch.isPending;
  return { isVerified, isLoading, error };
};
