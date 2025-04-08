import Image from 'next/image';
import { FC } from 'react';
import { IconArrowRight } from './Icons/IconArrowRight';

interface BannerProps {}

export const Banner: FC<BannerProps> = () => {
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
      <div className='flex text-peach items-center px-2 py-4 gap-4 flex-wrap justify-center relative z-10'>
        <div className='text-3xl tracking-widest text-center'>
          Round starts soon.
        </div>
        <button className='flex items-center py-3 px-6 rounded-xl bg-gray-800 shadow-banner-button font-sans font-semibold tracking-wide'>
          <span>Get Started</span>
          <IconArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
