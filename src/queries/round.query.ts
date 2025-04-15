export const GET_ALL_ROUNDS = /* GraphQL */ `
  query {
    allRounds {
      ... on EarlyAccessRound {
        __typename
        roundNumber
        startDate
        endDate
        createdAt
        updatedAt
        roundPOLCapPerProject
        roundPOLCapPerUserPerProject
        cumulativePOLCapPerProject
        cumulativePOLCapPerUserPerProject
        isBatchMintingExecuted
      }
      ... on QfRound {
        __typename
        name
        slug
        allocatedFund
        allocatedFundUSD
        startDate: beginDate
        endDate
        roundPOLCapPerProject
        roundPOLCapPerUserPerProject
        cumulativePOLCapPerProject
        cumulativePOLCapPerUserPerProject
        roundPOLCloseCapPerProject
        isBatchMintingExecuted
        roundPOLCapPerUserPerProjectWithGitcoinScoreOnly
      }
    }
  }
`;

export const GET_ACTIVE_ROUND = /* GraphQL */ `
  query {
    activeRound {
      activeRound {
        ... on EarlyAccessRound {
          __typename
          roundNumber
          startDate
          endDate
          createdAt
          updatedAt
          roundPOLCapPerProject
          roundPOLCapPerUserPerProject
          cumulativePOLCapPerProject
          cumulativePOLCapPerUserPerProject
          isBatchMintingExecuted
        }
        ... on QfRound {
          __typename
          name
          slug
          roundNumber
          allocatedFund
          allocatedFundUSD
          startDate: beginDate
          endDate
          roundPOLCapPerProject
          roundPOLCapPerUserPerProject
          cumulativePOLCapPerProject
          cumulativePOLCapPerUserPerProject
          roundPOLCloseCapPerProject
          isBatchMintingExecuted
          roundPOLCapPerUserPerProjectWithGitcoinScoreOnly
        }
      }
    }
  }
`;

export const GET_PROJECT_ROUND_RECORDS = /* GraphQL */ `
  query ($projectId: Int!, $qfRoundNumber: Int, $earlyAccessRoundNumber: Int) {
    getProjectRoundRecords(
      projectId: $projectId
      earlyAccessRoundNumber: $earlyAccessRoundNumber
      qfRoundNumber: $qfRoundNumber
    ) {
      projectId
      cumulativePastRoundsDonationAmounts
      totalDonationAmount
      totalDonationUsdAmount
      qfRound {
        id
      }
      earlyAccessRound {
        id
        roundNumber
      }
    }
  }
`;

export const GET_QACC_ROUND_STATS = /* GraphQL */ `
  query {
    qAccStat {
      totalCollected
      qfTotalCollected
      contributorsCount
    }
  }
`;
