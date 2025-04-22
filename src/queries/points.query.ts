export const FETCH_LEADERBOARD = /* GraphQL */ `
  query ($take: Int, $skip: Int, $orderBy: SortUserBy, $walletAddress: String) {
    getUsersByQaccPoints(
      take: $take
      skip: $skip
      orderBy: $orderBy
      walletAddress: $walletAddress
    ) {
      users {
        id
        name
        email
        qaccPoints
        qaccPointsMultiplier
        projectsFundedCount
        rank
      }
      totalCount
    }
  }
`;

export const FETCH_POINTS_HISTORY_OF_USER = /* GraphQL */ `
  query getQaccPointsHistory {
    getQaccPointsHistory {
      pointsEarned
      user {
        name
      }
      donation {
        id
      }
    }
  }
`;
