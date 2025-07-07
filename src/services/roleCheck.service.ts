import { Address } from 'viem';
import { ethers } from 'ethers';
import orchestratorABI from '@/lib/abi/orchestrator';
import authorizerABI from '@/lib/abi/authorizer';

// Role name for bonding curve interactions
const CURVE_INTERACTION_ROLE = 'CURVE_USER';

export interface RoleCheckResult {
  hasRole: boolean;
}

/**
 * Get the authorizer address from the orchestrator contract
 */
async function getAuthorizerAddress(
  publicClient: any,
  orchestratorAddress: string,
): Promise<string> {
  try {
    return await publicClient.readContract({
      address: orchestratorAddress as Address,
      abi: orchestratorABI,
      functionName: 'authorizer',
    });
  } catch (error) {
    console.error('Error getting authorizer address:', error);
    throw error;
  }
}

/**
 * Generate role ID for the bonding curve module
 */
async function generateRoleId(
  publicClient: any,
  authorizerAddress: string,
  bondingCurveAddress: string,
): Promise<string> {
  try {
    const roleBytes = ethers.encodeBytes32String(CURVE_INTERACTION_ROLE);

    return await publicClient.readContract({
      address: authorizerAddress as Address,
      abi: authorizerABI,
      functionName: 'generateRoleId',
      args: [bondingCurveAddress as Address, roleBytes],
    });
  } catch (error) {
    console.error('Error generating role ID:', error);
    throw error;
  }
}

/**
 * Check if an address has the specified role
 */
async function checkRole(
  publicClient: any,
  authorizerAddress: string,
  roleId: string,
  userAddress: string,
): Promise<boolean> {
  try {
    return await publicClient.readContract({
      address: authorizerAddress as Address,
      abi: authorizerABI,
      functionName: 'hasRole',
      args: [roleId, userAddress as Address],
    });
  } catch (error) {
    console.error('Error checking role:', error);
    return false;
  }
}

/**
 * Check if buy and sell operations are open for a user
 */
export async function checkBondingCurvePermissions(
  publicClient: any,
  bondingCurveAddress: string,
  userAddress: string,
): Promise<RoleCheckResult> {
  try {
    // Get the orchestrator address from the bonding curve contract
    const bondingCurveABI = [
      {
        inputs: [],
        name: 'orchestrator',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
    ];

    // Get orchestrator address and check if buy/sell are open
    const [orchestratorAddress] = await Promise.all([
      publicClient.readContract({
        address: bondingCurveAddress as Address,
        abi: bondingCurveABI,
        functionName: 'orchestrator',
      }),
    ]);

    console.log('orchestratorAddress:', orchestratorAddress);

    // Get authorizer address
    const authorizerAddress = await getAuthorizerAddress(
      publicClient,
      orchestratorAddress,
    );

    console.log('authorizerAddress:', authorizerAddress);

    // Generate role ID
    const roleId = await generateRoleId(
      publicClient,
      authorizerAddress,
      bondingCurveAddress,
    );

    console.log('roleId:', roleId);

    // Check if user has the role
    const hasRole = await checkRole(
      publicClient,
      authorizerAddress,
      roleId,
      userAddress,
    );

    console.log('hasRole:', hasRole);

    return {
      hasRole,
    };
  } catch (error) {
    console.error('Error checking bonding curve permissions:', error);
    // Return default values if there's an error
    return {
      hasRole: false,
    };
  }
}
