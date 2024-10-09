import { fetchProjectRoundRecords } from '@/services/round.services';

export const calculateCapAmount = async (
  activeRoundDetails: any,
  projectId: number,
  includeCumulativeAmount: boolean = false,
) => {
  if (!activeRoundDetails) return null;

  let maxPOLAmount =
    (activeRoundDetails?.roundUSDCloseCapPerProject ??
      activeRoundDetails?.cumulativeUSDCapPerProject) /
    activeRoundDetails?.tokenPrice;

  const roundRecords = await fetchProjectRoundRecords(
    projectId,
    activeRoundDetails?.__typename === 'QfRound' ? 1 : undefined,
    activeRoundDetails?.__typename === 'EarlyAccessRound'
      ? activeRoundDetails.roundNumber
      : undefined,
  );

  if (roundRecords?.length > 0) {
    const cumulativeAmount =
      roundRecords[0].cumulativePastRoundsDonationAmounts;

    const totalDonationAmountInRound = includeCumulativeAmount
      ? roundRecords[0].totalDonationAmount
      : roundRecords[0].totalDonationAmount + cumulativeAmount;

    const capAmount =
      cumulativeAmount && includeCumulativeAmount
        ? maxPOLAmount - cumulativeAmount
        : maxPOLAmount;

    const truncatedCapAmount = Math.trunc(capAmount * 100) / 100;
    const truncatedTotalDonation =
      Math.trunc(totalDonationAmountInRound * 100) / 100;

    return {
      capAmount: truncatedCapAmount,
      totalDonationAmountInRound: truncatedTotalDonation,
    };
  }
  const truncatedMaxPOLAmount = Math.trunc(maxPOLAmount * 100) / 100;
  return { capAmount: truncatedMaxPOLAmount, totalDonationAmountInRound: 0 };
};
