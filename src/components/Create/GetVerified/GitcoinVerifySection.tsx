import React from 'react';
import links from '@/lib/constants/links';
import { Button, ButtonColor, ButtonStyle } from '@/components/Button';

export const GitcoinVerifySection = () => {
  return (
    <section className='bg-gray-100 rounded-2xl p-6 flex flex-col gap-4'>
      <h1 className='text-lg font-bold'>Gitcoin Passport</h1>
      <p>
        Check and improve your <b>Gitcoin Passport score</b> at{' '}
        <a
          href={links.PASSPORT}
          target='_blank'
          className='font-bold text-pink-500'
          referrerPolicy='no-referrer'
        >
          &nbsp;app.passport.xyz
        </a>
      </p>
      <Button
        styleType={ButtonStyle.Solid}
        color={ButtonColor.Pink}
        className='mr-auto px-16'
      >
        Check Score
      </Button>
    </section>
  );
};
