export const GET_USER_BY_ADDRESS = /* GraphQL */ `
  query UserByAddress($address: String!) {
    userByAddress(address: $address) {
      __typename
      id
      fullName: name
      avatar
      email
      isSignedIn
      privadoVerified
      acceptedToS
      passportScore
      analysisScore
      hasEnoughGitcoinPassportScore
      hasEnoughGitcoinAnalysisScore
      qaccPoints
      qaccPointsMultiplier
      projectsFundedCount
      rank
    }
  }
`;

export const GET_GIVETH_USER_BY_ADDRESS = /* GraphQL */ `
  query UserByAddress($address: String!) {
    userByAddress(address: $address) {
      __typename
      id
      avatar
      email
      firstName
      lastName
      name
      isSignedIn
    }
  }
`;

export const UPDATE_USER = /* GraphQL */ `
  mutation ($email: String, $fullName: String, $avatar: String) {
    updateUser(email: $email, fullName: $fullName, avatar: $avatar)
  }
`;

export const GET_USER_DONATIONS = /* GraphQL */ `
  query (
    $take: Int
    $skip: Int
    $status: String
    $orderBy: SortBy
    $userId: Int!
  ) {
    donationsByUserId(
      take: $take
      skip: $skip
      orderBy: $orderBy
      userId: $userId
      status: $status
    ) {
      donations {
        id
        transactionId
        transactionNetworkId
        toWalletAddress
        fromWalletAddress
        currency
        anonymous
        valueUsd
        amount
        status
        cliff
        rewardStreamStart
        rewardStreamEnd
        rewardTokenAmount
        user {
          id
          walletAddress
          email
          firstName
        }
        project {
          id
          slug
          title
          image
          descriptionSummary
          socialMedia {
            type
            link
          }
          abc {
            tokenName
            tokenTicker
            issuanceTokenAddress
            icon
            orchestratorAddress
            projectAddress
            creatorAddress
            nftContractAddress
            chainId
            totalSupply
            tokenPrice
            mintedAmount
            fundingManagerAddress
          }
          totalDonations
        }
        earlyAccessRound {
          roundNumber
          startDate
          endDate
        }
        qfRound {
          id
          name
          isActive
        }
        createdAt
      }
      totalCount
    }
  }
`;

export const GET_USER_DONATIONS_COUNT = /* GraphQL */ `
  query ($status: String, $userId: Int!) {
    donationsByUserId(userId: $userId, status: $status) {
      totalCount
    }
  }
`;

export const USER_ACCEPT_TERMS_MUTATION = /* GraphQL */ `
  mutation AcceptTermsOfService {
    acceptedTermsOfService
  }
`;

export const PROJECT_USER_DONATION_CAP = /* GraphQL */ `
  query ProjectUserDonationCap($projectId: Int!) {
    projectUserDonationCap(projectId: $projectId)
  }
`;

export const PROJECT_USER_DONATION_CAP_KYC = /* GraphQL */ `
  query UserCaps($projectId: Int!) {
    userCaps(projectId: $projectId) {
      qAccCap
      gitcoinPassport {
        unusedCap
      }
      zkId {
        unusedCap
      }
    }
  }
`;

export const REFRESH_USER_GITCOIN_PASSPORT_SCORE = /* GraphQL */ `
  query ($address: String!) {
    refreshUserScores(address: $address) {
      id
      firstName
      lastName
      fullName: name
      email
      avatar
      walletAddress
      url
      location
      likedProjectsCount
      donationsCount
      projectsCount
      passportScore
      passportStamps
      analysisScore
      privadoVerified
      acceptedToS
    }
  }
`;
