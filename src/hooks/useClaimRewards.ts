import { usePublicClient, useWalletClient } from 'wagmi';
import { Address, getContract } from 'viem';
import { useMutation } from '@tanstack/react-query';
import { claimAllAbi } from '@/lib/abi/inverter';

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
    abi: claimAllAbi,
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
