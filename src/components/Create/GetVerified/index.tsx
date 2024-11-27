'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CreateNavbar from '../CreateNavbar';
import Routes from '@/lib/constants/Routes';
import { usePrivado } from '@/hooks/usePrivado';
import { PrivadoModal } from '@/components/Modals/PrivadoModal';
import { GitcoinVerifySection } from './GitcoinVerifySection';

interface IVerified {
  isVerified: boolean;
  error: boolean;
}
const GetVerified = () => {
  const [showPrivadoModal, setShowPrivadoModal] = useState(false);
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
      <form
        onSubmit={handleSubmit}
        className='mb-[60px] md:mb-[200px] mt-[60px]'
      >
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
        <div className='w-full bg-white flex flex-col p-8 gap-10 rounded-2xl mt-6 text-xl font-redHatText leading-9'>
          <p>
            The q/acc protocol prohibits citizens of the{' '}
            <b className='font-bold'>United States and United Kingdom</b> from
            participating due to regulatory reasons.
          </p>
          <p className='border-gray-100 border-b-2 pb-4'>
            The q/acc protocol prohibits citizens from{' '}
            <b className='font-bold'>
              Afghanistan, American Samoa, Anguilla, Antigua and Barbuda,
              Belarus, Bosnia Herzegovina, Central African Republic, Cuba, DR
              Congo, Ethiopia, Fiji, Guam, Hong Kong, Iran, Iraq, Kosovo,
              Lebanon, Libya, Mali, Montenegro, Myanmar, Nicaragua, North Korea,
              North Macedonia, Palau, Panama, Russia, Samoa, Serbia, Somalia,
              South Sudan, Sudan, Syria, Ukraine, US Virgin Islands, Vanuatu,
              Venezuela, Yemen
            </b>{' '}
            from participating due to AML compliance.
          </p>
          <p>
            The q/acc protocol uses{' '}
            <b className='font-bold'>Privado zkID and Gitcoin Passport</b>.
          </p>
          <p className='border-gray-100 border-b-2 pb-4'>
            There is a low cap and a high cap. The low cap is approximately{' '}
            <b className='font-bold'>1K USD denominated in POL</b> and requires{' '}
            <b className='font-bold'>Gitcoin Passport</b>. Above that amount,{' '}
            <b className='font-bold'>zkID is required up until the high cap</b>,
            which is approximately{' '}
            <b className='font-bold'>15K USD denominated in POL</b>. Caps are
            per-person and per-project.
          </p>
          <GitcoinVerifySection />
        </div>
      </form>
      {showPrivadoModal && (
        <PrivadoModal
          isOpen={showPrivadoModal}
          onClose={() => {
            setShowPrivadoModal(false);
          }}
        />
      )}
    </>
  );
};

export default GetVerified;
