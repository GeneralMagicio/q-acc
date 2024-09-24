export interface IEarlyAccessRound {
  roundNumber: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface IQfRound {
  name: string;
  slug: string;
  allocatedFund: string;
  beginDate: string;
  endDate: string;
}
