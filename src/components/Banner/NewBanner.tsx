import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';

import { getUpcomingRound, remainingTimeValues } from '@/helpers/date';

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

  const [startDate, setStartDate] = useState('');

  const [roundStatus, setRoundStatus] = useState('ended');

  useEffect(() => {
    const calcRemTime = async () => {
      let startDate = activeRoundDetails?.startDate;
      let endDate = activeRoundDetails?.endDate;
      // console.log(allRounds);

      const now = new Date();

      if (startDate && endDate) {
        const _startDate = new Date(startDate);
        const _endDate = new Date(endDate);

        if (now < _startDate) {
          setRoundStatus('starts');
          setIsStarted(false);
          setRemainingTime(remainingTimeValues(_startDate));
        } else {
          setRoundStatus('ends');
          setIsStarted(true);
          setRemainingTime(remainingTimeValues(_endDate));
        }
      } else {
        const upcomingRound = await getUpcomingRound();
        if (upcomingRound?.startDate) {
          console.log(upcomingRound.startDate);
          const formatted = format(
            new Date(upcomingRound.startDate),
            'MMMM do, yyyy',
          );

          setStartDate(formatted);
          setRoundStatus('starts');
          setIsStarted(false);
          setRemainingTime(
            remainingTimeValues(new Date(upcomingRound.startDate)),
          );
        } else {
          setRoundStatus('ended');
          console.log('No upcoming round.');
        }
      }
    };
    calcRemTime();

    const interval = setInterval(() => {
      calcRemTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [activeRoundDetails?.startDate, activeRoundDetails?.endDate]);

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
            {/* {roundStatus === 'ended' ? (
              'Round has ended'
            ) : roundStatus === 'starts' ? (
              <>
                Round starts{' '}
                <span className='font-bold'>December 21st, 2024</span>
              </>
            ) : (
              'Round ends in '
            )} */}
            {roundStatus === 'starts' ? (
              <>
                Round starts <span className='font-bold'>{startDate}</span>
              </>
            ) : activeRoundDetails ? (
              'Round ends in '
            ) : (
              ''
            )}
            {/* Round {activeRoundDetails ? 'ends ' : 'starts '} */}
            {/* <span className='font-bold'>December 21st, 2024</span> */}
          </div>

          {activeRoundDetails || roundStatus === 'starts' ? (
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
          ) : (
            <div className='text-[#fff] text-[42px] font-tusker-grotesk font-semibold   leading-[46px] tracking-[-0.21px]'>
              Round has Ended
            </div>
          )}
        </div>

        <div className='flex flex-col justify-center py-2'>
          <div className='text-center text-[#FBBA80] text-sm font-bold font-redHatText'>
            {' '}
            Matching Pool
          </div>

          <div className='text-[#fff] text-[42px] font-tusker-grotesk font-semibold   leading-[46px] tracking-[-0.21px]'>
            500,000 POL
          </div>
        </div>
      </div>
    </div>
  );
};
