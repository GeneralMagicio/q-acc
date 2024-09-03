import { TeamMember } from '@/components/Create/CreateTeamForm';

export enum ChainType {
  SOLANA = 'SOLANA',
  EVM = 'EVM',
}

export interface IWalletAddress {
  address?: string;
  isRecipient?: boolean;
  networkId?: number;
  chainType?: ChainType;
}

export interface IAdminUser {
  id?: string;
  email?: string;
  name?: string;
  walletAddress?: string;
  avatar?: string;
}

export enum EProjectSocialMediaType {
  FACEBOOK = 'FACEBOOK',
  X = 'X',
  INSTAGRAM = 'INSTAGRAM',
  YOUTUBE = 'YOUTUBE',
  LINKEDIN = 'LINKEDIN',
  REDDIT = 'REDDIT',
  DISCORD = 'DISCORD',
  FARCASTER = 'FARCASTER',
  LENS = 'LENS',
  WEBSITE = 'WEBSITE',
  TELEGRAM = 'TELEGRAM',
  GITHUB = 'GITHUB',
}

export interface IProjectSocialMedia {
  type: EProjectSocialMediaType;
  link: string;
}

export interface IProjectCreation {
  title: string;
  description?: string;
  impactLocation?: string;
  categories?: string[];
  organisationId?: number;
  // walletAddress?: string;
  // addresses?: IWalletAddress[];
  image?: string;
  teaser?: string;
  icon?: string;
  isDraft?: boolean;
  socialMedia?: IProjectSocialMedia[];
  adminUserId?: number;
  teamMembers?: TeamMember[];
  address: string;
}
export interface IProject {
  id: string;
  title?: string;
  balance?: number;
  image?: string;
  slug: string;
  creationDate?: string;
  updatedAt: string;
  adminUserId?: number;
  description?: string;
  descriptionSummary?: string;
  teaser?: string;
  walletAddress?: string;
  impactLocation?: string;
  qualityScore?: number;
  verified?: boolean;
  traceCampaignId?: string;
  listed?: boolean;
  reviewStatus?: string;
  givingBlocksId?: string;
  totalReactions?: number;
  totalDonations?: number;
  totalTraceDonations?: number;
  sumDonationValueUsdForActiveQfRound?: number;
  countUniqueDonorsForActiveQfRound?: number;
  countUniqueDonors?: number;
  estimatedMatching?: {
    projectDonationsSqrtRootSum?: number;
    allProjectsSum?: number;
    matchingPool?: number;
  };
  icon?: string;
  abc?: {
    tokenName?: string;
    tokenTicker?: string;
    issuanceTokenAddress?: string;
    icon?: string;
    orchestratorAddress?: string;
    projectAddress?: string;
    creatorAddress?: string;
    nftContractAddress?: string;
    chainId?: number;
  };
  status?: {
    id: string;
    symbol: string;
    name: string;
    description?: string;
  };
  categories?: {
    name: string;
    mainCategory?: {
      title: string;
      slug: string;
      banner?: string;
      description?: string;
    };
  }[];
  reaction?: {
    id: string;
  };
  adminUser: {
    id: string;
    email: string;
    firstName: string;
    walletAddress?: string;
  };
  organization?: {
    name: string;
    label: string;
    supportCustomTokens: boolean;
  };
  addresses?: {
    address: string;
    isRecipient: boolean;
    networkId?: string;
    chainType?: string;
  }[];
  qfRounds?: {
    name: string;
    isActive: boolean;
    id: string;
    maximumReward?: number;
  }[];
  socialMedia?: IProjectSocialMedia[];
}
