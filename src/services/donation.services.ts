import { requestGraphQL } from '@/helpers/request';
import {
  GET_PROJECT_DONATIONS_BY_ID,
  SAVE_DONATION,
} from '@/queries/project.query';

export const fecthProjectDonationsById = async (
  projectId: number,
  take: number,
  skip: number,
  orderBy?: { field: any; direction: any },
) => {
  try {
    const res = await requestGraphQL<{ donationsByProjectId: any }>(
      GET_PROJECT_DONATIONS_BY_ID,
      {
        projectId,
        take,
        skip,
        orderBy,
      },
      {
        auth: true,
      },
    );
    return res?.donationsByProjectId;
  } catch (error) {
    console.error(error);
  }
};

export const saveDonations = async (
  projectId: number,
  transactionNetworkId: number,
  amount: number,
  token: string,
  transactionId: string,
  tokenAddress: String,
  anonymous: boolean,
) => {
  try {
    console.log('Inde 2');
    const res = await requestGraphQL<{ createDonation: number }>(
      SAVE_DONATION,
      {
        projectId,
        transactionNetworkId,
        amount,
        token,
        transactionId,
        tokenAddress,
        anonymous,
      },
      {
        auth: true,
      },
    );
    return res?.createDonation;
  } catch (error) {
    console.error(error);
  }
};
