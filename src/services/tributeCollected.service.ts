import axios from 'axios';
import config from '@/config/configuration';

const getClaimedTributesAndMintedTokenAmountsQuery = `
query GetTokenTotalSupplyByAddress($orchestratorAddress: String!) {
  BondingCurve(where: {workflow_id: {_ilike: $orchestratorAddress}}) {
    id
    projectFees {
      id
      amount
      recipient
    }
    swaps {
      swapType
      initiator
      recipient
      amountISS
    }
  }
}
`;

export async function getClaimedTributesAndMintedTokenAmounts(
  orchestratorAddress?: string,
  projectAddress?: string,
): Promise<{
  claimedTributes: number;
  mintedTokenAmounts: number;
}> {
  const SUPPORTED_CHAIN = config.SUPPORTED_CHAINS[0];
  try {
    const result = await axios.post(config.INDEXER_GRAPHQL_URL, {
      query: getClaimedTributesAndMintedTokenAmountsQuery,
      variables: {
        orchestratorAddress: `${SUPPORTED_CHAIN.id}-${orchestratorAddress}`,
      },
    });

    const projectFees = result.data.data.BondingCurve[0]?.projectFees || [];
    const claimedTributes = projectFees.reduce(
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
        (sum: any, swap: { amountISS: number }) =>
          sum + (Number(swap.amountISS) || 0),
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
