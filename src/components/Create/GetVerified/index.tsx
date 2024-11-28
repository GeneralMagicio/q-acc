'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CreateNavbar from '../CreateNavbar';
import Routes from '@/lib/constants/Routes';
import { GitcoinVerifySection } from '@/components/Verification/GitcoinVerifySection';
import { ZkidVerifySection } from '@/components/Verification/ZkidVerifySection';
import { QaccCappDesc } from '@/components/Verification/QaccCappDesc';
import { CountryRegulatory } from '@/components/Verification/CountryRegulatory';

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
      </div>
    </>
  );
};

export default GetVerified;
