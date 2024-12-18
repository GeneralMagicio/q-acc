import React from 'react';
import Image from 'next/image';

export const MatchingRoundCard: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center  w-[100%]  h-[130px] bg-[#5326EC] rounded-2xl font-redHatText gap-3 relative overflow-hidden'>
      <Image
        src='/images/bg/round1.png'
        alt='round'
        width={200}
        height={200}
        style={{
          position: 'absolute',
          top: '10px',
          right: '30px',
          opacity: 0.3,
        }}
      />
      <div className='text-[#F7F7F9]  text-wrap text-[40px] md:text-[46px] text-center  font-bold z-40'>
        🎉 $250,000 🎉
      </div>
      <div className='text-[#A2B1D3] text-base text-center font-medium'>
        Matching Pool
      </div>
    </div>
  );
};
