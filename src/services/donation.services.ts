import { requestGraphQL } from '@/helpers/request';
import {
  GET_PROJECT_DONATIONS_BY_ID,
  SAVE_DONATION,
  GET_PROJECT_DONATIONS_USERS_BY_ID,
} from '@/queries/project.query';
import {
  GET_USER_DONATIONS,
  GET_USER_DONATIONS_COUNT,
} from '@/queries/user.query';

export const fecthProjectDonationsById = async (
  projectId: number,
  take: number,
  skip: number,
  orderBy?: { field: any; direction: any },
  term?: string,
) => {
  try {
    const res = await requestGraphQL<{ donationsByProjectId: any }>(
      GET_PROJECT_DONATIONS_BY_ID,
      {
        projectId,
        take,
        skip,
        orderBy,
        searchTerm: term,
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

export const fetchUserDonations = async (userId: number) => {
  try {
    const res = await requestGraphQL<{ donationsByUserId: any }>(
      GET_USER_DONATIONS,
      {
        userId,
      },
      {
        auth: true,
      },
    );
    return res?.donationsByUserId;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProjectDonors = async (projectId: number) => {
  try {
    const res = await requestGraphQL<{ donationsByProjectId: any }>(
      GET_PROJECT_DONATIONS_USERS_BY_ID,
      {
        projectId,
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

export const fetchUserDonationsCount = async (userId: number) => {
  try {
    const res = await requestGraphQL<{ donationsByUserId: any }>(
      GET_USER_DONATIONS_COUNT,
      {
        userId,
      },
      {
        auth: true,
      },
    );
    return res?.donationsByUserId;
  } catch (error) {
    console.error(error);
  }
};
