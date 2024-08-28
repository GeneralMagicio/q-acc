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
