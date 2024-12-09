import React from 'react';
import { useFetchAllRound } from '@/hooks/useFetchAllRound';
import { RemainingTimeBox } from './RemainingTimeBox';
import { IEarlyAccessRound, IQfRound } from '@/types/round.type';
import { OnBoardButton } from '../OnBoardButton';
import { useFetchMostRecentEndRound } from '../ProjectDetail/usefetchMostRecentEndRound';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { MatchingRoundCard } from './MatchingRoundCard';

export const RoundStatusBanner: React.FC = () => {
  // Renamed the component
  const { data: allRounds } = useFetchAllRound();

  // Find the soonest round
  const soonestRound = React.useMemo<
    IEarlyAccessRound | IQfRound | null
  >(() => {
    if (!allRounds || allRounds.length === 0) return null;

    const now = new Date();

    return allRounds.reduce<IEarlyAccessRound | IQfRound | null>(
      (soonest, round) => {
        const roundStartDate = new Date(round.startDate);
        const roundEndDate = new Date(round.endDate);

        // Skip rounds that are already finished
        if (roundEndDate <= now) return soonest;

        // If no soonest round or the current round starts sooner
        return !soonest || roundStartDate < new Date(soonest.startDate)
          ? round
          : soonest;
      },
      null,
    );
  }, [allRounds]);
  const { data: activeRoundDetails } = useFetchActiveRoundDetails();

  const isQaccRoundEnded = useFetchMostRecentEndRound(activeRoundDetails);
  // Determine the status text and target date for the RemainingTimeBox
  const isRoundStarted = soonestRound
    ? new Date(soonestRound.startDate) <= new Date()
    : false;
  let roundStatusText;

  if (isQaccRoundEnded) {
    roundStatusText = 'No active round';
  } else {
    roundStatusText = isRoundStarted
      ? 'q/acc round ends in'
      : 'q/acc round starts in';
  }

  const targetDate = isRoundStarted
    ? soonestRound?.endDate
    : soonestRound?.startDate;

  return (
    <div className='flex flex-col lg:flex-row gap-4 items-center justify-center'>
      <MatchingRoundCard />
      <div className='rounded-xl  flex  gap-6 border p-4 items-center z-40 bg-white'>
        <div className=' flex flex-col  gap-4 font-medium text-gray-800 text-xl'>
          {roundStatusText}
          {targetDate && <RemainingTimeBox targetDate={targetDate} />}
        </div>

        <OnBoardButton />
      </div>
    </div>
  );
};
