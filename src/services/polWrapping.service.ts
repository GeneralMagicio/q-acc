import { Address, parseEther, formatUnits } from 'viem';
import config from '@/config/configuration';
import WRAPPED_POL_ABI from '@/lib/abi/wrappedPol';

// Standard ERC20 ABI for balance checking
const ERC20_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

/**
 * Check user's POL balance
 */
export async function checkPOLBalance(
  publicClient: any,
  userAddress: string,
): Promise<string> {
  try {
    // Check if POL is native token (zero address) or ERC20
    if (
      config.ERC_TOKEN_ADDRESS === '0x0000000000000000000000000000000000000000'
    ) {
      // Native token - use getBalance
      const balance = await publicClient.getBalance({
        address: userAddress as Address,
      });
      return formatUnits(balance as bigint, 18);
    } else {
      // ERC20 token - use balanceOf
      const balance = await publicClient.readContract({
        address: config.ERC_TOKEN_ADDRESS as Address,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [userAddress as Address],
      });
      return formatUnits(balance as bigint, 18);
    }
  } catch (error) {
    console.error('Error checking POL balance:', error);
    throw new Error('Failed to check POL balance');
  }
}

/**
 * Check user's WPOL balance
 */
export async function checkWPOLBalance(
  publicClient: any,
  userAddress: string,
): Promise<string> {
  try {
    const balance = await publicClient.readContract({
      address: config.BONDING_CURVE_COLLATERAL_TOKEN as Address,
      abi: ERC20_ABI,
      functionName: 'balanceOf',
      args: [userAddress as Address],
    });
    return formatUnits(balance as bigint, 18);
  } catch (error) {
    console.error('Error checking WPOL balance:', error);
    throw new Error('Failed to check WPOL balance');
  }
}

/**
 * Wrap POL tokens to WPOL (without waiting for confirmation)
 */
export async function wrapPOL(
  walletClient: any,
  userAddress: string,
  amount: string,
  onStatusUpdate?: (status: string) => void,
): Promise<string> {
  try {
    onStatusUpdate?.('Wrapping POL to WPOL...');
    const amountWei = parseEther(amount);
    const hash = await walletClient.writeContract({
      address: config.BONDING_CURVE_COLLATERAL_TOKEN as Address,
      abi: WRAPPED_POL_ABI,
      functionName: 'deposit',
      args: [],
      account: userAddress as Address,
      value: amountWei,
    });
    return hash;
  } catch (error) {
    console.error('Error wrapping POL:', error);
    throw error;
  }
}

/**
 * Unwrap WPOL tokens to POL (without waiting for confirmation)
 */
export async function unwrapWPOL(
  walletClient: any,
  userAddress: string,
  amount: string,
  onStatusUpdate?: (status: string) => void,
): Promise<string> {
  try {
    onStatusUpdate?.('Unwrapping WPOL to POL...');
    const amountWei = parseEther(amount);
    const hash = await walletClient.writeContract({
      address: config.BONDING_CURVE_COLLATERAL_TOKEN as Address,
      abi: WRAPPED_POL_ABI,
      functionName: 'withdraw',
      args: [amountWei],
      account: userAddress as Address,
    });
    return hash;
  } catch (error) {
    console.error('Error unwrapping WPOL:', error);
    throw error;
  }
}

/**
 * Check if user has sufficient balance for wrapping
 */
export async function checkSufficientBalance(
  publicClient: any,
  userAddress: string,
  requiredAmount: string,
): Promise<{
  hasSufficientBalance: boolean;
  polBalance: string;
  wpolBalance: string;
  shortfall: string;
}> {
  try {
    const [polBalance, wpolBalance] = await Promise.all([
      checkPOLBalance(publicClient, userAddress),
      checkWPOLBalance(publicClient, userAddress),
    ]);

    const totalBalance = parseFloat(polBalance) + parseFloat(wpolBalance);
    const required = parseFloat(requiredAmount);
    const shortfall = Math.max(0, required - totalBalance);

    return {
      hasSufficientBalance: totalBalance >= required,
      polBalance,
      wpolBalance,
      shortfall: shortfall.toFixed(6),
    };
  } catch (error) {
    console.error('Error checking sufficient balance:', error);
    throw error;
  }
}

/**
 * Complete POL wrapping flow - always wrap the full amount
 */
export async function executePOLWrappingFlow(
  publicClient: any,
  walletClient: any,
  userAddress: string,
  requiredAmount: string,
  onStatusUpdate?: (status: string) => void,
): Promise<{ wrapHash?: string; unwrapHash?: string }> {
  try {
    onStatusUpdate?.('Checking POL balance...');

    // Check if user has sufficient POL balance
    const polBalance = await checkPOLBalance(publicClient, userAddress);
    const required = parseFloat(requiredAmount);
    const userPolBalance = parseFloat(polBalance);

    if (userPolBalance < required) {
      throw new Error(
        `Insufficient POL balance. You need ${requiredAmount} POL but have ${polBalance} POL.`,
      );
    }

    // Always wrap the full amount
    onStatusUpdate?.('Wrapping POL to WPOL...');
    const wrapHash = await wrapPOL(
      walletClient,
      userAddress,
      requiredAmount,
      onStatusUpdate,
    );
    return { wrapHash };
  } catch (error) {
    console.error('Error in POL wrapping flow:', error);
    throw error;
  }
}
