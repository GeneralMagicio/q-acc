'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CreateNavbar from '../CreateNavbar';
import Routes from '@/lib/constants/Routes';
import { usePrivado } from '@/hooks/usePrivado';
import { Verification } from '@/components/Verification';

interface IVerified {
  isVerified: boolean;
  error: boolean;
}
const GetVerified = () => {
  const router = useRouter();
  const { isVerified, error, isLoading } = usePrivado();
  const searchParams = useSearchParams();

  const verified: IVerified = { isVerified, error: !!error };

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
          disabled={!verified.isVerified}
        />
      </form>
      <Verification />
    </>
  );
};

export default GetVerified;
