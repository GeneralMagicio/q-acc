export interface IEarlyAccessRound {
  __typename: 'EarlyAccessRound';
  roundNumber: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface IQfRound {
  __typename: 'QfRound';
  name: string;
  slug: string;
  allocatedFund: string;
  beginDate: string;
  endDate: string;
}
