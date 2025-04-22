export interface IEarlyAccessRound {
  __typename: 'EarlyAccessRound';
  roundNumber: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  roundPOLCapPerProject: number;
  roundPOLCapPerUserPerProject: number;
  cumulativePOLCapPerProject: number;
  cumulativePOLCapPerUserPerProject: number;
  isBatchMintingExecuted: boolean;
}

export interface IQfRound {
  __typename: 'QfRound';
  name: string;
  slug: string;
  roundNumber: string;
  allocatedFund: string;
  allocatedFundUSD: string;
  startDate: string;
  endDate: string;
  roundPOLCapPerProject: number;
  roundPOLCapPerUserPerProject: number;
  cumulativePOLCapPerProject: number;
  cumulativePOLCapPerUserPerProject: number;
  roundPOLCloseCapPerProject: number;
  isBatchMintingExecuted: boolean;
  roundPOLCapPerUserPerProjectWithGitcoinScoreOnly: number;
}

export interface IQaccStats {
  totalCollected: number;
  qfTotalCollected: number;
  contributorsCount: number;
}
