'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CreateNavbar from '../CreateNavbar';
import Routes from '@/lib/constants/Routes';
import { Verification } from '@/components/Verification';

interface IVerified {
  isVerified: boolean;
  error: boolean;
}
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
      <Verification />
    </>
  );
};

export default GetVerified;
