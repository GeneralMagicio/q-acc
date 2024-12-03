import React from 'react';
import { useFetchAllRound } from '@/hooks/useFetchAllRound';
import { RemainingTimeBox } from './RemainingTimeBox';
import { IEarlyAccessRound, IQfRound } from '@/types/round.type';
import { OnBoardButton } from '../OnBoardButton';

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

  // Determine the status text and target date for the RemainingTimeBox
  const isRoundStarted = soonestRound
    ? new Date(soonestRound.startDate) <= new Date()
    : false;
  const roundStatusText = isRoundStarted
    ? 'q/acc round ends in'
    : 'q/acc round starts in';
  const targetDate = isRoundStarted
    ? soonestRound?.endDate
    : soonestRound?.startDate;

  return (
    <div className='rounded-2xl py-6 px-8 flex flex-wrap justify-center items-center z-0'>
      <div className='text-2xl font-medium text-gray-800'>
        {roundStatusText}
      </div>
      {targetDate && <RemainingTimeBox targetDate={targetDate} />}
      <OnBoardButton />
    </div>
  );
};
