import React from 'react';
import { Nunito_Sans, Inter } from 'next/font/google';
import { IconArrowRight } from '../Icons/IconArrowRight';

const nunito = Nunito_Sans({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export const Announced = () => {
  const isRoundStarted = true; // Replace with actual logic to check if the round has started
  const isRoundEnded = false; // Replace with actual logic to check if the round has ended
  return (
    <div className='flex text-peach items-center px-2 py-4 gap-6 flex-wrap justify-center relative z-10'>
      <div className={`${inter.className} text-white`}>
        q/acc round {isRoundStarted ? `ends` : `starts`} in
      </div>
      <div className='flex flex-col items-center gap-2'>
        <div className='text-3xl tracking-widest text-center'>
          14 days, 8 hour, 32 min
        </div>
        <div className={`${nunito.className} text-sm`}>On April 22nd, 2025</div>
      </div>
      <button
        className={`flex items-center py-3 px-6 rounded-xl bg-gray-950 shadow-banner-button font-semibold tracking-wide ${inter.className}`}
      >
        <span>Get Started</span>
        <IconArrowRight size={24} />
      </button>
    </div>
  );
};
