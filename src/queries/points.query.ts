export const FETCH_LEADERBOARD = /* GraphQL */ `
  query ($take: Int, $skip: Int, $orderBy: SortUserBy) {
    getUsersByQaccPoints(take: $take, skip: $skip, orderBy: $orderBy) {
      users {
        id
        name
        email
        qaccPoints
        qaccPointsMultiplier
        projectsFundedCount
      }
      totalCount
    }
  }
`;
