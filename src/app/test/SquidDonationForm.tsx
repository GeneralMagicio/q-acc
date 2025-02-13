'use client';

import React, { useEffect, useState } from 'react';
import { BrowserProvider, ethers, JsonRpcSigner } from 'ethers';
import axios from 'axios';
import { getConnectorClient, getToken, Transport } from '@wagmi/core';
import { wagmiConfig } from '@/config/wagmi';
import {
  Account,
  Address,
  Chain,
  Client,
  createPublicClient,
  http,
} from 'viem';
import { fetchBalanceWithDecimals, fetchTokenDetails } from '@/helpers/token';
import { useAccount, useSwitchChain } from 'wagmi';
import config from '@/config/configuration';
import { getRoute } from '@/components/TestExchange';

// Define chain and token options
const chainOptions = [
  { id: '1', name: 'Mainnet' },
  { id: '137', name: 'Polygon' },
  { id: '8453', name: 'Base' },
  // Add more chains as needed
];

const tokenOptions: any = {
  '1': [
    { address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', symbol: 'ETH' },
    { address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', symbol: 'USDC' },
  ],
  '137': [
    { address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', symbol: 'POL' },
    { address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', symbol: 'USDC' },
  ],
  '8453': [
    { address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', symbol: 'USDC' },
    { address: '0x0555E30da8f98308EdB960aa94C0Db47230d2B9c', symbol: 'WBTC' },
  ],
  // Add more tokens for each chain as needed
};

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
}

export async function getEthersSigner({ chainId }: { chainId?: number } = {}) {
  const client = await getConnectorClient(wagmiConfig, { chainId });
  return clientToSigner(client);
}

const approveSpending = async (
  transactionRequestTarget: string,
  fromToken: string,
  fromAmount: string,
) => {
  const erc20Abi = [
    'function approve(address spender, uint256 amount) public returns (bool)',
  ];

  let provider = new ethers.BrowserProvider(window.ethereum);

  // It also provides an opportunity to request access to write
  // operations, which will be performed by the private key
  // that MetaMask manages for the user.
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

const integratorId: string =
  'test-project-4ba94915-f432-4d42-89df-53c6de4dd93e'; //coral integrator

// 'qacc-test-e21b6dcc-6412-4182-8004-e5e190fdd0d3';
// Function to get the status of the transaction using Squid API
const getStatus = async (params: any) => {
  try {
    const result = await axios.get(
      'https://apiplus.squidrouter.com/v2/status',
      {
        params: {
          transactionId: params.transactionId,
          requestId: params.requestId,
          fromChainId: params.fromChainId,
          toChainId: params.toChainId,
        },
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

// Function to periodically check the transaction status until it completes
const updateTransactionStatus = async (
  txHash: string,
  requestId: string,
  fromChainId: string,
) => {
  const getStatusParams = {
    transactionId: txHash,
    requestId: requestId,
    fromChainId: fromChainId,
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

export function SquidDonationForm() {
  const [fromChain, setFromChain] = useState('');
  const [toChain, setToChain] = useState(chainOptions[1].id);
  const [fromToken, setFromToken] = useState<Address>(
    '0x0000000000000000000000000000000000000000',
  );
  const [toToken, setToToken] = useState(tokenOptions[toChain][0].address);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { chain } = useAccount();
  const { address, isConnected } = useAccount();
  const { switchChain } = useSwitchChain();

  const handleChainChange = (event: any) => {
    const chainId = event.target.value;
    setFromChain(chainId);
    // Reset token selection when chain changes
    setFromToken('0x0000000000000000000000000000000000000000');
  };

  const handleTokenChange = (event: any) => {
    setFromToken(event.target.value);
  };

  useEffect(() => {
    console.log(fromChain, chain?.id);
    if (isConnected && chain?.id !== Number(fromChain)) {
      try {
        console.log('inside');
        switchChain({ chainId: Number(fromChain) });
      } catch (err) {
        console.error('Failed to switch chain', err);
        setError('Failed to switch network');
      }
    }
  }, [fromChain, isConnected, chain?.id, switchChain]);

  const client = createPublicClient({
    chain: chain,
    transport: http(config.NETWORK_RPC_ADDRESS),
  });

  const getTokenDecimals = async (tokenAddress: Address) => {
    console.log(tokenAddress, chain, address);
    const res = await fetchBalanceWithDecimals(tokenAddress, address!);
    return res;
  };

  // Function to convert user input amount to token units
  const convertToTokenUnits = (amount: string, decimals: number) => {
    return ethers.parseUnits(amount, decimals).toString();
  };

  // Function to approve the transactionRequest.target to spend fromAmount of fromToken

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Fetch decimals for fromToken
      const signer = await getEthersSigner();
      console.log('from token', fromToken);
      const fromTokenDecimals = await getTokenDecimals(fromToken);
      console.log(`Decimals for fromToken: ${fromTokenDecimals}`);
      const fromAmount = convertToTokenUnits(
        amount,
        fromTokenDecimals?.decimals || 18,
      );
      console.log(`Converted fromAmount: ${fromAmount}`);

      //Get Quote
      const params = {
        fromAddress: signer.address,
        fromChain: fromChain,
        fromToken: fromToken,
        fromAmount: fromAmount,
        toChain: '137',
        toToken: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        toAddress: '0x9eF71aa2276d1BfceF83F9d7150F5026Ee782789',
        quoteOnly: false,
      };

      console.log(params);
      const routeResult = await getRoute(params);
      const route = routeResult.data.route;
      const requestId = routeResult.requestId;
      console.log('Route Result', routeResult);
      console.log('Calculated route:', route);
      console.log('requestId:', requestId);

      const transactionRequest = route.transactionRequest;
      console.log('Transaction Request ', transactionRequest);

      // //   // If not using native token, approve spending
      await approveSpending(transactionRequest.target, fromToken, fromAmount);

      const tx = await signer.sendTransaction({
        to: transactionRequest.target,
        data: transactionRequest.data,
        value: transactionRequest.value,
        // gasPrice: (await provider.getFeeData()).gasPrice,
        gasLimit: transactionRequest.gasLimit,
      });

      console.log(tx.hash);
      const txReceipt = await tx.wait();
      console.log('Tx Receipt');
      console.log(txReceipt);

      console.log('Transaction Request', transactionRequest.requestId);
      await updateTransactionStatus(
        tx.hash,
        transactionRequest.requestId,
        fromChain,
      );

      console.log('Parameters:', params);
    } catch (err) {
      setError('An error occurred while processing your donation.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Donate with Squid
      </h2>
      <form onSubmit={handleDonate}>
        <div className='mb-4'>
          <label
            htmlFor='chain-select'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Select Chain
          </label>
          <select
            id='chain-select'
            value={fromChain}
            onChange={handleChainChange}
            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
          >
            <option value=''>Select a Chain</option>
            {chainOptions.map(chain => (
              <option key={chain.id} value={chain.id}>
                {chain.name}
              </option>
            ))}
          </select>
        </div>

        {fromChain && (
          <div>
            <label
              htmlFor='token-select'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Select Token
            </label>
            <select
              id='token-select'
              value={fromToken}
              onChange={handleTokenChange}
              className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
            >
              <option value=''>Select a Token</option>
              {tokenOptions[fromChain].map((token: any) => (
                <option key={token.address} value={token.address}>
                  {token.symbol}
                </option>
              ))}
            </select>
          </div>
        )}

        {fromChain && fromToken && (
          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor='amount'
              style={{ display: 'block', marginBottom: '5px' }}
            >
              Amount
            </label>
            <input
              id='amount'
              type='number'
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder='Enter amount'
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        )}

        <button
          type='submit'
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: loading ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Processing...' : 'Donate'}
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {success && (
        <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>
      )}
    </div>
  );
}
