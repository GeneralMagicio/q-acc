export const CREATE_PROJECT = /* GraphQL */ `
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
      adminUser {
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

export const CREATE_TEAM_MEMBERS = /* GraphQL */ `
  mutation ($projectId: Float!, $newProjectData: UpdateProjectInput!) {
    updateProject(projectId: $projectId, newProjectData: $newProjectData) {
      teamMembers {
        name
        image
        twitter
        linkedin
        farcaster
      }
    }
  }
`;

export const UPDATE_PROJECT_BY_ID = /* GraphQL */ `
  mutation ($projectId: Float!, $newProjectData: UpdateProjectInput!) {
    updateProject(projectId: $projectId, newProjectData: $newProjectData) {
      id
      title
      description
      descriptionSummary
      image
      slug
      listed
      reviewStatus
      teaser
      verified
      slugHistory
      creationDate
      adminUserId
      walletAddress
      impactLocation
      categories {
        name
      }
      socialMedia {
        type
        link
      }
      addresses {
        address
        isRecipient
        networkId
        chainType
      }
      adminUser {
        id
        name
        email
        walletAddress
      }
    }
  }
`;
export const GET_PROJECT_BY_ID = /* GraphQL */ `
  query ($id: Float!, $connectedWalletUserId: Int) {
    projectById(id: $id, connectedWalletUserId: $connectedWalletUserId) {
      id
      slug
      teaser
      socialMedia {
        type
        link
      }
      verified
      title
      image
      listed
      reviewStatus
      description
      icon
      walletAddress
      adminUserId
      batchNumbersWithSafeTransactions
      categories {
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
        totalSupply
        tokenPrice
        issuanceTokenAddress
        icon
        orchestratorAddress
        projectAddress
        fundingManagerAddress
      }
    }
  }
`;

export const GET_PROJECT_DONATIONS_BY_ID = /* GraphQL */ `
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
        fromTokenAmount
        isSwap
        swapTransaction {
          squidRequestId
          firstTxHash
          secondTxHash
          toChainId
          toTokenSymbol
          toTokenAddress
          toAmount
          fromAmount
          fromChainId
          fromTokenSymbol
          fromTokenAddress
        }
        rewardTokenAmount
        rewardStreamStart
        rewardStreamEnd
        cliff
        earlyAccessRound {
          id
          roundNumber
          endDate
          startDate
        }
        qfRound {
          id
          seasonNumber
        }
        status
        user {
          id
          walletAddress
          firstName
          lastName
          email
        }
        createdAt
      }
      totalCount
      totalUsdBalance
    }
  }
`;

export const GET_PROJECT_BY_SLUG = /* GraphQL */ `
  query ($slug: String!, $connectedWalletUserId: Int) {
    projectBySlug(slug: $slug, connectedWalletUserId: $connectedWalletUserId) {
      __typename
      id
      title
      image
      icon
      slug
      verified
      totalDonations
      description
      teaser
      batchNumbersWithSafeTransactions
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
      hasEARound
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
      abc {
        tokenName
        tokenTicker
        tokenPrice
        totalSupply
        issuanceTokenAddress
        icon
        orchestratorAddress
        projectAddress
        creatorAddress
        nftContractAddress
        chainId
        fundingManagerAddress
      }
      campaigns {
        id
        title
      }
    }
  }
`;

export const GET_PROJECT_METADATA_BY_SLUG = /* GraphQL */ `
  query ($slug: String!) {
    projectBySlug(slug: $slug) {
      __typename
      title
      image
      slug
      teaser
    }
  }
`;

export const SAVE_DONATION = /* GraphQL */ `
  mutation (
    $transactionId: String
    $transactionNetworkId: Float!
    $amount: Float!
    $token: String!
    $projectId: Float!
    $transakId: String
    $anonymous: Boolean
    $referrerId: String
    $safeTransactionId: String
    $tokenAddress: String
    $swapData: SwapTransactionInput
    $fromTokenAmount: Float
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
      tokenAddress: $tokenAddress
      swapData: $swapData
      fromTokenAmount: $fromTokenAmount
    )
  }
`;

export const CREATE_DRAFT_DONATION = /* GraphQL */ `
  mutation (
    $networkId: Float!
    $amount: Float!
    $token: String!
    $projectId: Float!
    $tokenAddress: String
    $toAddress: String
    $anonymous: Boolean
    $referrerId: String
    $safeTransactionId: String
    $fromTokenAmount: Float!
  ) {
    createDraftDonation(
      networkId: $networkId
      amount: $amount
      token: $token
      projectId: $projectId
      tokenAddress: $tokenAddress
      toAddress: $toAddress
      anonymous: $anonymous
      referrerId: $referrerId
      safeTransactionId: $safeTransactionId
      fromTokenAmount: $fromTokenAmount
    )
  }
`;

export const GET_ALL_PROJECTS = /* GraphQL */ `
  {
    allProjects(
      includeAllProjectStatuses: true
      includeAllReviewStatuses: true
      sortingBy: Newest
    ) {
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
        teaser
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
        hasEARound
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
        batchNumbersWithSafeTransactions
        estimatedMatching {
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
          fundingManagerAddress
        }
        seasonNumber
      }
      totalCount
    }
  }
`;

export const CHECK_USER_PRIVADO_VERIFIED_STATE = /* GraphQL */ `
  mutation {
    checkUserPrivadoVerifiedState
  }
`;

export const GET_PROJECT_BY_USER_ID = /* GraphQL */ `
  query ($take: Float, $skip: Float, $userId: Int!) {
    projectsByUserId(take: $take, skip: $skip, userId: $userId) {
      projects {
        id
        title
        balance
        description
        descriptionSummary
        teaser
        image
        slug
        creationDate
        adminUserId
        walletAddress
        impactLocation
        listed
        reviewStatus
        givingBlocksId
        icon
        batchNumbersWithSafeTransactions
        hasEARound
        qfRounds {
          name
          id
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
        tributeClaimModuleAddress
        tributeRecipientAddress
        projectVerificationForm {
          id
          isTermAndConditionsAccepted
          emailConfirmationTokenExpiredAt
          email
          emailConfirmationToken
          emailConfirmationSent
          emailConfirmationSentAt
          emailConfirmedAt
          emailConfirmed
          projectRegistry {
            organizationDescription
            isNonProfitOrganization
            organizationCountry
            organizationWebsite
            attachments
            organizationName
          }
          personalInfo {
            email
            walletAddress
            fullName
          }
          projectContacts {
            name
            url
          }
          milestones {
            mission
            foundationDate
            achievedMilestones
            achievedMilestonesProofs
            problem
            plans
            impact
          }
          managingFunds {
            description
            relatedAddresses {
              address
              networkId
              chainType
              title
            }
          }
          status
        }
        categories {
          name
        }
        reaction {
          reaction
          id
          projectUpdateId
          userId
        }
        addresses {
          address
          isRecipient
          networkId
          chainType
        }
        organization {
          label
        }
        adminUser {
          firstName
          email
          id
          walletAddress
        }
        socialMedia {
          type
          link
        }
        qualityScore
      }
      totalCount
    }
  }
`;

export const GET_PROJECTS_COUNT_BY_USER_ID = /* GraphQL */ `
  query ($take: Float, $skip: Float, $userId: Int!) {
    projectsByUserId(take: $take, skip: $skip, userId: $userId) {
      totalCount
    }
  }
`;

export const GET_PROJECT_DONATIONS_USERS_BY_ID = /* GraphQL */ `
  query ($projectId: Int!, $take: Int) {
    donationsByProjectId(projectId: $projectId, take: $take) {
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
        fromTokenAmount
        rewardTokenAmount
        rewardStreamStart
        rewardStreamEnd
        cliff

        earlyAccessRound {
          id
          roundNumber

          endDate
          startDate
        }
        qfRound {
          id
          seasonNumber
        }
        swapTransaction {
          squidRequestId
          firstTxHash
          secondTxHash
          toChainId
          toTokenSymbol
          toTokenAddress
          toAmount
          fromAmount
          fromChainId
          fromTokenSymbol
          fromTokenAddress
        }
        status
        user {
          id
          walletAddress
          firstName
          lastName
          email
        }
        createdAt
      }
      totalCount
      totalUsdBalance
    }
  }
`;

export const UPDATE_DONATION_STATUS = /* GraphQL */ `
  mutation ($status: String!, $donationId: Float!) {
    updateDonationStatus(status: $status, donationId: $donationId) {
      id
      status
      verifyErrorMessage
    }
  }
`;
