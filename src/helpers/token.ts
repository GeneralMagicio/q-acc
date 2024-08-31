import { writeContract } from '@wagmi/core';
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
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`,
    );
    const data = await response.json();
    return data[tokenId].usd;
  } catch (error) {
    console.error('Error fetching token price:', error);
  }
};
