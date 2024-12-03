import React from 'react';

export const ProjectsBanner = () => {
  return (
    <div className='relative bg-particle-pattern py-10 flex flex-col justify-center items-center'>
      <div
        className='min-w-full min-h-full  bg-repeat-x absolute bg-center'
        style={{
          backgroundImage: `url(/images/home/projects-banner.svg)`,
        }}
      ></div>

      <h1 className='uppercase text-white text-center text-nowrap relative font-tusker-grotesk'>
        <div className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:tracking-[-4px]'>
          <div className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:tracking-[-4px]'>
            the future of
          </div>
          <div className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:tracking-[-2px] font-black text-peach '>
            tokenization
          </div>
        </div>
      </h1>
    </div>
  );
};
