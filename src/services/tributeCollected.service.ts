import axios from 'axios';
import config from '@/config/configuration';

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

export async function getClaimedTributesAndMintedTokenAmounts(
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
