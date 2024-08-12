import {
  ICategory,
  IDonation,
  IProject,
  IProjectUpdate,
  IWalletAddress,
  IWalletDonation,
  IWalletRecurringDonation,
} from "./types";

export interface IFetchAllProjects {
  projects: IProject[];
  totalCount: number;
  categories: ICategory[];
}

export interface IProjectBySlug {
  project?: IProject;
}

export interface IFetchProjectUpdates {
  projectUpdate: IProjectUpdate;
}

export interface IDonationsByProjectIdGQL {
  data: {
    donationsByProjectId: IDonationsByProjectId;
  };
}

export interface IDonationsByProjectId {
  donations: IDonation[];
  totalCount: number;
  recurringDonationsCount: number;
  totalUsdBalance: number;
}

export interface IUserProjects {
  projects: IProject[];
  totalCount: number;
}

export interface IUserDonations {
  donations: IWalletDonation[];
  totalCount: number;
}

export interface IUserRecurringDonations {
  recurringDonations: IWalletRecurringDonation[];
  totalCount: number;
}

export interface IUserLikedProjects {
  projects: IProject[];
  totalCount: number;
}

export interface ISuggestedProjectsGQL {
  data: {
    similarProjectsBySlug: {
      projects: IProject[];
    };
  };
}

export interface ICheckPurpleListGQL {
  data: {
    walletAddressIsPurpleListed: boolean;
  };
}

export interface IMeGQL {
  data: {
    me: {
      walletAddress: string;
    };
  };
}
