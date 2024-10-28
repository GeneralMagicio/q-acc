import React, { useEffect, useState } from 'react';
import useRemainingTime from '@/hooks/useRemainingTime';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { IconMoon } from './Icons/IconMoon';
import { useFetchAllRound } from '@/hooks/useFetchAllRound';

interface RoundCountBannerProps {
  projectMaxedOut?: boolean;
}
const RoundCountBanner: React.FC<RoundCountBannerProps> = ({
  projectMaxedOut = false,
}) => {
  const { data: activeRoundDetails, isLoading } = useFetchActiveRoundDetails();
  const { data: allRounds } = useFetchAllRound();
  const [totalRounds, setTotalRounds] = useState<number>();
  useEffect(() => {
    const eaRoundCount = allRounds?.filter(
      round => round.__typename === 'EarlyAccessRound',
    ).length;
    setTotalRounds(eaRoundCount);
  }, [allRounds]);

  const remainingTime = useRemainingTime(
    activeRoundDetails?.startDate,
    activeRoundDetails?.endDate,
  );

  return (
    <div className='px-10 py-6  bg-white rounded-2xl shadow-baseShadow font-redHatText'>
      {activeRoundDetails ? (
        <div className='flex md:flex-row flex-col gap-6 md:justify-between items-center'>
          <span className='text-[#1D1E1F] font-medium text-lg'>
            {activeRoundDetails?.__typename === 'EarlyAccessRound'
              ? 'Early access - Round ' +
                activeRoundDetails?.roundNumber +
                ' of ' +
                totalRounds
              : activeRoundDetails?.__typename === 'QfRound'
                ? 'q/acc Round'
                : 'No Active Round'}
          </span>
          <div className='flex flex-col md:flex-row items-center md:gap-6'>
            {projectMaxedOut ? (
              <span className='px-6 py-4 flex items-center justify-stretch bg-white shadow-baseShadow rounded-xl text-[#4F576A] font-bold text-2xl font-redHatText'>
                Project maxed out this round
              </span>
            ) : (
              <>
                <span className='text-[#4F576A] text-lg font-medium'>
                  Remaining time
                </span>
                <div className='px-6 py-4 shadow-baseShadow rounded-xl'>
                  <span className='text-[#5326EC] font-bold text-lg md:text-2xl '>
                    {isLoading ? '.......' : remainingTime}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center gap-2 '>
          <IconMoon />
          <span className='font-redHatText text-[#4F576A] text-lg font-medium'>
            No active round
          </span>
        </div>
      )}
    </div>
  );
};

export default RoundCountBanner;
