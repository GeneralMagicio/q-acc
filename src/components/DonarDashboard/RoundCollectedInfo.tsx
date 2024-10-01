import { useEffect, useState, type FC } from 'react';
import { formatDate } from '@/helpers/date';
import { formatAmount } from '@/helpers/donation';
import { fetchProjectRoundRecords } from '@/services/round.services';
import { IEarlyAccessRound, IQfRound } from '@/types/round.type';

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
  const [totalCollected, setTotalCollected] = useState(0);
  useEffect(() => {
    console.log(projectId);
    const fetchRoundRecords = async () => {
      if (info.__typename === 'EarlyAccessRound') {
        const data = await fetchProjectRoundRecords(
          Number(projectId),
          undefined,
          info.roundNumber + 1,
        );
        setTotalCollected(data[0]?.totalDonationAmount || 0);
      }
    };
    fetchRoundRecords();
  }, [projectId]);
  const startData =
    info.__typename === 'EarlyAccessRound' ? info.startDate : info.beginDate;
  const endData =
    info.__typename === 'EarlyAccessRound' ? info.endDate : info.endDate;

  // const totalCollected = 15210;
  const roundCap = info.roundUSDCapPerProject / info.tokenPrice;
  const percentage = ((totalCollected / roundCap) * 100).toFixed(2);
  const title =
    info.__typename === 'EarlyAccessRound'
      ? `Early Access - Round ${info.roundNumber}`
      : info.name;

  return (
    <div
      className={`bg-gray-100 rounded-lg py-6 px-4 flex flex-wrap gap-4 items-stretch justify-between ${currentRound && 'border-giv-500 border'}`}
    >
      <div className='flex flex-col justify-between'>
        <h3 className='text-base font-semibold text-gray-800'>{title}</h3>
        <div className='flex gap-4'>
          <p className='text-gray-500 text-sm'>Start date</p>
          <p className='text-gray-800 text-sm'>{formatDate(startData)}</p>
          <p className='text-gray-500 text-sm'>End date</p>
          <p className='text-gray-800 text-sm'>{formatDate(endData)}</p>
        </div>
      </div>
      <div className='flex flex-col justify-between gap-2 w-full lg:w-80 '>
        <div className='flex text-xs font-medium items-center justify-between'>
          <div>{percentage}% Collected</div>
          <div className='flex gap-2 items-center'>
            <span className='text-gray-400'>Total</span>
            <span className='text-base'>
              {formatAmount(totalCollected)} POL
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
          <div className='text-xs text-gray-500'>Round Cap</div>
          <span className='text-base'>{formatAmount(roundCap)} POL</span>
          <div className='text-xs text-gray-500'>
            ~$ {formatAmount(roundCap * info.tokenPrice)}
          </div>
        </div>
      </div>
    </div>
  );
};
