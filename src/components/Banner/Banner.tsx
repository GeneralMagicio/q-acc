import Image from 'next/image';
import { FC } from 'react';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { Announced } from './Announced';
import { NotAnnounced } from './NotAnnounced';

interface BannerProps {}

export const Banner: FC<BannerProps> = () => {
  const { data: activeRoundDetails, isLoading } = useFetchActiveRoundDetails();

  return (
    <div className='relative flex flex-col justify-center items-center bg-black bg-repeat font-tusker-grotesk '>
      <div className='absolute top-0 left-0 w-full h-full bg-particle-pattern-small bg-repeat bg-auto opacity-15 z-0'></div>
      <div className='relative z-10'>
        <Image
          className='py-3 px-6 object-contain'
          src='/images/home/banner-vector-1.svg'
          alt='Banner Vector'
          width={270}
          height={135}
        />
        <div className='absolute uppercase text-white text-center text-nowrap text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[-3%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10'>
          the future of tokenization
        </div>
      </div>
      {activeRoundDetails ? <Announced /> : <NotAnnounced />}
    </div>
  );
};
