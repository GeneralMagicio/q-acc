import config from '@/config/configuration';
import { fetchUserDonations } from '@/services/donation.services';

// Helper to group donations by project
export const groupDonationsByProject = (donations: any[]) => {
  return donations.reduce(
    (grouped, donation) => {
      const projectId = donation.project.id;
      if (!grouped[projectId]) {
        grouped[projectId] = [];
      }
      grouped[projectId].push(donation);
      return grouped;
    },
    {} as Record<number, any[]>,
  );
};

// Helper function to calculate unique donors
export const calculateUniqueDonors = (donations: any[]) => {
  const uniqueDonors = new Set();
  donations.forEach(donation => {
    if (donation.user?.walletAddress) {
      uniqueDonors.add(donation.user.walletAddress);
    }
  });
  return uniqueDonors.size;
};

// Helper function to calculate Total received in POL
export const calculateTotalContributions = (donations: any[]) => {
  return donations.reduce((total, donation) => total + donation.amount, 0);
};

// Calculate locked reward token amount based on stream data
export const calculateLockedRewardTokenAmount = (
  rewardTokenAmount: number,
  rewardStreamStart: Date,
  rewardStreamEnd: Date,
  cliff: number,
) => {
  const now = new Date();
  const streamStart = new Date(rewardStreamStart);
  const streamEnd = new Date(rewardStreamEnd);

  if (!rewardTokenAmount || !rewardStreamStart || !rewardStreamEnd || !cliff) {
    return 0;
  }

  if (now.getTime() < streamStart.getTime() + cliff) {
    return rewardTokenAmount;
  }

  if (now > streamEnd) {
    return 0;
  }

  const totalStreamTime = streamEnd.getTime() - streamStart.getTime();
  const elapsedTime = now.getTime() - streamStart.getTime();
  const remainingProportion = 1 - elapsedTime / totalStreamTime;

  return rewardTokenAmount * remainingProportion;
};

// Calculate claimable reward token amount
export const calculateClaimableRewardTokenAmount = (
  rewardTokenAmount: number,
  lockedRewardTokenAmount: number | null,
) => {
  if (rewardTokenAmount === undefined || lockedRewardTokenAmount === null) {
    return 0;
  }
  return rewardTokenAmount - lockedRewardTokenAmount;
};

export const calculateTotalDonations = (donations: any[]) => {
  return donations.reduce((total, donation) => {
    return total + (donation.amount || 0);
  }, 0);
};

/**
 * Formats a number with commas as thousand separators.
 * For example, 1000 becomes "1,000" and 1000000 becomes "1,000,000".
 *
 * @param {number} number - The number to be formatted.
 * @returns {string} The formatted number as a string with commas separating thousands.
 */
export const formatAmount = (
  number: number | null | undefined,
  fractionDigits: number = 2, // Default fraction digits
): string => {
  if (typeof number !== 'number' || isNaN(number)) {
    return '---';
  }

  if (number === 0) return '0';

  const threshold = Math.pow(10, -fractionDigits);
  if (number > 0 && number < threshold) {
    return `<${threshold.toFixed(fractionDigits)}`;
  }

  const maximumFractionDigits = number >= 1000 ? 0 : fractionDigits;

  return number.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  });
};

export const formatNumber = (number?: number) => {
  return parseFloat(String(number || 0)).toLocaleString('en-US', {
    maximumFractionDigits: 2,
  });
};

export const fetchDonationStatus = async (
  userId: number,
  transactionHash: string,
) => {
  try {
    // Assuming your API endpoint to get user donations is /api/donations/user/:userId
    const response = await fetchUserDonations(userId);

    // Find the donation with the matching transactionHash
    const donation = response?.donations?.find(
      (donation: any) => donation.transactionId === transactionHash,
    );
    return donation || null; // Return the donation if found, otherwise return null
  } catch (error) {
    console.error('Error fetching donation status:', error);
    return null;
  }
};

export const checkMatchingFundAddress = (address: string) => {
  if (config.MATCHING_FUND_ADDRESS.includes(address.toLowerCase())) {
    return true;
  }
  return false;
};
