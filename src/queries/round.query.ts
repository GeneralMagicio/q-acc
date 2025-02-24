export const GET_ALL_ROUNDS = `
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
        startDate:beginDate
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

export const GET_ACTIVE_ROUND = `
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
          allocatedFund
          startDate:beginDate
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

export const GET_PROJECT_ROUND_RECORDS = `
query(
  $projectId: Int!
  $qfRoundNumber: Int
  $earlyAccessRoundNumber: Int
) {
  getProjectRoundRecords(
    projectId: $projectId
    earlyAccessRoundNumber:$earlyAccessRoundNumber
    qfRoundNumber:$qfRoundNumber
    
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

export const GET_QACC_ROUND_STATS = `
query {
    qAccStat {
      totalCollected
      qfTotalCollected
      contributorsCount
    }
  }
`;
