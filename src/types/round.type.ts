export interface IEarlyAccessRound {
  __typename: 'EarlyAccessRound';
  roundNumber: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  roundUSDCapPerProject: number;
  roundUSDCapPerUserPerProject: number;
  tokenPrice: number;
  cumulativeUSDCapPerProject: number;
  cumulativeUSDCapPerUserPerProject: number;
  isBatchMintingExecuted: boolean;
}

export interface IQfRound {
  __typename: 'QfRound';
  name: string;
  slug: string;
  roundNumber: string;
  allocatedFund: string;
  startDate: string;
  endDate: string;
  roundUSDCapPerProject: number;
  roundUSDCapPerUserPerProject: number;
  tokenPrice: number;
  cumulativeUSDCapPerProject: number;
  cumulativeUSDCapPerUserPerProject: number;
  roundUSDCloseCapPerProject: number;
  isBatchMintingExecuted: boolean;
}
