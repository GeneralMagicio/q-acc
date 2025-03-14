import { readContract, writeContract } from '@wagmi/core';
import { ethers } from 'ethers';
import { Address, erc20Abi, formatUnits, parseUnits } from 'viem';
import { multicall, getBalance, getPublicClient } from 'wagmi/actions';
import { wagmiAdapter } from '@/config/wagmi';

import config from '@/config/configuration';
import { SquidTokenType } from './squidTransactions';

export const AddressZero = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

export const fetchBalanceWithDecimals = async (
  tokenAddress: Address,
  userAddress: Address,
) => {
  try {
    if (tokenAddress === AddressZero) {
      const client = getPublicClient(wagmiAdapter.wagmiConfig);
      const balance = await client?.getBalance({ address: userAddress });
      const formattedBalance = formatUnits(balance!, 18);
      return {
        formattedBalance: formattedBalance,
        decimals: 18, // Native token always has 18 decimals
      };
    } else {
      const [balance, decimals] = await Promise.all([
        readContract(wagmiAdapter.wagmiConfig, {
          address: tokenAddress,
          abi: erc20Abi,
          functionName: 'balanceOf',
          args: [userAddress],
        }),
        readContract(wagmiAdapter.wagmiConfig, {
          address: tokenAddress,
          abi: erc20Abi,
          functionName: 'decimals',
        }),
      ]);

      const formattedBalance = formatUnits(balance, decimals);
      return {
        formattedBalance: formattedBalance,
        decimals,
      };
    }
  } catch (error) {
    console.error('error on fetchBalanceWithDecimals', { error });
    return null;
  }
};

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
  const hash = await writeContract(wagmiAdapter.wagmiConfig, {
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'transfer',
    args: [projectAddress, value],
    // @ts-ignore -- needed for safe txs
    value: 0n,
  });
  return hash;
};

export const fetchTokenPrice = async (
  coingeckoId: string = 'polygon-ecosystem-token',
) => {
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
    const erc20Results = await multicall(wagmiAdapter.wagmiConfig, {
      contracts: erc20Calls,
      allowFailure: true,
    });

    // // Fetch balances for native tokens (e.g., ETH)
    const nativeTokenBalances = await Promise.all(
      nativeTokens.map(async nativeToken => {
        const balance = await getBalance(wagmiAdapter.wagmiConfig, {
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

export const truncateToDecimalPlaces = (strNum: string, decimals: number) => {
  let index = strNum.indexOf('.');
  if (index === -1 || decimals < 1) {
    return Number(strNum);
  }
  let length = index + 1 + decimals;
  return Number(strNum.substring(0, length));
};

export const formatBalance = (balance?: number): string => {
  if (balance === undefined || balance === null || isNaN(balance)) return '0';

  // Convert the balance to a string with high precision
  const balanceStr = balance.toFixed(10); // Use a high precision to avoid rounding issues

  // Find the index of the decimal point
  const decimalIndex = balanceStr.indexOf('.');

  // If there's no decimal point, return the balance as is
  if (decimalIndex === -1) return balanceStr;

  // Extract the integer and decimal parts
  const integerPart = balanceStr.slice(0, decimalIndex);
  const decimalPart = balanceStr.slice(decimalIndex + 1);

  // Find the first two non-zero digits in the decimal part
  let nonZeroCount = 0;
  let result = '';

  for (let i = 0; i < decimalPart.length; i++) {
    if (decimalPart[i] !== '0') {
      nonZeroCount++;
    }
    result += decimalPart[i];
    if (nonZeroCount === 2) {
      break;
    }
  }
  // If no non-zero digits are found, return the integer part
  if (nonZeroCount === 0) return integerPart;

  // Combine the integer part and the formatted decimal part
  return `${integerPart}.${result}`;
};

export const convertMinDonation = async (token: SquidTokenType) => {
  const minPOL = config.MINIMUM_DONATION_AMOUNT;
  const polPrice = await fetchTokenPrice('polygon-ecosystem-token'); // Fetch MATIC price (POL)
  const targetTokenPrice = token.usdPrice;

  if (!polPrice || !targetTokenPrice) {
    console.error('Error fetching token prices');
    return null;
  }

  return (minPOL * polPrice) / targetTokenPrice;
};
