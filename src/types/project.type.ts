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
  description: string;
  impactLocation?: any;
  categories: any;
  organisationId: number;
  walletAddress?: string;
  addresses?: IWalletAddress[];
  image?: string;
  isDraft?: boolean;
  socialMedia?: IProjectSocialMedia[];
}

export interface IProject {
  id: string;
  title?: string;
  balance?: number;
  image?: string;
  slug: string;
  creationDate?: string;
  adminUserId?: number;
  description?: string;
  descriptionSummary?: string;
  addresses?: IWalletAddress[];
  impactLocation?: string;
  qualityScore?: number;
  verified?: boolean;
  adminUser: IAdminUser;
  donations: {
    id?: string;
  }[];
  totalDonations?: number;
  totalProjectUpdates?: number;
  updatedAt: string;
  latestUpdateCreationDate?: string;
  organization?: {
    name: string;
    label: string;
    supportCustomTokens: boolean;
    disableRecurringDonations?: boolean;
  };
  givbackFactor?: number;
  countUniqueDonors?: number;
  countUniqueDonorsForActiveQfRound?: number;
  sumDonationValueUsdForActiveQfRound?: number;
  socialMedia: IProjectSocialMedia[];
}
