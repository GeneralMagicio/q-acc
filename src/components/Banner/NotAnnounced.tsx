import React from 'react';

import Link from 'next/link';
import { IconArrowRight } from '../Icons/IconArrowRight';
import Routes from '@/lib/constants/Routes';

export const NotAnnounced = () => {
  return (
    <div className='flex text-peach items-center px-2 py-4 gap-4 flex-wrap justify-center relative z-10'>
      <div className='text-3xl tracking-widest text-center'>
        Round starts soon.
      </div>
      <Link href={Routes.Projects}>
        <button className='flex items-center py-3 px-6 rounded-xl bg-gray-950 shadow-banner-button font-sans font-semibold tracking-wide'>
          <span>Get Started</span>
          <IconArrowRight size={24} />
        </button>
      </Link>
    </div>
  );
};
