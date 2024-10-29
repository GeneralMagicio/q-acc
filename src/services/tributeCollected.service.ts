import { useMemo } from 'react';
import { ethers, BigNumberish, Contract, formatUnits } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
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

const getClaimedTributesAndMintedTokenAmountsQuery = `
    query GetTokenTotalSupplyByAddress($orchestratorAddress: String!) {
      BondingCurve(where: {workflow_id: {_ilike: $orchestratorAddress}}){
        id
        feeClaim {
          id
          amount
          recipient
        }
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

async function getClaimedTributesAndMintedTokenAmounts(
  orchestratorAddress?: string,
  projectAddress?: string,
): Promise<{
  claimedTributes: number;
  mintedTokenAmounts: number;
}> {
  try {
    const result = await axios.post(config.INDEXER_GRAPHQL_URL, {
      query: getClaimedTributesAndMintedTokenAmountsQuery,
      variables: {
        orchestratorAddress,
      },
    });

    const feeClaims = result.data.data.BondingCurve[0]?.feeClaim;
    const claimedTributes = feeClaims.reduce(
      (sum: any, fee: { amount: any }) => sum + (Number(fee.amount) || 0),
      0,
    );

    const swaps = result.data.data.BondingCurve[0]?.swaps;

    const mintedTokenAmounts = swaps
      .filter(
        (swap: { swapType: string; initiator: string; recipient: string }) =>
          swap.swapType === 'BUY' &&
          swap.initiator.toLowerCase() === swap.recipient.toLowerCase() &&
          (!projectAddress ||
            swap.recipient.toLowerCase() === projectAddress?.toLowerCase()),
      )
      .reduce(
        (sum: any, swap: { issuanceAmount: any }) =>
          sum + (Number(swap.issuanceAmount) || 0),
        0,
      );

    return {
      claimedTributes,
      mintedTokenAmounts,
    };
  } catch (e) {
    console.error(
      'error in getting claimed tributes and minted ABC token amounts',
      e,
    );
    return {
      claimedTributes: 0,
      mintedTokenAmounts: 0,
    };
  }
}

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
    enabled: !!orchestratorAddress && !!projectAddress, // Run only if orchestratorAddress and projectAddress is provided
  });

  return (
    query.data || {
      claimedTributes: 0,
      mintedTokenAmounts: 0,
    }
  );
};
