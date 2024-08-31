export const GET_USER_BY_ADDRESS = `
	query UserByAddress($address: String!) {
		userByAddress(address: $address) {
			__typename
			id
			fullName: name
			avatar
			email
			isSignedIn
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

export const GET_PROJECT_BY_ID = `
  query(
      $id: Float!,
      $connectedWalletUserId: Int,
  ){
    projectById(
     id:$id,
     connectedWalletUserId: $connectedWalletUserId){
      id
      slug,
      verified
      title,
      listed,
      reviewStatus
      description,
      icon
      walletAddress
      adminUserId
      categories{
          name
      }
      reaction {
        id
      }
      addresses {
        address
        isRecipient
        networkId
        chainType
      }
      organization {
        name
        label
        supportCustomTokens
      }
      categories {
        name
        mainCategory {
          title
          slug
          banner
          description
        }
      }
      adminUser {
        firstName
        email
        id
        walletAddress
      }
      teamMembers {
        name
        image
        twitter
        linkedin
        farcaster
      }
      abc {
        tokenName
        tokenTicker
        issuanceTokenAddress
        icon
        orchestratorAddress
        projectAddress
      }
    }
  }`;

export const GET_PROJECT_DONATIONS_BY_ID = `
query (
    $take: Int
    $skip: Int
    $traceable: Boolean
    $qfRoundId: Int
    $projectId: Int!
    $searchTerm: String
    $status: String
    $orderBy: SortBy
  ) {
    donationsByProjectId(
      take: $take
      skip: $skip
      traceable: $traceable
      qfRoundId: $qfRoundId
      projectId: $projectId
      searchTerm: $searchTerm
      status: $status
      orderBy: $orderBy
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
        qfRound {
          id
        }
        status
        user {
          id
          walletAddress
          firstName
          email
        }
        createdAt
      }
      totalCount
      totalUsdBalance
    }
  }`;
