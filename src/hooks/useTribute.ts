import { useMemo } from 'react';
import { ethers, BigNumberish, Contract } from 'ethers';
import { useMutation, useQuery } from '@tanstack/react-query';
import { usePublicClient, useWalletClient } from 'wagmi';
import { Address, encodeFunctionData, getContract } from 'viem';
import config from '@/config/configuration';
import { fundingManagerAbi, roleModuleAbi } from '@/lib/abi/inverter';
import { getClaimedTributesAndMintedTokenAmounts } from '@/services/tributeCollected.service';

const provider = new ethers.JsonRpcProvider(config.NETWORK_RPC_ADDRESS);

export const useClaimedTributesAndMintedTokenAmounts = (
  orchestratorAddress?: string,
  projectAddress?: string,
) => {
  const query = useQuery<
    {
      claimedTributes: number;
      mintedTokenAmounts: number;
    },
    Error
  >({
    queryKey: [
      'claimedTributesAndMintedTokens',
      orchestratorAddress,
      projectAddress,
    ],
    queryFn: () =>
      getClaimedTributesAndMintedTokenAmounts(
        orchestratorAddress,
        projectAddress,
      ),
    gcTime: 1000 * 60, // 1 minute
    enabled: !!orchestratorAddress && !!projectAddress, // Run only if orchestratorAddress and projectAddress is provided
  });

  return query;
};

export const useProjectCollateralFeeCollected = ({
  contractAddress,
}: {
  contractAddress: string;
}) => {
  const contract = useMemo(() => {
    if (!contractAddress) return null;
    return new Contract(contractAddress, fundingManagerAbi, provider);
  }, [contractAddress]);
  const projectCollateralFeeCollected = useQuery<BigNumberish, Error>({
    queryKey: ['projectCollateralFeeCollected', contractAddress],
    queryFn: async () => {
      if (!contract) throw new Error('Contract not loaded');
      const result: BigNumberish =
        await contract.projectCollateralFeeCollected();
      return result;
    },
    enabled: !!contract,
    // select: data => Number(formatUnits(data, 18)), // Assuming the result has 18 decimals
  });

  return projectCollateralFeeCollected;
};

export const useClaimCollectedFee = ({
  fundingManagerAddress,
  tributeModule,
  feeRecipient,
  amount,
  onSuccess = () => {},
}: {
  fundingManagerAddress: string;
  tributeModule: string;
  feeRecipient: string;
  amount: BigNumberish;
  onSuccess?: () => void;
}) => {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const rolesModuleInstance = getContract({
    address: tributeModule as Address,
    abi: roleModuleAbi,
    client: walletClient!,
  });

  const claim = useMutation({
    mutationFn: async () => {
      const encoded = encodeFunctionData({
        abi: fundingManagerAbi,
        functionName: 'withdrawProjectCollateralFee',
        args: [feeRecipient, amount],
      });
      const tx = await rolesModuleInstance.write.execTransactionFromModule(
        [fundingManagerAddress, 0, encoded, 0],
        { gas: 1000000 },
      );

      await publicClient!.waitForTransactionReceipt({
        hash: tx,
      });
    },
    onSuccess,
  });

  return { claim };
};
