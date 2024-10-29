import { useMemo } from 'react';
import {
  ethers,
  BigNumberish,
  Contract,
  formatUnits,
  parseUnits,
} from 'ethers';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import config from '@/config/configuration';
import { IProject } from '@/types/project.type';
import { IEarlyAccessRound, IQfRound } from '@/types/round.type';

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
      const result: BigNumberish = await contract.calculatePurchaseReturn(
        parseUnits(X.toString(), 18),
      );
      return result;
    },
    enabled: !!contract && !!X,
    select: data => Number(formatUnits(data, 18)),
  });

  let maxPrice = minPrice;
  if (calculatePurchaseReturn.data) {
    const Y = parseFloat((calculatePurchaseReturn.data || 1).toString()); // Prevent division by zero
    // Calculate the max token price (P = X / Y)
    // console.log('X:', X, 'Y:', Y);
    maxPrice = X / Y;
    // console.log('max price:', maxPrice);
  }

  return { min: minPrice, max: maxPrice };
};

interface UseTokenPriceRangeStatusProps {
  allRounds?: (IQfRound | IEarlyAccessRound)[];
  project?: IProject;
}

interface TokenPriceRangeStatusResult {
  isUpdated: boolean;
}

const getBondingCurveSwapsQuery = `
    query getBondingCurveSwapsQuery($orchestratorAddress: String!) {
      BondingCurve(where: {workflow_id: {_ilike: $orchestratorAddress}}){
        id  
        swaps {
          blockTimestamp
          issuanceAmount
          collateralAmount
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
    const latestEndedRound = allRounds
      .filter(round => new Date(round.endDate) < new Date()) // Select rounds with endDate in the past
      .sort(
        (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime(),
      )[0]; // Sort descending and take the first one
    if (latestEndedRound) {
      // if batch minting was not executed yet for the past round, it means the token price range is not valid
      if (!latestEndedRound.isBatchMintingExecuted) {
        return {
          isUpdated: false,
        };
      }
      // otherwise, we need to check number of executed transactions to be same with expected value
      const expectedTransactionsNumber =
        project.numberOfBatchMintingTransactions;
      if (expectedTransactionsNumber) {
        const result = await axios.post(config.INDEXER_GRAPHQL_URL, {
          query: getBondingCurveSwapsQuery,
          variables: {
            orchestratorAddress: project.abc?.orchestratorAddress,
          },
        });
        const swaps = result.data.data.BondingCurve[0]?.swaps;
        const numberOfExecutedTransactions: number = swaps.filter(
          (swap: { swapType: string; initiator: string; recipient: string }) =>
            swap.swapType === 'BUY' &&
            swap.initiator.toLowerCase() === swap.recipient.toLowerCase() &&
            (project.abc?.projectAddress
              ? swap.recipient.toLowerCase() ===
                project.abc?.projectAddress.toLowerCase()
              : true),
        ).length;
        if (numberOfExecutedTransactions < expectedTransactionsNumber) {
          return {
            isUpdated: false,
          };
        }
      }
    }
  }
  return {
    isUpdated: true,
  };
}

export const useTokenPriceRangeStatus = ({
  allRounds,
  project,
}: UseTokenPriceRangeStatusProps): TokenPriceRangeStatusResult => {
  const query = useQuery<TokenPriceRangeStatusResult, Error>({
    queryKey: ['tokenPriceRangeStatus', allRounds, project],
    queryFn: () =>
      getTokenPriceRangeStatus({
        allRounds,
        project,
      }),
    enabled: !!allRounds && !!project, // Run only if allRounds and project is provided
  });

  return (
    query.data || {
      isUpdated: !query.isPending || query.isSuccess,
    }
  );
};
