import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';

import { getUpcomingRound, remainingTimeValues } from '@/helpers/date';
import { useFetchAllRound } from '@/hooks/useFetchAllRound';

interface NewBannerProps {}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isTimeUp: boolean;
}

export const NewBanner: FC<NewBannerProps> = () => {
  const { data: activeRoundDetails, isLoading } = useFetchActiveRoundDetails();
  const [remainingTime, setRemainingTime] = useState<TimeLeft | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const { data: allRounds } = useFetchAllRound();
  const [roundStatus, setRoundStatus] = useState('ended');

  useEffect(() => {
    const calcRemTime = () => {
      const startDate = activeRoundDetails?.startDate;
      const endDate = activeRoundDetails?.endDate;
      if (!startDate || !endDate) {
        const upcomingRound = allRounds ? getUpcomingRound(allRounds) : null;

        if (upcomingRound) {
          setRoundStatus('starts');
          console.log('Next round:', upcomingRound);
          return;
        } else {
          setRoundStatus('ended');
          console.log('No upcoming round.');
          return;
        }
      }
      const _startDate = new Date(startDate);
      const _endDate = new Date(endDate);
      const now = new Date();
      let _targetDate = new Date();

      if (now < _startDate) {
        _targetDate = _startDate;
        isStarted && setIsStarted(false);
      } else if (now.getTime() === _startDate.getTime()) {
        // setRemainingTime('00:00:00');
        setIsStarted(true);
      } else {
        _targetDate = _endDate;
        setIsStarted(true);
      }

      _targetDate = new Date('2025-05-07T12:00:00.000Z');

      setRemainingTime(remainingTimeValues(_targetDate));
    };
    calcRemTime();

    const interval = setInterval(() => {
      calcRemTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [activeRoundDetails?.endDate, activeRoundDetails?.startDate, isStarted]);

  return (
    <div className='relative flex flex-col justify-center items-center bg-black bg-repeat font-tusker-grotesk '>
      <div className='absolute top-0 left-0 w-full h-full bg-particle-pattern-small bg-repeat bg-auto opacity-15 z-0'></div>
      <div className='relative z-10 p-8'>
        <Image
          className='py-3 px-6 object-contain'
          src='/images/home/banner-vector-1.svg'
          alt='Banner Vector'
          width={478}
          height={275}
        />
        <div className='absolute uppercase  font-tusker-grotesk text-[74px] text-white text-center text-nowrap text-xl sm:text-4xl md:text-5xl tracking-[-3%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10'>
          <p className='text-[73.173px] text-[#91A0A1] uppercase font-normal text-center'>
            {' '}
            the future of
          </p>
          <p className='text-[73.173px] leading-[106%] tracking-[-2.195px] uppercase  text-[#F6F6F6] font-bold'>
            tokenization
          </p>
        </div>
      </div>
      <div className='  bg-black z-50 w-full flex justify-center gap-40 px-10 py-4 '>
        <div className='flex flex-col justify-center py-2'>
          <div className='text-center text-[#FBBA80] text-sm  font-redHatText'>
            {roundStatus === 'ended'
              ? 'Round has ended'
              : roundStatus === 'starts'
                ? 'starts'
                : 'ends'}
            {/* Round {activeRoundDetails ? 'ends ' : 'starts '} */}
            {/* <span className='font-bold'>December 21st, 2024</span> */}
          </div>

          <div className='text-[#fff] text-center text-[42px] font-tusker-grotesk  font-semibold  leading-[46px] tracking-[-0.21px] flex gap-3'>
            <div className='flex items-center gap-1'>
              <span className='font-tusker-grotesk '>
                {remainingTime?.days}
              </span>
              <span className='text-lg font-redHatText font-semibold mt-4'>
                Days
              </span>
            </div>
            <div className='flex items-center justify-center gap-1'>
              <span>{remainingTime?.hours}</span>
              <span className='text-lg font-redHatText font-semibold mt-4'>
                Hours
              </span>
            </div>
            <div className='flex items-center gap-1'>
              <span>{remainingTime?.minutes}</span>
              <span className='text-lg font-redHatText font-semibold mt-4'>
                Minutes
              </span>
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-center py-2'>
          <div className='text-center text-[#FBBA80] text-sm font-bold font-redHatText'>
            {' '}
            Matching Pool
          </div>

          <div className='text-[#fff] text-[42px] font-tusker-grotesk font-semibold   leading-[46px] tracking-[-0.21px]'>
            $ 250,000{' '}
          </div>
        </div>
      </div>
    </div>
  );
};
