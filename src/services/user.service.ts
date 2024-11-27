import { Address } from 'viem';
import { requestGraphQL } from '@/helpers/request';
import {
  GET_USER_BY_ADDRESS,
  GET_GIVETH_USER_BY_ADDRESS,
  PROJECT_USER_DONATION_CAP,
  PROJECT_USER_DONATION_CAP_KYC,
  REFRESH_USER_GITCOIN_PASSPORT_SCORE,
} from '../queries/user.query';
import config from '@/config/configuration';
import type {
  IUser,
  IGivethUser,
  IProjectUserDonationCapKyc,
} from '@/types/user.type';

export const fetchUserInfo = async (address: Address) => {
  try {
    const res = await requestGraphQL<{ userByAddress: IUser }>(
      GET_USER_BY_ADDRESS,
      { address },
      { auth: true },
    );
    return res?.userByAddress;
  } catch (error) {
    console.error(error);
  }
};

export const fetchGivethUserInfo = async (address: Address) => {
  try {
    const res = await requestGraphQL<{ userByAddress: IGivethUser }>(
      GET_GIVETH_USER_BY_ADDRESS,
      { address },
      {
        url: config.GIVETH_GQL_ENDPOINT,
        auth: true,
      },
    );
    return res?.userByAddress;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProjectUserDonationCap = async (projectId: Number) => {
  try {
    const res = await requestGraphQL<{ projectUserDonationCap: Number }>(
      PROJECT_USER_DONATION_CAP,
      { projectId },
      { auth: true },
    );
    return res?.projectUserDonationCap;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProjectUserDonationCapKyc = async (projectId: Number) => {
  try {
    const res = await requestGraphQL<{
      userCaps: IProjectUserDonationCapKyc;
    }>(PROJECT_USER_DONATION_CAP_KYC, { projectId }, { auth: true });
    return res?.userCaps;
  } catch (error) {
    console.error(error);
  }
};

export const refreshUserGitcoinPassportScore = async (address: Address) => {
  try {
    const res = await requestGraphQL<{ refreshUserScores: IGivethUser }>(
      REFRESH_USER_GITCOIN_PASSPORT_SCORE,
      { address },
      {
        auth: true,
      },
    );
    return res?.refreshUserScores;
  } catch (error) {
    console.error(error);
  }
};
