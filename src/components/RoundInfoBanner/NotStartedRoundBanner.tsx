import React from 'react';
import { useFetchAllRound } from '@/hooks/useFetchAllRound';
import { RemainingTimeBox } from './RemainingTimeBox';
import { IEarlyAccessRound, IQfRound } from '@/types/round.type';
import { OnBoardButton } from '../OnBoardButton';

export const NotStartedRoundBanner: React.FC = () => {
  const { data: allRounds } = useFetchAllRound();

  // Find the soonest not-started round
  const soonestRound = React.useMemo<
    IEarlyAccessRound | IQfRound | null
  >(() => {
    if (!allRounds || allRounds.length === 0) return null;

    const now = new Date();

    // Explicitly define the type of the accumulator
    return allRounds.reduce<IEarlyAccessRound | IQfRound | null>(
      (soonest, round) => {
        const roundStartDate = new Date(round.startDate);
        if (roundStartDate <= now) return soonest; // Skip already started rounds

        // If no soonest round or the current round starts sooner
        return !soonest || roundStartDate < new Date(soonest.startDate)
          ? round
          : soonest;
      },
      null,
    );
  }, [allRounds]);

  return (
    <div className=' rounded-2xl   py-6 px-8 flex flex-wrap justify-center  items-center z-0'>
      <div className='text-2xl font-medium text-gray-800'>
        q/acc round starts in
      </div>
      <RemainingTimeBox targetDate={soonestRound?.startDate} />
      <OnBoardButton />
    </div>
  );
};
