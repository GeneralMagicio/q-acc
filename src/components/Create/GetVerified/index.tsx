'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CreateNavbar from '../CreateNavbar';
import Routes from '@/lib/constants/Routes';
import { GitcoinVerifySection } from '@/components/Verification/GitcoinVerifySection';
import { ZkidVerifySection } from '@/components/Verification/ZkidVerifySection';
import { QaccCappDesc } from '@/components/Verification/QaccCappDesc';
import { CountryRegulatory } from '@/components/Verification/CountryRegulatory';
import links from '@/lib/constants/links';

const GetVerified = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const showBackButton = searchParams.get('b');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    router.push(Routes.Home);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className=''>
        <CreateNavbar
          title='Get Verified'
          onBack={
            showBackButton
              ? e => {
                  e.preventDefault();
                  router.push(Routes.CreateProfile);
                }
              : undefined
          }
          submitLabel='Save'
        />
      </form>
      <div className='w-full bg-white flex flex-col p-8 gap-10 rounded-2xl  text-xl font-redHatText leading-9 mb-14 md:mb-48 mt-14'>
        <CountryRegulatory />
        <QaccCappDesc />
        <GitcoinVerifySection />
        <ZkidVerifySection />
        <div className='text-xl border-gray-100 border-t-2 pt-4'>
          Need help? Hop onto the{' '}
          <a
            href={links.TELEGRAM_SUPPORT}
            target='_blank'
            className='font-bold text-pink-500'
            referrerPolicy='no-referrer'
          >
            q/acc support channel{' '}
          </a>
          on Telegram or email{' '}
          <a
            href='mailto:qacc@giveth.io'
            target='_blank'
            className='font-bold text-pink-500'
            referrerPolicy='no-referrer'
          >
            qacc@giveth.io.
          </a>
        </div>
      </div>
    </>
  );
};

export default GetVerified;
