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
        roundUSDCapPerProject
        roundUSDCapPerUserPerProject
        tokenPrice
        cumulativeUSDCapPerProject
        cumulativeUSDCapPerUserPerProject
      }
      ... on QfRound {
      __typename
        name
        slug
        allocatedFund
        startDate:beginDate
        endDate
        roundUSDCapPerProject
        roundUSDCapPerUserPerProject
        tokenPrice
        cumulativeUSDCapPerProject
        cumulativeUSDCapPerUserPerProject
        roundUSDCloseCapPerProject
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
          roundUSDCapPerProject
          roundUSDCapPerUserPerProject
          tokenPrice
          cumulativeUSDCapPerProject
          cumulativeUSDCapPerUserPerProject
        }
        ... on QfRound {
          __typename
          name
          slug
          allocatedFund
          startDate:beginDate
          endDate
          roundUSDCapPerProject
          roundUSDCapPerUserPerProject
          tokenPrice
          cumulativeUSDCapPerProject
          cumulativeUSDCapPerUserPerProject
          roundUSDCloseCapPerProject
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
