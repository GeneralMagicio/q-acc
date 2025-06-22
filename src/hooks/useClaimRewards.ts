import { usePublicClient, useWalletClient } from 'wagmi';
import { Address, getContract } from 'viem';
import { useMutation, useQuery } from '@tanstack/react-query';
import { claimTokensABI } from '@/lib/abi/inverter';

export const useClaimRewards = ({
  paymentProcessorAddress,
  paymentRouterAddress,
  onSuccess = () => {},
}: {
  paymentProcessorAddress: string;
  paymentRouterAddress: string;
  onSuccess: () => void;
}) => {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const contract = getContract({
    address: paymentProcessorAddress as Address,
    abi: claimTokensABI,
    client: walletClient!,
  });

  const claim = useMutation({
    mutationFn: async () => {
      const tx = await contract.write.claimAll([paymentRouterAddress], {
        gas: 1000000,
      });

      await publicClient!.waitForTransactionReceipt({
        hash: tx,
      });
    },
    onSuccess,
  });

  return { claim };
};

export const useReleasableForStream = ({
  paymentProcessorAddress,
  client,
  receiver,
  streamIds,
}: {
  paymentProcessorAddress: string;
  client: string;
  receiver: `0x${string}` | undefined;
  streamIds: bigint[];
}) => {
  const publicClient = usePublicClient();

  return useQuery<bigint>({
    queryKey: [
      'releasableForStream',
      client,
      receiver,
      streamIds.map(id => id.toString()),
    ],
    queryFn: async (): Promise<bigint> => {
      const contract = getContract({
        address: paymentProcessorAddress as Address,
        abi: claimTokensABI,
        client: publicClient!,
      });

      // Get releasable amounts for all stream IDs
      const releasablePromises = streamIds.map(async streamId => {
        const res = await contract.read.releasableForSpecificStream([
          client,
          receiver,
          streamId,
        ]);
        return res as bigint;
      });

      const releasableAmounts = await Promise.all(releasablePromises);

      // Sum all releasable amounts
      const totalReleasable = releasableAmounts.reduce(
        (sum, amount) => sum + amount,
        BigInt(0),
      );

      return totalReleasable;
    },
    staleTime: Infinity,
    gcTime: 1000 * 60,
    enabled: !!receiver && !!client && streamIds.length > 0,
  });
};

export const useReleasedForStream = ({
  paymentProcessorAddress,
  client,
  receiver,
  streamIds,
}: {
  paymentProcessorAddress: string;
  client: string;
  receiver: `0x${string}` | undefined;
  streamIds: bigint[];
}) => {
  const publicClient = usePublicClient();

  return useQuery<bigint>({
    queryKey: [
      'releasedForStream',
      client,
      receiver,
      streamIds.map(id => id.toString()),
    ],
    queryFn: async (): Promise<bigint> => {
      const contract = getContract({
        address: paymentProcessorAddress as Address,
        abi: claimTokensABI,
        client: publicClient!,
      });

      // Get released amounts for all stream IDs
      const releasedPromises = streamIds.map(async streamId => {
        const res = await contract.read.releasedForSpecificStream([
          client,
          receiver,
          streamId,
        ]);
        return res as bigint;
      });

      const releasedAmounts = await Promise.all(releasedPromises);

      // Sum all released amounts
      const totalReleased = releasedAmounts.reduce(
        (sum, amount) => sum + amount,
        BigInt(0),
      );

      return totalReleased;
    },
    staleTime: Infinity,
    gcTime: 1000 * 60,
    enabled: !!receiver && !!client && streamIds.length > 0,
  });
};
