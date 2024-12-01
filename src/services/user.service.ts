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
    const res = await requestGraphQL<{ refreshUserScores: IUser }>(
      REFRESH_USER_GITCOIN_PASSPORT_SCORE,
      { address },
      {
        auth: true,
      },
    );
    if (res?.refreshUserScores) {
      res.refreshUserScores.isSignedIn = true;
    }
    return res?.refreshUserScores;
  } catch (error) {
    console.error(error);
  }
};

// This is the function you will call to check if a wallet address is sanctioned.
export const isWalletSanctioned = async (
  walletAddress: string,
): Promise<boolean> => {
  try {
    const baseURL = 'https://api.trmlabs.com/public/';
    const url = `${baseURL}v1/sanctions/screening`;

    // Define the address you want to screen
    const request = [{ address: walletAddress }];

    // Make the POST request using fetch
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    // Parse the JSON response
    const data = await response.json();

    /** Sample response
     * [
     *   {
     *     address: '0xbF7BE1D1aa31E456f09FE9316e07Ac9F15B87De8',
     *     isSanctioned: false
     *   },
     *   {
     *     address: '0x2E100055A4F7100FF9898BAa3409085150355b4f',
     *     isSanctioned: false
     *   },
     *	 ...
     * ]
     */

    // Check the response and determine if the address is sanctioned
    const result = data && data[0];
    return Boolean(result && result.isSanctioned);
  } catch (error) {
    console.error('Error checking wallet sanction status:', error);
    return false;
  }
};
