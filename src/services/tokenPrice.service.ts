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
  {
    inputs: [],
    name: 'getVirtualCollateralSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

interface UseTokenPriceRangeProps {
  contributionLimit: number;
  contractAddress?: string;
}

interface TokenPriceRangeResult {
  min: number;
  max: number;
}

export const useTokenPriceRange = ({
  contributionLimit, // Contribution limit up to the current batch
  contractAddress, // fundingManagerAddress
}: UseTokenPriceRangeProps): TokenPriceRangeResult => {
  const contract = useMemo(() => {
    if (!contractAddress) return null;
    return new Contract(contractAddress, abi, provider);
  }, [contractAddress]);

  // Fetch `getVirtualCollateralSupply` (total contributed so far)
  const virtualCollateralSupply = useQuery<BigNumberish, Error>({
    queryKey: ['getVirtualCollateralSupply', contractAddress],
    queryFn: async () => {
      if (!contract) throw new Error('Contract not loaded');
      const result: BigNumberish = await contract.getVirtualCollateralSupply();
      return result;
    },
    enabled: !!contract,
    select: data => Number(formatUnits(data, 18)),
  });

  const contributedSoFar = parseFloat(
    (virtualCollateralSupply.data || '0').toString(),
  );
  // Calculate the upper limit (X)
  const X = contributionLimit - contributedSoFar;

  // Fetch `calculatePurchaseReturn` using X
  const calculatePurchaseReturn = useQuery<BigNumberish, Error>({
    queryKey: ['calculatePurchaseReturn', X.toString(), contractAddress],
    queryFn: async () => {
      if (!contract) throw new Error('Contract not loaded');
      const result: BigNumberish = await contract.calculatePurchaseReturn(X);
      return result;
    },
    enabled: !!contract && !!X,
    select: data => Number(data), // Convert BigNumber to number
  });

  const Y = parseFloat((calculatePurchaseReturn.data || 1).toString()); // Prevent division by zero
  // Calculate the max token price (P = X / Y)
  const maxPrice = X / Y;

  const staticPriceForBuying = useQuery<BigNumberish, Error>({
    queryKey: ['getStaticPriceForBuying', contractAddress],
    queryFn: async () => {
      if (!contract) throw new Error('Contract not loaded');
      const result: BigNumberish = await contract.getStaticPriceForBuying();
      return result;
    },
    enabled: !!contract,
    select: data => Number(data), // Convert BigNumber to number
  });

  const minPrice =
    parseFloat((staticPriceForBuying.data || '0').toString()) / 1_000_000; // convert PPM to price in POL

  return { min: minPrice, max: maxPrice };
};
