import { fetchProjectRoundRecords } from '@/services/round.services';

export const calculateCapAmount = async (
  activeRoundDetails: any,
  projectId: number,
) => {
  if (!activeRoundDetails) return null;

  let maxPOLAmount =
    activeRoundDetails?.cumulativeCapPerProject /
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
    const totalDonationAmountInRound = roundRecords[0].totalDonationAmount;

    const capAmount = cumulativeAmount
      ? maxPOLAmount - cumulativeAmount
      : maxPOLAmount;

    return { capAmount, totalDonationAmountInRound };
  }

  return { capAmount: maxPOLAmount, totalDonationAmountInRound: 0 };
};
