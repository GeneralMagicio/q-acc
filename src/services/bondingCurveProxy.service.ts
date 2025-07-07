import { Address, parseEther, parseUnits } from 'viem';
import { waitForTransactionReceipt } from 'viem/actions';
import config from '@/config/configuration';
import proxyContractABI from '@/lib/abi/proxyContract';
import { executePOLWrappingFlow, unwrapWPOL } from './polWrapping.service';

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
  userAddress: string,
  amount: string,
): Promise<boolean> {
  try {
    const allowance = await publicClient.readContract({
      address: tokenAddress as Address,
      abi: ERC20_ABI,
      functionName: 'allowance',
      args: [userAddress as Address, spenderAddress as Address],
    });

    const requiredAmount = parseEther(amount);
    return allowance >= requiredAmount;
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
  buyParams: {
    targetContract: string;
    collateralToken: string;
    depositAmount: string;
    minAmountOut: string;
  },
  userAddress: string,
): Promise<string> {
  try {
    const hash = await walletClient.writeContract({
      account: userAddress as Address,
      address: proxyAddress as Address,
      abi: proxyContractABI,
      functionName: 'buy',
      args: [
        buyParams.targetContract as Address,
        buyParams.collateralToken as Address,
        parseEther(buyParams.depositAmount),
        parseEther(buyParams.minAmountOut),
      ],
    });

    return hash;
  } catch (error) {
    console.error('Error buying through proxy:', error);
    throw error;
  }
}

/**
 * Sell tokens through the proxy contract
 */
export async function sellThroughProxy(
  walletClient: any,
  proxyAddress: string,
  sellParams: {
    targetContract: string;
    tokenToSell: string;
    depositAmount: string;
    minAmountOut: string;
  },
  userAddress: string,
): Promise<string> {
  try {
    const hash = await walletClient.writeContract({
      account: userAddress as Address,
      address: proxyAddress as Address,
      abi: proxyContractABI,
      functionName: 'sell',
      args: [
        sellParams.targetContract as Address,
        sellParams.tokenToSell as Address,
        parseEther(sellParams.depositAmount),
        parseEther(sellParams.minAmountOut),
      ],
    });

    return hash;
  } catch (error) {
    console.error('Error selling through proxy:', error);
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
): Promise<{ wrapHash?: string; approvalHash?: string; buyHash: string }> {
  try {
    const collateralToken = config.BONDING_CURVE_COLLATERAL_TOKEN;
    const proxyAddress = config.PROXY_CONTRACT_ADDRESS;

    // Step 1: Always wrap POL to WPOL
    onStatusUpdate?.('Wrapping POL to WPOL...');
    const wrapResult = await executePOLWrappingFlow(
      publicClient,
      walletClient,
      userAddress,
      depositAmount,
      onStatusUpdate,
    );

    // Wait for wrap transaction to be confirmed
    if (wrapResult.wrapHash) {
      console.log('Waiting for wrap transaction to be confirmed...');
      onStatusUpdate?.('Waiting for wrap transaction confirmation...');
      
      const wrapReceipt = await waitForTransactionReceipt(publicClient, {
        hash: wrapResult.wrapHash as Address,
      });

      // Check if wrap transaction succeeded
      if (wrapReceipt.status === 'reverted') {
        throw new Error('Wrap transaction failed');
      }

      console.log('Wrap transaction confirmed');
      onStatusUpdate?.('Wrap transaction completed!');
    } else {
      throw new Error('Wrap transaction failed');
    }

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

    return { wrapHash: wrapResult.wrapHash, approvalHash, buyHash };
  } catch (error) {
    console.error('Error in buy flow:', error);

    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('Wrap transaction failed')) {
        onStatusUpdate?.('Wrap transaction failed');
      } else if (error.message.includes('Approval transaction failed')) {
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

/**
 * Complete sell flow: check allowance, approve if needed, then sell
 */
export async function executeSellFlow(
  publicClient: any,
  walletClient: any,
  userAddress: string,
  bondingCurveAddress: string,
  tokenToSell: string,
  depositAmount: string,
  minAmountOut: string,
  onStatusUpdate?: (status: string) => void,
): Promise<{ approvalHash?: string; sellHash: string; unwrapHash?: string }> {
  try {
    const proxyAddress = config.PROXY_CONTRACT_ADDRESS;

    onStatusUpdate?.('Checking allowance...');

    // Check if approval is needed
    const hasAllowance = await checkAllowance(
      publicClient,
      walletClient,
      tokenToSell,
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
        tokenToSell,
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
      onStatusUpdate?.('Approval confirmed, executing sell...');
    } else {
      console.log('Sufficient allowance already exists');
      onStatusUpdate?.('Executing sell transaction...');
    }

    // Execute sell through proxy
    const sellHash = await sellThroughProxy(
      walletClient,
      proxyAddress,
      {
        targetContract: bondingCurveAddress,
        tokenToSell,
        depositAmount,
        minAmountOut,
      },
      userAddress,
    );

    console.log('Sell transaction hash:', sellHash);
    onStatusUpdate?.('Waiting for sell transaction confirmation...');

    // Wait for sell transaction to be mined and check status
    console.log('Waiting for sell transaction to be confirmed...');
    const sellReceipt = await waitForTransactionReceipt(publicClient, {
      hash: sellHash as Address,
    });

    // Check if sell transaction succeeded
    if (sellReceipt.status === 'reverted') {
      throw new Error('Sell transaction failed');
    }

    console.log('Sell transaction confirmed');
    onStatusUpdate?.('Sell transaction completed!');

    // Step 3: Unwrap WPOL to POL for user convenience
    onStatusUpdate?.('Unwrapping WPOL to POL...');
    let unwrapHash: string | undefined;
    
    try {
      // Get the amount of WPOL received from the sell transaction receipt
      const sellReceipt = await publicClient.getTransactionReceipt({
        hash: sellHash as Address,
      });
      console.log('Sell transaction receipt retrieved successfully');
      
      // Check if the sell transaction was successful
      if (sellReceipt.status === 'reverted') {
        throw new Error('Sell transaction failed');
      }
      
      onStatusUpdate?.('Sell transaction successful, checking for WPOL transfer...');
      
      // Parse the logs to find the Transfer event for WPOL received
      console.log('Sell transaction logs:', sellReceipt.logs);
      const wpolTransferLogs = sellReceipt.logs.filter((log: any) => 
        log.address.toLowerCase() === config.BONDING_CURVE_COLLATERAL_TOKEN.toLowerCase() &&
        log.topics[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' // Transfer event signature
      );
      
      // Find the transfer to the user address
      const userTransferLog = wpolTransferLogs.find((log: any) => {
        // The 'to' address is in the third topic (index 2)
        const toAddress = '0x' + log.topics[2].slice(26); // Remove padding
        return toAddress.toLowerCase() === userAddress.toLowerCase();
      });
      
      let wpolAmount = 0;
      if (userTransferLog) {
        // The amount is in the data field
        wpolAmount = Number(userTransferLog.data) / 1e18;
        console.log(`Found WPOL transfer to user: ${wpolAmount} WPOL`);
      } else {
        console.log('No WPOL transfer found in transaction logs');
      }
      
      if (wpolAmount > 0) {
        unwrapHash = await unwrapWPOL(
          walletClient,
          userAddress,
          wpolAmount.toString(),
          onStatusUpdate,
        );
        
        console.log('Unwrap transaction hash:', unwrapHash);
        onStatusUpdate?.('Waiting for unwrap transaction confirmation...');

        // Wait for unwrap transaction to be mined and check status
        console.log('Waiting for unwrap transaction to be confirmed...');
        const unwrapReceipt = await waitForTransactionReceipt(publicClient, {
          hash: unwrapHash as Address,
        });

        // Check if unwrap transaction succeeded
        if (unwrapReceipt.status === 'reverted') {
          throw new Error('Unwrap transaction failed');
        }

        console.log('Unwrap transaction confirmed');
        onStatusUpdate?.('Unwrap transaction completed!');
      } else {
        onStatusUpdate?.('No WPOL received from sell transaction');
      }
    } catch (unwrapError) {
      console.error('Error unwrapping WPOL:', unwrapError);
      onStatusUpdate?.('Unwrap failed, but sell was successful');
    }

    return { approvalHash, sellHash, unwrapHash };
  } catch (error) {
    console.error('Error in sell flow:', error);

    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('Approval transaction failed')) {
        onStatusUpdate?.('Approval transaction failed');
      } else if (error.message.includes('Sell transaction failed')) {
        onStatusUpdate?.('Sell transaction failed');
      } else if (error.message.includes('Unwrap transaction failed')) {
        onStatusUpdate?.('Unwrap transaction failed');
      } else {
        onStatusUpdate?.('Transaction failed');
      }
    } else {
      onStatusUpdate?.('Transaction failed');
    }

    throw error;
  }
}
