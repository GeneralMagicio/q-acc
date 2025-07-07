import { useState, useEffect } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Address, getContract, parseUnits, formatUnits } from 'viem';
import bondingCurveABI from '@/lib/abi/bondingCurve';

export interface BondingCurveData {
  BuyPrice: number;
  SellPrice: number;
  buyIsOpen: boolean;
  sellIsOpen: boolean;
  virtualCollateralSupply: bigint;
  virtualIssuanceSupply: bigint;
  token: Address;
  issuanceToken: Address;
}

// Custom debounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Custom hook for purchase return calculation with caching and debouncing
export const useCalculatePurchaseReturn = (
  contractAddress: string,
  depositAmount: string,
  debounceMs: number = 500,
) => {
  const publicClient = usePublicClient();
  const debouncedAmount = useDebounce(depositAmount, debounceMs);

  return useQuery({
    queryKey: ['calculatePurchaseReturn', contractAddress, debouncedAmount],
    queryFn: async () => {
      if (
        !publicClient ||
        !contractAddress ||
        !debouncedAmount ||
        parseFloat(debouncedAmount) <= 0
      ) {
        throw new Error('Invalid parameters for calculation');
      }

      const depositAmountWei = parseUnits(debouncedAmount, 18);
      const result = await publicClient.readContract({
        address: contractAddress as Address,
        abi: bondingCurveABI,
        functionName: 'calculatePurchaseReturn',
        args: [depositAmountWei],
      });

      return formatUnits(result as bigint, 18);
    },
    enabled:
      !!publicClient &&
      !!contractAddress &&
      !!debouncedAmount &&
      parseFloat(debouncedAmount) > 0,
    staleTime: 10000, // 10 seconds
    gcTime: 60000, // 1 minute
    retry: 2,
    retryDelay: 1000,
  });
};

// Custom hook for sale return calculation with caching and debouncing
export const useCalculateSaleReturn = (
  contractAddress: string,
  depositAmount: string,
  debounceMs: number = 500,
) => {
  const publicClient = usePublicClient();
  const debouncedAmount = useDebounce(depositAmount, debounceMs);

  return useQuery({
    queryKey: ['calculateSaleReturn', contractAddress, debouncedAmount],
    queryFn: async () => {
      if (
        !publicClient ||
        !contractAddress ||
        !debouncedAmount ||
        parseFloat(debouncedAmount) <= 0
      ) {
        throw new Error('Invalid parameters for calculation');
      }

      const depositAmountWei = parseUnits(debouncedAmount, 18);
      const result = await publicClient.readContract({
        address: contractAddress as Address,
        abi: bondingCurveABI,
        functionName: 'calculateSaleReturn',
        args: [depositAmountWei],
      });

      return formatUnits(result as bigint, 18);
    },
    enabled:
      !!publicClient &&
      !!contractAddress &&
      !!debouncedAmount &&
      parseFloat(debouncedAmount) > 0,
    staleTime: 10000, // 10 seconds
    gcTime: 60000, // 1 minute
    retry: 2,
    retryDelay: 1000,
  });
};

export const useBondingCurve = (contractAddress: string) => {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  // Get bonding curve data
  const { data: bondingCurveData, refetch: refetchBondingCurveData } = useQuery(
    {
      queryKey: ['bondingCurve', contractAddress],
      queryFn: async (): Promise<BondingCurveData> => {
        if (!publicClient || !contractAddress)
          throw new Error('Client or contract address not available');

        const [
          StaticPriceForBuying,
          StaticPriceForSelling,
          buyIsOpen,
          sellIsOpen,
          virtualCollateralSupply,
          virtualIssuanceSupply,
          token,
          issuanceToken,
        ] = await publicClient.multicall({
          contracts: [
            {
              address: contractAddress as Address,
              abi: bondingCurveABI,
              functionName: 'getStaticPriceForBuying',
            },
            {
              address: contractAddress as Address,
              abi: bondingCurveABI,
              functionName: 'getStaticPriceForSelling',
            },
            {
              address: contractAddress as Address,
              abi: bondingCurveABI,
              functionName: 'buyIsOpen',
            },
            {
              address: contractAddress as Address,
              abi: bondingCurveABI,
              functionName: 'sellIsOpen',
            },
            {
              address: contractAddress as Address,
              abi: bondingCurveABI,
              functionName: 'getVirtualCollateralSupply',
            },
            {
              address: contractAddress as Address,
              abi: bondingCurveABI,
              functionName: 'getVirtualIssuanceSupply',
            },
            {
              address: contractAddress as Address,
              abi: bondingCurveABI,
              functionName: 'token',
            },
            {
              address: contractAddress as Address,
              abi: bondingCurveABI,
              functionName: 'getIssuanceToken',
            },
          ],
        });

        return {
          BuyPrice: Number(
            formatUnits(
              ((StaticPriceForBuying.result as bigint) * BigInt(11)) /
                BigInt(10),
              6,
            ),
          ), // add 10% fee
          SellPrice: Number(
            formatUnits(
              ((StaticPriceForSelling.result as bigint) * BigInt(9)) /
                BigInt(10),
              6,
            ),
          ), // deduct 10% fee
          buyIsOpen: buyIsOpen.result as boolean,
          sellIsOpen: sellIsOpen.result as boolean,
          virtualCollateralSupply: virtualCollateralSupply.result as bigint,
          virtualIssuanceSupply: virtualIssuanceSupply.result as bigint,
          token: token.result as Address,
          issuanceToken: issuanceToken.result as Address,
        };
      },
      enabled: !!contractAddress && !!publicClient,
      staleTime: 30000, // 30 seconds
      gcTime: 300000, // 5 minutes
    },
  );

  // Buy tokens
  const buyTokens = useMutation({
    mutationFn: async ({
      depositAmount,
      minAmountOut,
    }: {
      depositAmount: string;
      minAmountOut: string;
    }) => {
      if (!walletClient || !contractAddress || !address)
        throw new Error(
          'Wallet client, contract address, or user address not available',
        );

      const contract = getContract({
        address: contractAddress as Address,
        abi: bondingCurveABI,
        client: walletClient,
      });

      const depositAmountWei = parseUnits(depositAmount, 18);
      const minAmountOutWei = parseUnits(minAmountOut, 18);

      const hash = await contract.write.buy(
        [depositAmountWei, minAmountOutWei],
        {
          account: address,
          value: depositAmountWei, // For native token purchases
        },
      );

      return hash;
    },
    onSuccess: () => {
      refetchBondingCurveData();
    },
  });

  // Buy tokens for another address
  const buyTokensFor = useMutation({
    mutationFn: async ({
      receiver,
      depositAmount,
      minAmountOut,
    }: {
      receiver: string;
      depositAmount: string;
      minAmountOut: string;
    }) => {
      if (!walletClient || !contractAddress || !address)
        throw new Error(
          'Wallet client, contract address, or user address not available',
        );

      const contract = getContract({
        address: contractAddress as Address,
        abi: bondingCurveABI,
        client: walletClient,
      });

      const depositAmountWei = parseUnits(depositAmount, 18);
      const minAmountOutWei = parseUnits(minAmountOut, 18);

      const hash = await contract.write.buyFor(
        [receiver as Address, depositAmountWei, minAmountOutWei],
        {
          account: address,
          value: depositAmountWei, // For native token purchases
        },
      );

      return hash;
    },
    onSuccess: () => {
      refetchBondingCurveData();
    },
  });

  // Sell tokens
  const sellTokens = useMutation({
    mutationFn: async ({
      depositAmount,
      minAmountOut,
    }: {
      depositAmount: string;
      minAmountOut: string;
    }) => {
      if (!walletClient || !contractAddress || !address)
        throw new Error(
          'Wallet client, contract address, or user address not available',
        );

      const contract = getContract({
        address: contractAddress as Address,
        abi: bondingCurveABI,
        client: walletClient,
      });

      const depositAmountWei = parseUnits(depositAmount, 18);
      const minAmountOutWei = parseUnits(minAmountOut, 18);

      const hash = await contract.write.sell(
        [depositAmountWei, minAmountOutWei],
        {
          account: address,
        },
      );

      return hash;
    },
    onSuccess: () => {
      refetchBondingCurveData();
    },
  });

  // Sell tokens to another address
  const sellTokensTo = useMutation({
    mutationFn: async ({
      receiver,
      depositAmount,
      minAmountOut,
    }: {
      receiver: string;
      depositAmount: string;
      minAmountOut: string;
    }) => {
      if (!walletClient || !contractAddress || !address)
        throw new Error(
          'Wallet client, contract address, or user address not available',
        );

      const contract = getContract({
        address: contractAddress as Address,
        abi: bondingCurveABI,
        client: walletClient,
      });

      const depositAmountWei = parseUnits(depositAmount, 18);
      const minAmountOutWei = parseUnits(minAmountOut, 18);

      const hash = await contract.write.sellTo(
        [receiver as Address, depositAmountWei, minAmountOutWei],
        {
          account: address,
        },
      );

      return hash;
    },
    onSuccess: () => {
      refetchBondingCurveData();
    },
  });

  return {
    bondingCurveData,
    buyTokens,
    buyTokensFor,
    sellTokens,
    sellTokensTo,
    refetchBondingCurveData,
  };
};
