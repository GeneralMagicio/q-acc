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
        cumulativeCapPerProject
        cumulativeCapPerUserPerProject
      }
      ... on QfRound {
      __typename
        name
        slug
        allocatedFund
        beginDate
        endDate
        roundUSDCapPerProject
        roundUSDCapPerUserPerProject
        tokenPrice
        cumulativeCapPerProject
        cumulativeCapPerUserPerProject
      }
    }
  }
`;

export const GET_ACTIVE_ROUND = `
  query {
    activeRound {
      activeRound {
        ... on EarlyAccessRound {
          roundNumber
          startDate
          endDate
          createdAt
          updatedAt
          roundUSDCapPerProject
          roundUSDCapPerUserPerProject
          tokenPrice
          cumulativeCapPerProject
          cumulativeCapPerUserPerProject
        }
        ... on QfRound {
          name
          slug
          allocatedFund
          beginDate
          endDate
          roundUSDCapPerProject
          roundUSDCapPerUserPerProject
          tokenPrice
          cumulativeCapPerProject
          cumulativeCapPerUserPerProject
        }
      }
    }
  }
`;
