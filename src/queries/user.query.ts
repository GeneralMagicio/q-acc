export const GET_USER_BY_ADDRESS = `
	query UserByAddress($address: String!) {
		userByAddress(address: $address) {
			__typename
			id
			fullName: name
			avatar
			email
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
