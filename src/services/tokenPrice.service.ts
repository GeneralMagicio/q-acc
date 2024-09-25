import { useMemo } from 'react';
import { ethers, BigNumberish, Contract, formatUnits } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import config from '@/config/configuration';

const provider = new ethers.JsonRpcProvider(config.NETWORK_RPC_ADDRESS);

const abi = [
  {
    inputs: [
      { internalType: 'uint256', name: '_depositAmount', type: 'uint256' },
    ],
    name: 'calculatePurchaseReturn',
    outputs: [{ internalType: 'uint256', name: 'mintAmount', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getStaticPriceForBuying',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

interface UseTokenPriceRangeProps {
  amount: BigNumberish;
  contractAddress?: string;
}

interface TokenPriceRangeResult {
  min: number;
  max: number;
}

export const useTokenPriceRange = ({
  amount,
  contractAddress, // fundingManagerAddress
}: UseTokenPriceRangeProps): TokenPriceRangeResult => {
  const contract = useMemo(() => {
    if (!contractAddress) return null;
    return new Contract(contractAddress, abi, provider);
  }, [contractAddress]);

  const calculatePurchaseReturn = useQuery<BigNumberish, Error>({
    queryKey: ['calculatePurchaseReturn', amount.toString(), contractAddress],
    queryFn: async () => {
      if (!contract) throw new Error('Contract not loaded');
      const result: BigNumberish =
        await contract.calculatePurchaseReturn(amount);
      return result;
    },
    enabled: !!contract && !!amount,
    select: data => formatUnits(data, 18),
  });

  const staticPriceForBuying = useQuery<BigNumberish, Error>({
    queryKey: ['getStaticPriceForBuying', contractAddress],
    queryFn: async () => {
      if (!contract) throw new Error('Contract not loaded');
      const result: BigNumberish = await contract.getStaticPriceForBuying();
      return result;
    },
    enabled: !!contract,
    select: data => formatUnits(data, 18),
  });

  const min = parseFloat((staticPriceForBuying.data || '0').toString());

  const max =
    min + parseFloat((calculatePurchaseReturn.data || '0').toString());

  return { min, max };
};
