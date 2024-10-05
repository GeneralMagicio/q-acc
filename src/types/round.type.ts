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
  cumulativeCapPerProject: number;
  cumulativeCapPerUserPerProject: number;
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
  cumulativeCapPerProject: number;
  cumulativeCapPerUserPerProject: number;
}
