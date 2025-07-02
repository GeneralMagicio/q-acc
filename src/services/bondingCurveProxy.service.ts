import { Address, parseUnits } from 'viem';
import { waitForTransactionReceipt } from 'viem/actions';
import proxyContractABI from '@/lib/abi/proxyContract';
import config from '@/config/configuration';

// Standard ERC20 ABI for approval
const ERC20_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export interface BuyParams {
  targetContract: string;
  collateralToken: string;
  depositAmount: string;
  minAmountOut: string;
}

/**
 * Check if the proxy contract has sufficient allowance to spend tokens
 */
export async function checkAllowance(
  publicClient: any,
  walletClient: any,
  tokenAddress: string,
  spenderAddress: string,
  ownerAddress: string,
  amount: string,
): Promise<boolean> {
  try {
    const allowance = await publicClient.readContract({
      address: tokenAddress as Address,
      abi: ERC20_ABI,
      functionName: 'allowance',
      args: [ownerAddress as Address, spenderAddress as Address],
    });

    const requiredAmount = parseUnits(amount, 18);
    return (allowance as bigint) >= requiredAmount;
  } catch (error) {
    console.error('Error checking allowance:', error);
    return false;
  }
}

/**
 * Approve the proxy contract to spend tokens
 */
export async function approveProxy(
  walletClient: any,
  tokenAddress: string,
  spenderAddress: string,
  amount: string,
  userAddress: string,
): Promise<string> {
  try {
    const amountWei = parseUnits(amount, 18);

    const hash = await walletClient.writeContract({
      address: tokenAddress as Address,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [spenderAddress as Address, amountWei],
      account: userAddress as Address,
    });

    return hash;
  } catch (error) {
    console.error('Error approving proxy:', error);
    throw error;
  }
}

/**
 * Buy tokens through the proxy contract
 */
export async function buyThroughProxy(
  walletClient: any,
  proxyAddress: string,
  params: BuyParams,
  userAddress: string,
): Promise<string> {
  try {
    const depositAmountWei = parseUnits(params.depositAmount, 18);
    const minAmountOutWei = parseUnits(params.minAmountOut, 18);

    const hash = await walletClient.writeContract({
      address: proxyAddress as Address,
      abi: proxyContractABI,
      functionName: 'buy',
      args: [
        params.targetContract as Address,
        params.collateralToken as Address,
        depositAmountWei,
        minAmountOutWei,
      ],
      account: userAddress as Address,
    });

    return hash;
  } catch (error) {
    console.error('Error buying through proxy:', error);
    throw error;
  }
}

/**
 * Complete buy flow: check allowance, approve if needed, then buy
 */
export async function executeBuyFlow(
  publicClient: any,
  walletClient: any,
  userAddress: string,
  bondingCurveAddress: string,
  depositAmount: string,
  minAmountOut: string,
  onStatusUpdate?: (status: string) => void,
): Promise<{ approvalHash?: string; buyHash: string }> {
  try {
    const collateralToken = config.BONDING_CURVE_COLLATERAL_TOKEN;
    const proxyAddress = config.PROXY_CONTRACT_ADDRESS;

    onStatusUpdate?.('Checking allowance...');

    // Check if approval is needed
    const hasAllowance = await checkAllowance(
      publicClient,
      walletClient,
      collateralToken,
      proxyAddress,
      userAddress,
      depositAmount,
    );

    let approvalHash: string | undefined;

    if (!hasAllowance) {
      console.log('Approval needed, requesting approval...');
      onStatusUpdate?.('Requesting approval...');

      // Request approval
      approvalHash = await approveProxy(
        walletClient,
        collateralToken,
        proxyAddress,
        depositAmount,
        userAddress,
      );

      console.log('Approval transaction hash:', approvalHash);
      onStatusUpdate?.('Waiting for approval transaction to be confirmed...');

      // Wait for approval transaction to be mined and check status
      console.log('Waiting for approval transaction to be confirmed...');
      const approvalReceipt = await waitForTransactionReceipt(publicClient, {
        hash: approvalHash as Address,
      });

      // Check if approval transaction succeeded
      if (approvalReceipt.status === 'reverted') {
        throw new Error('Approval transaction failed');
      }

      console.log('Approval transaction confirmed');
      onStatusUpdate?.('Approval confirmed, executing buy...');
    } else {
      console.log('Sufficient allowance already exists');
      onStatusUpdate?.('Executing buy transaction...');
    }

    // Execute buy through proxy
    const buyHash = await buyThroughProxy(
      walletClient,
      proxyAddress,
      {
        targetContract: bondingCurveAddress,
        collateralToken,
        depositAmount,
        minAmountOut,
      },
      userAddress,
    );

    console.log('Buy transaction hash:', buyHash);
    onStatusUpdate?.('Waiting for buy transaction confirmation...');

    // Wait for buy transaction to be mined and check status
    console.log('Waiting for buy transaction to be confirmed...');
    const buyReceipt = await waitForTransactionReceipt(publicClient, {
      hash: buyHash as Address,
    });

    // Check if buy transaction succeeded
    if (buyReceipt.status === 'reverted') {
      throw new Error('Buy transaction failed');
    }

    console.log('Buy transaction confirmed');
    onStatusUpdate?.('Buy transaction completed!');

    return { approvalHash, buyHash };
  } catch (error) {
    console.error('Error in buy flow:', error);
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('Approval transaction failed')) {
        onStatusUpdate?.('Approval transaction failed');
      } else if (error.message.includes('Buy transaction failed')) {
        onStatusUpdate?.('Buy transaction failed');
      } else {
        onStatusUpdate?.('Transaction failed');
      }
    } else {
      onStatusUpdate?.('Transaction failed');
    }
    throw error;
  }
}
