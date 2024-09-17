import { writeContract } from '@wagmi/core';
import { ethers } from 'ethers';
import { erc20Abi, formatUnits, parseUnits } from 'viem';
import { wagmiConfig } from '@/config/wagmi';

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

export const fetchTokenPrice = async (tokenId: string) => {
  const coingeckoId = 'polygon-ecosystem-token';
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd`,
    );
    const data = await res.json();
    return parseFloat(data[coingeckoId].usd);
  } catch (error) {
    console.error('Error fetching token price:', error);
  }
};

export const checkUserOwnsNFT = async (
  nftContractAddress: string,
  userAddress: string,
) => {
  const url = 'https://sepolia.optimism.io';
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
