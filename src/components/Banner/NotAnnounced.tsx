import React from 'react';

import { OnBoardButton } from './onBoardButton';

export const NotAnnounced = () => {
  return (
    <div className='flex text-peach items-center px-2 py-4 gap-4 flex-wrap justify-center relative z-10'>
      <div className='text-3xl tracking-widest text-center'>
        Round starts soon.
      </div>
      <OnBoardButton />
    </div>
  );
};
