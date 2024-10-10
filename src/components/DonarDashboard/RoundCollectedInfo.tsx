import { useEffect, useState, type FC } from 'react';
import { formatDate } from '@/helpers/date';
import { formatAmount } from '@/helpers/donation';
import { IEarlyAccessRound, IQfRound } from '@/types/round.type';
import { calculateCapAmount } from '@/helpers/round';
import useRemainingTime from '@/hooks/useRemainingTime';

interface IRoundCollectedInfoProps {
  info: IEarlyAccessRound | IQfRound;
  currentRound?: boolean;
  projectId: string | undefined;
}

export const RoundCollectedInfo: FC<IRoundCollectedInfoProps> = ({
  info,
  currentRound,
  projectId,
}) => {
  const [amountDonatedInRound, setAmountDonatedInRound] = useState(0);
  const [maxPOLCap, setMaxPOLCap] = useState(0);
  const remainingTime = useRemainingTime(info?.startDate, info?.endDate);

  useEffect(() => {
    const updatePOLCap = async () => {
      if (info) {
        const { capAmount, totalDonationAmountInRound }: any =
          await calculateCapAmount(info, Number(projectId), true);
        setMaxPOLCap(capAmount);
        setAmountDonatedInRound(totalDonationAmountInRound);
      }
    };

    updatePOLCap();
  }, [amountDonatedInRound, info, projectId, maxPOLCap]);

  const startData =
    info.__typename === 'EarlyAccessRound' ? info.startDate : info.startDate;
  const endData =
    info.__typename === 'EarlyAccessRound' ? info.endDate : info.endDate;

  const percentage = (amountDonatedInRound / maxPOLCap) * 100;
  const truncatedProgress = Math.round(percentage * 100) / 100;

  const title =
    info.__typename === 'EarlyAccessRound'
      ? `Early Access - Round ${info.roundNumber}`
      : `q/acc Round`;

  return (
    <div
      className={`bg-[#EBECF2]   border-b border-[#BBC3D4] border-dashed p-4 flex flex-wrap gap-4 justify-center md:justify-between`}
    >
      <div className='flex  flex-row md:flex-col justify-between gap-4'>
        <div className='flex gap-4 items-center font-redHatText'>
          <h3 className='text-base font-semibold text-gray-800'>{title}</h3>
          {currentRound ? (
            <div className='bg-[#1D1E1F] rounded px-2 py-1'>
              <span className='text-white font-medium'>Current round</span>
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
          <div className='flex gap-4'>
            <p className='text-gray-500 text-sm'>Start date</p>
            <p className='text-gray-800 text-sm'>{formatDate(startData)}</p>
            <p className='text-gray-500 text-sm'>End date</p>
            <p className='text-gray-800 text-sm'>{formatDate(endData)}</p>
          </div>
        )}
      </div>

      <div className='flex flex-col justify-between gap-2  font-redHatText  w-full md:w-fit '>
        <div className='flex gap-2 text-xs font-medium items-center justify-between  md:w-[400px]'>
          <div className='bg-white p-[2px] rounded-md flex gap-1'>
            {truncatedProgress}% Collected
          </div>

          <div className='flex gap-2 items-center'>
            <span className='text-gray-400'>Collected this round</span>
            <span className='text-base'>
              {formatAmount(amountDonatedInRound)} POL
            </span>
          </div>
        </div>

        <div className='h-2 bg-gray-200 rounded-lg overflow-hidden'>
          <div
            className={`h-full ${currentRound ? 'bg-giv-500' : 'bg-gray-500'}`}
            style={{ width: `${truncatedProgress}%` }}
          ></div>
        </div>

        <div className='flex gap-2 items-center self-end'>
          <div className='text-xs text-gray-500'>
            {info.roundNumber === 1 ? 'Round Cap' : 'Cumulative Round Cap'}
          </div>
          <span className='text-base text-[#1D1E1F] font-medium'>
            {formatAmount(Math.round(maxPOLCap * 100) / 100)} POL
          </span>
          <div className='text-xs text-gray-500'>
            ${' '}
            {formatAmount(Math.round(maxPOLCap * info.tokenPrice * 100) / 100)}
          </div>
        </div>
      </div>
    </div>
  );
};
