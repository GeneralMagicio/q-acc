import React from 'react';
import links from '@/lib/constants/links';

export const Support = () => {
  return (
    <div className='bg-white'>
      <div className='container'>
        <div className='text-center my-20 text-4xl font-bold leading-relaxed'>
          Need help? Hop onto the{' '}
          <a
            href={links.TELEGRAM_SUPPORT}
            target='_blank'
            className='font-bold text-pink-500'
            referrerPolicy='no-referrer'
          >
            q/acc support channel
          </a>
          <br />
          on Telegram or email{' '}
          <a
            href='mailto:qacc@giveth.io'
            target='_blank'
            className='font-bold text-pink-500'
            referrerPolicy='no-referrer'
          >
            info@qacc.xyz
          </a>
        </div>
      </div>
    </div>
  );
};
