import React from 'react';
import { formatAmount } from '@/helpers/donation';
import { useFetchQaccStats } from '@/hooks/useFetchQaccStats';
import { useFetchTokenPrice } from '@/hooks/useFetchTokenPrice';

interface QaccRoundStatsProps {}

const QaccRoundStats: React.FC<QaccRoundStatsProps> = ({}) => {
  const { data: POLPrice } = useFetchTokenPrice();
  const { data: qaccStats } = useFetchQaccStats();
  console.log(qaccStats);
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-5 justify-center font-sans'>
      <div className='flex flex-col gap-2 p-6 bg-[#FCFCFF] rounded-2xl'>
        <span className='flex flex-col md:flex-row gap-1'>
          {qaccStats?.totalCollected ? (
            <>
              <h1 className='text-[32px] xl:text-[36px] text-[#5326EC] font-bold'>
                {formatAmount(qaccStats?.totalCollected)} POL
              </h1>
              <h3 className='text-[21px] font-semibold text-[#B9A7FF]'>
                ~${formatAmount(qaccStats?.totalCollected * Number(POLPrice))}{' '}
              </h3>
            </>
          ) : (
            <>
              <h1 className='text-[32px] xl:text-[36px] text-[#5326EC] font-bold'>
                --- POL
              </h1>
              <h3 className='text-[21px] font-semibold text-[#B9A7FF]'>
                ~$ ---
              </h3>
            </>
          )}
        </span>

        <p className='text-base font-semibold text-[#5326EC] '>
          Collected in Season 1{' '}
        </p>
      </div>

      <div className='flex flex-col gap-2 p-6 bg-[#FCFCFF] rounded-2xl'>
        <span className='flex flex-col md:flex-row gap-1'>
          {qaccStats?.qfTotalCollected ? (
            <>
              {' '}
              <h1 className='text-[32px] xl:text-[36px] text-[#5326EC] font-bold'>
                {formatAmount(qaccStats?.qfTotalCollected)} POL
              </h1>
              <h3 className='text-[21px] font-semibold text-[#B9A7FF]'>
                ~${formatAmount(qaccStats?.qfTotalCollected * Number(POLPrice))}{' '}
              </h3>
            </>
          ) : (
            <>
              <h1 className='text-[32px] xl:text-[36px] text-[#5326EC] font-bold'>
                --- POL
              </h1>
              <h3 className='text-[21px] font-semibold text-[#B9A7FF]'>
                ~$ ---
              </h3>
            </>
          )}
        </span>
        <p className='text-base font-semibold text-[#5326EC] '>
          Collected in q/acc round{' '}
        </p>
      </div>

      <div className='flex flex-col gap-2 p-6 bg-[#E7E1FF] rounded-2xl'>
        <h1 className='text-[32px] xl:text-[36px] text-[#5326EC] font-bold'>
          {qaccStats?.contributorsCount ? qaccStats.contributorsCount : '---'}
        </h1>
        <p className='text-base font-semibold text-[#5326EC]'>
          Unique Supporters{' '}
        </p>
      </div>

      <div className='flex flex-col gap-2 p-6 bg-[#E7E1FF] rounded-2xl'>
        <h1 className='text-[32px] xl:text-[36px] text-[#5326EC] font-bold'>
          $250,000
        </h1>
        <p className='text-base font-semibold text-[#5326EC] '>Matching Pool</p>
      </div>
    </div>
  );
};

export default QaccRoundStats;
