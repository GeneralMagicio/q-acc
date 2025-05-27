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
  streamId,
}: {
  paymentProcessorAddress: string;
  client: string;
  receiver: `0x${string}` | undefined;
  streamId: bigint;
}) => {
  const publicClient = usePublicClient();

  return useQuery<bigint>({
    queryKey: ['releasableForStream', client, receiver, streamId.toString()],
    queryFn: async (): Promise<bigint> => {
      const contract = getContract({
        address: paymentProcessorAddress as Address,
        abi: claimTokensABI,
        client: publicClient!,
      });

      const res = await contract.read.releasableForSpecificStream([
        client,
        receiver,
        streamId,
      ]);

      return res as bigint;
    },
    staleTime: Infinity,
    gcTime: 1000 * 60,
    enabled: !!receiver && !!client,
  });
};

export const useReleasedForStream = ({
  paymentProcessorAddress,
  client,
  receiver,
  streamId,
}: {
  paymentProcessorAddress: string;
  client: string;
  receiver: `0x${string}` | undefined;
  streamId: bigint;
}) => {
  const publicClient = usePublicClient();

  return useQuery<bigint>({
    queryKey: ['releasedForStream', client, receiver, streamId.toString()],
    queryFn: async (): Promise<bigint> => {
      const contract = getContract({
        address: paymentProcessorAddress as Address,
        abi: claimTokensABI,
        client: publicClient!,
      });

      const res = await contract.read.releasedForSpecificStream([
        client,
        receiver,
        streamId,
      ]);
      return res as bigint;
    },
    staleTime: Infinity,
    gcTime: 1000 * 60,
    enabled: !!receiver && !!client,
  });
};
