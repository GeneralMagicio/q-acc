import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Address, getContract, parseUnits, formatUnits } from 'viem';
import bondingCurveABI from '@/lib/abi/bondingCurve';

export interface BondingCurveData {
  buyFee: bigint;
  sellFee: bigint;
  buyIsOpen: boolean;
  sellIsOpen: boolean;
  buyReserveRatio: bigint;
  sellReserveRatio: bigint;
  virtualCollateralSupply: bigint;
  virtualIssuanceSupply: bigint;
  token: Address;
  issuanceToken: Address;
}

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
          buyFee,
          sellFee,
          buyIsOpen,
          sellIsOpen,
          buyReserveRatio,
          sellReserveRatio,
          virtualCollateralSupply,
          virtualIssuanceSupply,
          token,
          issuanceToken,
        ] = await publicClient.multicall({
          contracts: [
            {
              address: contractAddress as Address,
              abi: bondingCurveABI,
              functionName: 'buyFee',
            },
            {
              address: contractAddress as Address,
              abi: bondingCurveABI,
              functionName: 'sellFee',
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
              functionName: 'getReserveRatioForBuying',
            },
            {
              address: contractAddress as Address,
              abi: bondingCurveABI,
              functionName: 'getReserveRatioForSelling',
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
          buyFee: buyFee.result as bigint,
          sellFee: sellFee.result as bigint,
          buyIsOpen: buyIsOpen.result as boolean,
          sellIsOpen: sellIsOpen.result as boolean,
          buyReserveRatio: buyReserveRatio.result as bigint,
          sellReserveRatio: sellReserveRatio.result as bigint,
          virtualCollateralSupply: virtualCollateralSupply.result as bigint,
          virtualIssuanceSupply: virtualIssuanceSupply.result as bigint,
          token: token.result as Address,
          issuanceToken: issuanceToken.result as Address,
        };
      },
      enabled: !!contractAddress && !!publicClient,
    },
  );

  // Calculate purchase return
  const calculatePurchaseReturn = useMutation({
    mutationFn: async (depositAmount: string) => {
      if (!publicClient || !contractAddress)
        throw new Error('Client or contract address not available');

      const depositAmountWei = parseUnits(depositAmount, 18);
      const result = await publicClient.readContract({
        address: contractAddress as Address,
        abi: bondingCurveABI,
        functionName: 'calculatePurchaseReturn',
        args: [depositAmountWei],
      });

      return formatUnits(result as bigint, 18);
    },
  });

  // Calculate sale return
  const calculateSaleReturn = useMutation({
    mutationFn: async (depositAmount: string) => {
      if (!publicClient || !contractAddress)
        throw new Error('Client or contract address not available');

      const depositAmountWei = parseUnits(depositAmount, 18);
      const result = await publicClient.readContract({
        address: contractAddress as Address,
        abi: bondingCurveABI,
        functionName: 'calculateSaleReturn',
        args: [depositAmountWei],
      });

      return formatUnits(result as bigint, 18);
    },
  });

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
    calculatePurchaseReturn,
    calculateSaleReturn,
    buyTokens,
    buyTokensFor,
    sellTokens,
    sellTokensTo,
    refetchBondingCurveData,
  };
};
