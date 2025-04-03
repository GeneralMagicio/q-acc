import Image from 'next/image';
import React from 'react';

export const Banner = () => {
  return (
    <div className='my-8 px-4 py-7 uppercase text-left text-7xl font-tusker-grotesk relative'>
      <Image src='/images/bg/leaderboard.svg' alt='bg' fill />
      <div className='pl-10 relative z-10'>
        <div>POINTS</div>
        <div className='font-bold'>LEADERBOARD</div>
      </div>
    </div>
  );
};
