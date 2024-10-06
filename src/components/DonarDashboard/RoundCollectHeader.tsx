import { useEffect, useState, type FC } from 'react';
import { formatAmount } from '@/helpers/donation';
import { IEarlyAccessRound, IQfRound } from '@/types/round.type';
import useRemainingTime from '@/hooks/useRemainingTime';
import { fetchProjectRoundRecords } from '@/services/round.services';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { IconTokenSchedule } from '../Icons/IconTokenSchedule';

interface IRoundCollectHeaderProps {
  type: string;
  info: IEarlyAccessRound | IQfRound;
  currentRound?: boolean;
  projectId: string | undefined;
}

export const RoundCollectHeader: FC<IRoundCollectHeaderProps> = ({
  type,
  info,
  currentRound,
  projectId,
}) => {
  const [amountDonatedInRound, setAmountDonatedInRound] = useState(0);
  const [maxPOLCap, setMaxPOLCap] = useState(0);
  const remainingTime = useRemainingTime(' ', info?.endDate);
  const { data: activeRoundDetails, isLoading } = useFetchActiveRoundDetails();

  currentRound =
    remainingTime !== 'Time is up!' && remainingTime !== '--:--:--';

  useEffect(() => {
    const updatePOLAmount = async () => {
      const roundRecords = await fetchProjectRoundRecords(
        Number(projectId),
        type === 'qacc' ? 1 : undefined,
        type === 'ea'
          ? Number(activeRoundDetails?.roundNumber) || 4
          : undefined,
      );
      if (roundRecords?.length > 0) {
        const cumulativeAmount =
          roundRecords[0].cumulativePastRoundsDonationAmounts;
        const totalDonationAmountInRound = roundRecords[0].totalDonationAmount;

        const totalCollectedAmount =
          cumulativeAmount + totalDonationAmountInRound;

        setMaxPOLCap(info.cumulativeCapPerProject / info.tokenPrice);

        if (type === 'qacc') {
          setAmountDonatedInRound(totalCollectedAmount);
        } else {
          setAmountDonatedInRound(totalCollectedAmount);
        }
      }
    };

    if (projectId) {
      updatePOLAmount();
    }
  }, [amountDonatedInRound, info, projectId, maxPOLCap]);

  const percentage = ((amountDonatedInRound / maxPOLCap) * 100).toFixed(2);
  const title = type === 'ea' ? `Early Access Window` : `q/acc round`;

  return (
    <div
      className={`bg-[#F7F7F9] rounded-lg py-6 px-4 flex flex-wrap gap-4 items-center justify-between ${remainingTime !== 'Time is up!' && 'border-giv-500 border'}`}
    >
      <div className='flex flex-col justify-between gap-3'>
        <div className='flex gap-4 items-center font-redHatText'>
          <h3 className='text-base font-semibold text-gray-800'>{title}</h3>
          {currentRound && type === 'qacc' ? (
            <div className='bg-[#1D1E1F] rounded px-2 py-1'>
              <span className='text-white font-medium'>Current round</span>
            </div>
          ) : remainingTime === 'Time is up!' ||
            remainingTime === '--:--:--' ? (
            <div className='bg-[#EBECF2] rounded px-2 py-1'>
              <span className='text-[#82899A] font-medium'>Finished</span>
            </div>
          ) : (
            ''
          )}
        </div>

        {currentRound ? (
          <div className='flex gap-2 items-center font-redHatText font-medium text-[#4F576A]'>
            <span>Remaining Time</span>
            <span className='px-4 py-1 bg-white rounded-md '>
              {remainingTime}
            </span>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className='flex flex-col justify-between gap-2  font-redHatText w-full md:w-fit'>
        <div className='flex text-xs font-medium items-center justify-between md:w-[400px]'>
          <div className='p-[2px] rounded-md flex gap-1'>
            {percentage}% Collected
            <div className='relative group'>
              <IconTokenSchedule />
              <div className='absolute w-[200px] z-50 mb-2 left-[-60px] hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2'>
                Every round has a round limit. This is the % of the current
                round limit that has been collected. Once it reaches 100%, the
                round will close
              </div>
            </div>
          </div>
          <div className='flex gap-2 items-center'>
            <span className='text-gray-400'>Total</span>
            <span className='text-base'>
              {formatAmount(amountDonatedInRound)} POL
            </span>
          </div>
        </div>
        <div className='h-2 bg-gray-200 rounded-lg overflow-hidden'>
          <div
            className={`h-full ${currentRound ? 'bg-giv-500' : 'bg-gray-500'}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className='flex gap-2 items-center self-end'>
          <div className='text-xs text-gray-500'>
            {type === 'qacc' ? 'Round Cap' : 'Window Cap'}
          </div>
          <span className='text-base'>{formatAmount(maxPOLCap)} POL</span>
          <div className='text-xs text-gray-500'>
            ~$ {formatAmount(maxPOLCap * info.tokenPrice)}
          </div>
        </div>
      </div>
    </div>
  );
};