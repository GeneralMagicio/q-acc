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
