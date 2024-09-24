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
        }
        ... on QfRound {
          name
          slug
          allocatedFund
          beginDate
          endDate
        }
      }
    }
  }
`;
