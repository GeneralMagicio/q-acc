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
            totalSupply
            tokenName
            projectAddress
            tokenPrice
            icon
          }
          totalDonations
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
