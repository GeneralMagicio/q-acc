import axios from 'axios';
import { ethers } from 'ethers';
import config from '@/config/configuration';
const integratorId: string = config.SQUID_INTEGRATOR_ID;

export type SquidTokenType = {
  symbol: string;
  address: string;
  chainId: string;
  name: string;
  decimals: number;
  usdPrice: number;
  coingeckoId: string;
  type: string;
  logoURI: string;
  subGraphIds: string[];
  subGraphOnly: boolean;
  active: boolean;
  balance?: number | undefined;
};

export const getRoute = async (params: any) => {
  try {
    const result = await axios.post(
      'https://apiplus.squidrouter.com/v2/route',
      params,
      {
        headers: {
          'x-integrator-id': integratorId,
          'Content-Type': 'application/json',
        },
      },
    );
    const requestId = result.headers['x-request-id'];
    return { data: result.data, requestId: requestId };
  } catch (error: any) {
    if (error.response) {
      console.error('API error:', error.response.data);
    }
    console.error('Error with parameters:', params);
    throw error;
  }
};

export const approveSpending = async (
  transactionRequestTarget: string,
  fromToken: string,
  fromAmount: string,
) => {
  const erc20Abi = [
    'function approve(address spender, uint256 amount) public returns (bool)',
  ];

  let provider = new ethers.BrowserProvider(window.ethereum);
  let signer = await provider.getSigner();

  const tokenContract = new ethers.Contract(fromToken, erc20Abi, signer);

  try {
    const tx = await tokenContract.approve(
      transactionRequestTarget,
      fromAmount,
    );
    await tx.wait();
    console.log(
      `Approved ${fromAmount} tokens for ${transactionRequestTarget}`,
    );
  } catch (error) {
    console.error('Approval failed:', error);
    throw error;
  }
};

export const getStatus = async (params: any) => {
  try {
    const result = await axios.get(
      'https://apiplus.squidrouter.com/v2/status',
      {
        params,
        headers: {
          'x-integrator-id': integratorId,
        },
      },
    );
    return result.data;
  } catch (error: any) {
    if (error.response) {
      console.error('API error:', error.response.data);
    }
    console.error('Error with parameters:', params);
    throw error;
  }
};

export const updateTransactionStatus = async (
  txHash: string,
  requestId: string,
  fromChainId: string,
) => {
  const getStatusParams = {
    transactionId: txHash,
    requestId,
    fromChainId,
    toChainId: '137',
  };

  let status;
  const completedStatuses = [
    'success',
    'partial_success',
    'needs_gas',
    'not_found',
  ];
  const maxRetries = 10; // Maximum number of retries for status check
  let retryCount = 0;

  do {
    try {
      status = await getStatus(getStatusParams);
      console.log(`Route status: ${status.squidTransactionStatus}`);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        retryCount++;
        if (retryCount >= maxRetries) {
          console.error('Max retries reached. Transaction not found.');
          break;
        }
        console.log('Transaction not found. Retrying...');
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
        continue;
      } else {
        throw error; // Rethrow other errors
      }
    }

    if (!completedStatuses.includes(status.squidTransactionStatus)) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before checking the status again
    }
  } while (!completedStatuses.includes(status.squidTransactionStatus));
};
