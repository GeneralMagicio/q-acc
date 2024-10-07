import { useMemo } from 'react';
import { ethers, BigNumberish, Contract, formatUnits } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import config from '@/config/configuration';

const provider = new ethers.JsonRpcProvider(config.NETWORK_RPC_ADDRESS);

const abi = [
  {
    inputs: [],
    name: 'projectCollateralFeeCollected',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

interface UseProjectCollateralFeeCollectedProps {
  contractAddress?: string;
}

export const useProjectCollateralFeeCollected = ({
  contractAddress,
}: UseProjectCollateralFeeCollectedProps) => {
  const contract = useMemo(() => {
    if (!contractAddress) return null;
    return new Contract(contractAddress, abi, provider);
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
    select: data => Number(formatUnits(data, 18)), // Assuming the result has 18 decimals
  });

  const collectedFees = parseFloat(
    (projectCollateralFeeCollected.data || '0').toString(),
  );

  return { collectedFees };
};
