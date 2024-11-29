import { IBM_Plex_Mono } from 'next/font/google';
import Image from 'next/image';
import { FC } from 'react';

const plex = IBM_Plex_Mono({ subsets: ['latin'], weight: '400' });

interface BannerProps {
  title1: string;
  title2: string;
  subTitle: string;
}

export const Banner: FC<BannerProps> = ({ title1, title2, subTitle }) => {
  return (
    <div className='relative bg-particle-pattern py-10 flex flex-col justify-center items-center'>
      <Image
        className='p-3 object-contain'
        src='/images/home/banner-vector-1.svg'
        alt='Banner Vector'
        fill
      />
      <h1 className='uppercase text-white text-center text-nowrap relative font-tusker-grotesk'>
        <div className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:tracking-[-3px]'>
          {title1}
        </div>
        <div className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:tracking-[-1px] font-black text-peach '>
          {title2}
        </div>
      </h1>
      <div
        className={`text-white text-base sm:text-lg lg:text-xl xl:text-2xl mt-4 ${plex.className}`}
      >
        {subTitle}
      </div>
    </div>
  );
};
