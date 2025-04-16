import { useMemo } from 'react';
import { ethers, BigNumberish, Contract, formatUnits } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import config from '@/config/configuration';
import { IProject } from '@/types/project.type';
import { IEarlyAccessRound, IQfRound } from '@/types/round.type';

const provider = new ethers.JsonRpcProvider(config.NETWORK_RPC_ADDRESS);

const abi = [
  {
    inputs: [],
    name: 'getReserveRatioForBuying',
    outputs: [{ internalType: 'uint32', name: '', type: 'uint32' }],
    stateMutability: 'view',
    type: 'function',
  },
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
  {
    inputs: [],
    name: 'getVirtualIssuanceSupply',
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

  // // Fetch `getVirtualCollateralSupply` (total contributed so far)
  // const virtualCollateralSupply = useQuery<BigNumberish, Error>({
  //   queryKey: ['getVirtualCollateralSupply', contractAddress],
  //   queryFn: async () => {
  //     if (!contract) throw new Error('Contract not loaded');
  //     const result: BigNumberish = await contract.getVirtualCollateralSupply();
  //     return result;
  //   },
  //   enabled: !!contract,
  //   select: data => Number(formatUnits(data, 18)),
  // });
  //
  // const contributedSoFar = parseFloat(
  //   (virtualCollateralSupply.data || '0').toString(),
  // ); // todo: we need to deduct the initial supply from that
  // // Calculate the upper limit (X)
  // const X = contributionLimit - contributedSoFar;
  //
  // // Fetch `calculatePurchaseReturn` using X
  // const calculatePurchaseReturn = useQuery<BigNumberish, Error>({
  //   queryKey: ['calculatePurchaseReturn', X.toString(), contractAddress],
  //   queryFn: async () => {
  //     if (!contract) throw new Error('Contract not loaded');
  //     const result: BigNumberish = await contract.calculatePurchaseReturn(
  //       parseUnits(X.toString(), 18),
  //     );
  //     return result;
  //   },
  //   enabled: !!contract && !!X,
  //   select: data => Number(formatUnits(data, 18)),
  // });
  //
  // let maxPrice = minPrice;
  // if (calculatePurchaseReturn.data) {
  //   const Y = parseFloat((calculatePurchaseReturn.data || 1).toString()); // Prevent division by zero
  //   // Calculate the max token price (P = X / Y)
  //   // console.log('X:', X, 'Y:', Y);
  //   maxPrice = X / Y;
  //   // console.log('max price:', maxPrice);
  // }

  const maxPrice = minPrice + 0.806; // hardcode max price with a delta of 0.786

  return { min: minPrice, max: maxPrice };
};

interface UseTokenPriceRangeStatusProps {
  allRounds?: (IQfRound | IEarlyAccessRound)[];
  project?: IProject;
}

interface TokenPriceRangeStatusResult {
  isPriceUpToDate: boolean;
}

const getBondingCurveSwapsQuery = `
    query getBondingCurveSwapsQuery($orchestratorAddress: String!) {
      BondingCurve(where: {workflow_id: {_ilike: $orchestratorAddress}}){
        id  
        swaps {
          swapType
          initiator
          recipient
        }
      }
    }
`;

async function getTokenPriceRangeStatus({
  allRounds,
  project,
}: UseTokenPriceRangeStatusProps): Promise<TokenPriceRangeStatusResult> {
  if (allRounds && project) {
    const tenMinutesLater =
      new Date().getTime() +
      Number(process.env.NEXT_PUBLIC_ADJUSTED_MINUTES || '10') * 60 * 1000;
    const latestEndedRound = allRounds
      .filter(round => new Date(round.endDate).getTime() < tenMinutesLater) // Select rounds with endDate in past or less than 10 minutes later
      .sort(
        (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime(),
      )[0]; // Sort descending and take the first one
    if (latestEndedRound) {
      // if batch minting was not executed yet for the past round, it means the token price range is not valid
      if (!latestEndedRound.isBatchMintingExecuted) {
        return {
          isPriceUpToDate: false,
        };
      }
      // otherwise, we need to check number of executed transactions to be same with expected value
      const expectedTransactionsNumber =
        project.batchNumbersWithSafeTransactions?.length;
      if (expectedTransactionsNumber) {
        try {
          const result = await axios.post(config.INDEXER_GRAPHQL_URL, {
            query: getBondingCurveSwapsQuery,
            variables: {
              orchestratorAddress: `${config.SUPPORTED_CHAINS[0]?.id}-${project.abc?.orchestratorAddress}`,
            },
          });
          const swaps = result.data.data.BondingCurve[0]?.swaps;
          const numberOfExecutedTransactions: number = swaps.filter(
            (swap: {
              swapType: string;
              initiator: string;
              recipient: string;
            }) =>
              swap.swapType === 'BUY' &&
              swap.initiator.toLowerCase() === swap.recipient.toLowerCase() &&
              (project.abc?.projectAddress
                ? swap.recipient.toLowerCase() ===
                  project.abc?.projectAddress.toLowerCase()
                : true),
          ).length;
          if (numberOfExecutedTransactions < expectedTransactionsNumber) {
            return {
              isPriceUpToDate: false,
            };
          }
        } catch (error) {
          console.error('Error fetching data from the endpoint:', error);
          return {
            isPriceUpToDate: true,
          };
        }
      }
    }
  }
  return {
    isPriceUpToDate: true,
  };
}

export const useTokenPriceRangeStatus = ({
  allRounds,
  project,
}: UseTokenPriceRangeStatusProps): {
  data?: TokenPriceRangeStatusResult;
  isSuccess: boolean;
} => {
  return useQuery<TokenPriceRangeStatusResult, Error>({
    queryKey: ['tokenPriceRangeStatus', allRounds, project],
    queryFn: () =>
      getTokenPriceRangeStatus({
        allRounds,
        project,
      }),
    enabled: !!allRounds && !!project, // Run only if allRounds and project is provided
  });
};

export async function getTokenSupplyDetails(address: string) {
  const contract = new ethers.Contract(address, abi, provider);
  const price = await contract.getStaticPriceForBuying();
  const reserveRatioForBuying = await contract.getReserveRatioForBuying();
  const virtualCollateralSupply = await contract.getVirtualCollateralSupply();
  const virtualIssuanceSupply = await contract.getVirtualIssuanceSupply();
  const collateral_supply = formatUnits(virtualCollateralSupply, 18);
  const issuance_supply = formatUnits(virtualIssuanceSupply, 18);
  const reserve_ration = formatUnits(reserveRatioForBuying, 6);
  return {
    reserve_ration,
    collateral_supply,
    issuance_supply,
  };
}

export async function calculateMarketCapChange(
  donations: any[],
  contract_address: string,
) {
  const { reserve_ration, collateral_supply, issuance_supply } =
    await getTokenSupplyDetails(contract_address);

  const reserveRatio = Number(reserve_ration);
  let reserve = Number(collateral_supply);
  let supply = Number(issuance_supply);

  // Sort by date
  let history: { createdAt: string; marketCap: number; id: number }[] = [];
  const initialPrice = reserve / (supply * reserveRatio);

  const initialMarketCap = supply * initialPrice;
  const initialTimestamp = '2025-04-01T00:00:00Z'; // virtual Day 0 timestamp (can be set based on your round start)

  history.push({
    createdAt: initialTimestamp,
    marketCap: initialMarketCap,
    id: 0,
  });

  const now = new Date();
  const cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const recentDonationExists = donations.some(
    d => new Date(d.createdAt) > cutoff,
  );

  const filteredDonations = donations.filter(
    d => new Date(d.createdAt) > new Date(initialTimestamp),
  );

  filteredDonations.forEach(({ amount, createdAt, id }) => {
    supply = supply * Math.pow(1 + amount / reserve, reserveRatio);
    reserve += amount;
    const price = reserve / (supply * reserveRatio);
    const marketCap = supply * price;
    history.push({ createdAt, marketCap, id: id });
  });

  // Find market cap from ≥24h ago

  const past = [...history]
    .reverse()
    .find(h => new Date(h.createdAt) <= cutoff);

  const marketCapPast = past ? past.marketCap : initialMarketCap;

  const latestMarketCap = history[history.length - 1].marketCap;

  // const change24h = ((marketCapNow - marketCapPast) / marketCapPast) * 100;
  const change24h = recentDonationExists
    ? ((latestMarketCap - marketCapPast) / marketCapPast) * 100
    : 0;
  return {
    marketCap: Math.round(latestMarketCap),
    change24h: change24h,
  };
}
