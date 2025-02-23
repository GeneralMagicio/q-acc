import { writeContract } from '@wagmi/core';
import { ethers } from 'ethers';
import { Address, erc20Abi, formatUnits, parseUnits } from 'viem';
import { multicall, getBalance } from 'wagmi/actions';

import { wagmiConfig } from '@/config/wagmi';

import config from '@/config/configuration';

export const AddressZero = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

export const fetchTokenDetails = async ({
  tokenAddress,
  address,
  client,
}: {
  tokenAddress: any;
  address: any;
  client: any;
}) => {
  try {
    const [balance, symbol, decimals] = await Promise.all([
      client.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [address],
      }),
      client
        .readContract({
          address: tokenAddress,
          abi: erc20Abi,
          functionName: 'symbol',
        })
        .catch(() => 'POL'),
      client
        .readContract({
          address: tokenAddress,
          abi: erc20Abi,
          functionName: 'decimals',
        })
        .catch(() => 18),
    ]);

    const formattedBalance = formatUnits(balance, decimals);

    // Return the token details
    return { formattedBalance, symbol, decimals };
  } catch (error) {
    console.error('Error getting token details:', error);
    return { formattedBalance: '0', symbol: 'NA', decimals: 0 };
  }
};

export const handleErc20Transfer = async ({
  inputAmount,
  tokenAddress,
  projectAddress,
}: any) => {
  const value = parseUnits(inputAmount, 18);
  const hash = await writeContract(wagmiConfig, {
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'transfer',
    args: [projectAddress, value],
    // @ts-ignore -- needed for safe txs
    value: 0n,
  });
  return hash;
};

export const fetchTokenPrice = async () => {
  const coingeckoId = 'polygon-ecosystem-token';
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd`,
    );
    const data = await res.json();
    return parseFloat(data[coingeckoId].usd) || 1;
  } catch (error) {
    console.error('Error fetching token price:', error);
    return 1;
  }
};

export const checkUserOwnsNFT = async (
  nftContractAddress: string,
  userAddress: string,
) => {
  const url = config.NETWORK_RPC_ADDRESS;
  const provider = new ethers.JsonRpcProvider(url);

  const abi = [
    {
      inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
  ];

  try {
    const contract = new ethers.Contract(nftContractAddress, abi, provider);
    const balance = await contract.balanceOf(userAddress);
    console.log('BAL', balance);

    return balance > 0;
  } catch (e) {
    console.log('User Own NFT Error', e);
    return false;
  }
};

export async function isContractAddress(address: string): Promise<boolean> {
  if (!address) {
    return false;
  }
  try {
    const provider = new ethers.JsonRpcProvider(config.NETWORK_RPC_ADDRESS);
    const code = await provider.getCode(address);
    return code !== '0x';
  } catch (error) {
    console.error('Error checking contract:', error);
    return false;
  }
}

export const fetchEVMTokenBalances = async <T extends { [key: string]: any }>(
  tokens: T[], // Generic type constrained to IProjectAcceptedToken or IToken
  walletAddress: string | null,
): Promise<T[]> => {
  if (!walletAddress || !tokens || tokens.length === 0) return [];

  // Filter out native tokens
  const erc20Tokens: T[] = [];
  const nativeTokens: T[] = [];

  // Use the correct property name based on the generic token type
  const addressLabel = 'address' in tokens[0] ? 'address' : 'id';

  tokens.forEach(token => {
    const tokenAddress = token[addressLabel as keyof T] as string;

    if (tokenAddress !== AddressZero) {
      erc20Tokens.push(token);
    } else {
      nativeTokens.push(token);
    }
  });

  const erc20Calls = erc20Tokens.map(token => {
    const tokenAddress = token[addressLabel as keyof T] as string;

    // Ensure the tokenAddress is cast as Address (format starting with 0x)
    return {
      address: tokenAddress as Address, // Cast to wagmi Address type
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [walletAddress],
    };
  });

  try {
    // Fetch balances for ERC20 tokens via multicall
    const erc20Results = await multicall(wagmiConfig, {
      contracts: erc20Calls,
      allowFailure: true,
    });

    // // Fetch balances for native tokens (e.g., ETH)
    const nativeTokenBalances = await Promise.all(
      nativeTokens.map(async nativeToken => {
        const balance = await getBalance(wagmiConfig, {
          address: walletAddress as Address,
        });
        return {
          token: nativeToken,
          balance: balance.value || 0,
        };
      }),
    );

    erc20Results.forEach((result, index) => {
      const rawBalance = (result?.result as bigint) || BigInt(0);
      const decimals = erc20Tokens[index].decimals || 18;
      const formattedBalance = Number(rawBalance) / Math.pow(10, decimals);
      (erc20Tokens[index] as any).balance = formattedBalance;
    });

    nativeTokenBalances.forEach(({ token, balance }) => {
      const decimals = token.decimals || 18;
      const formattedBalance = Number(balance) / Math.pow(10, decimals);
      (token as any).balance = formattedBalance;
    });

    // Combine ERC20 and native token balances
    return [...nativeTokens, ...erc20Tokens];
  } catch (error) {
    console.error('Error fetching EVM token balances:', error);

    // Return undefined balances in case of failure
    return tokens.map(token => ({ ...token, balance: 0 }));
  }
};
