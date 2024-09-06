import React from 'react';

export const ProjectsBanner = () => {
  return (
    <div className='relative bg-particle-pattern py-32 flex flex-col justify-center items-center'>
      {/* <Image
        className='p-16'
        src='/images/home/banner-vector.svg'
        alt='Banner Vector'
        fill
      /> */}

      <div
        className='min-w-full min-h-full  bg-repeat-x absolute bg-center'
        style={{
          backgroundImage: `url(/images/home/projects-banner.svg)`,
        }}
      ></div>

      <h1 className='uppercase text-white text-center text-nowrap relative font-tusker-grotesk'>
        <div className='text-4xl sm:text-7xl md:text-8xl lg:text-9xl xl:tracking-[-4px]'>
          <div className='text-4xl sm:text-7xl md:text-8xl lg:text-9xl xl:tracking-[-4px]'>
            the future of
          </div>
          <div className='text-4xl sm:text-7xl md:text-8xl lg:text-9xl xl:tracking-[-2px] font-black text-peach '>
            tokenization
          </div>
        </div>
      </h1>
    </div>
  );
};
