export const CREATE_PROJECT = `
mutation ($project: CreateProjectInput!) {
      createProject(project: $project) {
        id
        title
        description
        descriptionSummary
        adminUserId
        image
        impactLocation
        slug
        walletAddress
        listed
        reviewStatus
        verified
        organization {
          id
          name
          label
        }
        status {
          name
          id
          symbol
        }
        categories {
          name
        }
        addresses {
          address
          isRecipient
          networkId
          chainType
        }
        adminUser{
          id
          name
          email
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
  }
`;

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

export const GET_PROJECT_BY_SLUG = `
 query 
      (
      $slug:String!, 
      $connectedWalletUserId: Int
      ) 
{ 
		projectBySlug(
			slug: $slug
			connectedWalletUserId: $connectedWalletUserId
		) {
			__typename
			id
			title
			image
			slug
			verified
			totalDonations
			description
			addresses {
				address
				isRecipient
				networkId
				chainType
			}
      teamMembers {
      name
      image
      twitter
      linkedin
      farcaster
    }
			socialMedia {
				type
				link
			}
			totalProjectUpdates
			creationDate
			reaction {
				id
				userId
			}
			categories {
				name
				value
				mainCategory {
					title
				}
			}
			adminUser {
				id
				name
				walletAddress
				avatar
			}
			listed
			status {
				id
				name
			}
			organization {
				name
				label
				supportCustomTokens
			}
			verificationFormStatus
			givbackFactor
			sumDonationValueUsdForActiveQfRound
			countUniqueDonorsForActiveQfRound
			countUniqueDonors
			estimatedMatching {
				projectDonationsSqrtRootSum
				allProjectsSum
				matchingPool
			}
			campaigns {
				id
				title
			}
		}
	}
`;

export const SAVE_DONATION = `mutation (
  $transactionId: String
  $transactionNetworkId: Float!
  $amount: Float!
  $token: String!
  $projectId: Float!
  $transakId: String
  $anonymous: Boolean
  $referrerId: String
  $safeTransactionId: String
  $tokenAddress:String
) {
  createDonation(
    transactionId: $transactionId
    transactionNetworkId: $transactionNetworkId
    amount: $amount
    token: $token
    projectId: $projectId
    transakId: $transakId
    anonymous: $anonymous
    referrerId: $referrerId
    safeTransactionId: $safeTransactionId
    tokenAddress:$tokenAddress
  )
}`;

export const GET_ALL_PROJECTS = `
{
  allProjects(includeAllProjectStatuses: true, includeAllReviewStatuses: true) {
     projects {
    id
    title
    balance
    image
    slug
    description
    descriptionSummary
    creationDate
    updatedAt
    adminUserId
    description
    walletAddress
    impactLocation
    qualityScore
    verified
    traceCampaignId
    listed
    reviewStatus
    givingBlocksId
    status {
      id
      symbol
      name
      description
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
    reaction {
      id
    }
    adminUser {
      id
      email
      firstName
      walletAddress
    }
    organization {
      name
      label
      supportCustomTokens
    }
    addresses {
      address
      isRecipient
      networkId
      chainType
    }
    qfRounds {
      name
      isActive
      id
      maximumReward
    }
    totalReactions
    totalDonations
    totalTraceDonations
    sumDonationValueUsdForActiveQfRound
    countUniqueDonorsForActiveQfRound
    countUniqueDonors
    estimatedMatching{
       projectDonationsSqrtRootSum
       allProjectsSum
       matchingPool
    }
    icon
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
    }
  }
    totalCount
  }
}`;
