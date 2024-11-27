export const GET_USER_BY_ADDRESS = `
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
		}
	}
`;

export const GET_GIVETH_USER_BY_ADDRESS = `
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

export const UPDATE_USER = `mutation(
    $email: String
	  $fullName: String
    $avatar: String
  ) {
    updateUser(
      email: $email
      fullName: $fullName
      avatar: $avatar
    )
  }`;

export const GET_USER_DONATIONS = `
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
          title
          image
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
        earlyAccessRound{
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

export const GET_USER_DONATIONS_COUNT = `
  query (
    $status: String
    $userId: Int!
  ) {
    donationsByUserId(
      userId: $userId
      status: $status
    ) {
      totalCount
    }
  }
`;

export const USER_ACCEPT_TERMS_MUTATION = `
  mutation AcceptTermsOfService {
    acceptedTermsOfService
  }
`;

export const PROJECT_USER_DONATION_CAP = `
  query ProjectUserDonationCap($projectId: Int!) {
    projectUserDonationCap(projectId: $projectId)   
  }
`;

export const PROJECT_USER_DONATION_CAP_KYC = `
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

export const REFRESH_USER_GITCOIN_PASSPORT_SCORE = `query ($address: String!) {
    refreshUserScores(address: $address) {
      id
      firstName
      lastName
      name
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
    }
  }`;
