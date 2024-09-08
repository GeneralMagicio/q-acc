'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CreateNavbar from '../CreateNavbar';
import { Button, ButtonColor } from '@/components/Button';
import Routes from '@/lib/constants/Routes';
import { IconError } from '@/components/Icons/IconError';
import { IconVerified } from '@/components/Icons/IconVerified';
import { IconInfo } from '@/components/Icons/IconInfo';
import { usePrivado } from '@/hooks/usePrivado';
import { useFetchUser } from '@/hooks/useFetchUser';

interface IVerified {
  isVerified: boolean;
  error: boolean;
}
const VerifyPrivado = () => {
  const router = useRouter();
  const { verifyAccount, isVerified, error, isLoading } = usePrivado();
  const userFetch = useFetchUser();

  const verified: IVerified = { isVerified, error: !!error };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    router.push(Routes.Home);
  };
  return (
    <form onSubmit={handleSubmit}>
      <CreateNavbar
        title='Identity verification'
        onBack={e => {
          e.preventDefault();
          router.push(Routes.CreateProfile);
        }}
        submitLabel='Save'
        disabled={!verified.isVerified}
      />
      <div className='w-full bg-white flex flex-col p-8 gap-10 rounded-2xl mt-6'>
        <div>
          <h1 className='text-2xl text-[#1D1E1F] font-bold'>
            Account Verification
          </h1>
        </div>
        <div className='flex flex-col gap-8'>
          <div className='font-redHatText'>
            <p className='text-[#1D1E1F] text-xl'>
              We use zero knowledge ID to maintain the integrity of quadratic
              acceleration. All participants are required to validate their
              credentials with out identity partner, Privado.
            </p>
          </div>
          <div className='flex flex-col gap-10 lg:flex-row justify-between'>
            {!isLoading ? (
              <div
                className={`flex p-4 border  rounded-lg gap-4 ${
                  verified.error
                    ? 'bg-[#FFD6D0] border-[#C71D06] '
                    : verified.isVerified
                      ? 'bg-[#D2FFFB] border-[#1B8C82] '
                      : 'bg-[#F6F3FF] border-[#8668FC] '
                }`}
              >
                {verified.error ? (
                  <>
                    <IconError />
                    <span className='text-[#C71D06] font-redHatText text-sm'>
                      We can&apos;t verify your account, please contact Qacc
                      support team <b>qacc@giveth.io</b>
                    </span>
                  </>
                ) : verified.isVerified ? (
                  <>
                    <IconVerified />
                    <span className='text-[#1B8C82] font-redHatText text-sm'>
                      You account has been successfully verified.
                    </span>
                  </>
                ) : (
                  <>
                    <IconInfo size={17} color='#8668FC' />
                    <span className='text-[#8668FC] font-redHatText text-sm'>
                      Identity credentials are required.
                    </span>
                  </>
                )}
              </div>
            ) : (
              <span></span>
            )}
            <div className='font-redHatText font-bold'>
              {verified.error ? (
                <Button
                  type='button'
                  onClick={verifyAccount}
                  className='p-4 rounded-full shadow-baseShadow text-sm font-bold min-w-[200px] justify-center'
                >
                  Retry
                </Button>
              ) : verified.isVerified ? (
                <Button
                  type='button'
                  className='p-4 rounded-full opacity-100  shadow-baseShadow text-sm font-bold min-w-[200px] justify-center '
                  color={ButtonColor.Green}
                >
                  Verified
                  <Image
                    src='/images/icons/tick.svg'
                    alt='tick'
                    height={16}
                    width={16}
                  />
                </Button>
              ) : (
                <Button
                  type='button'
                  loading={isLoading}
                  onClick={verifyAccount}
                  className='p-4 rounded-full shadow-baseShadow text-sm font-bold min-w-[200px] justify-center'
                >
                  {isLoading ? 'Loading' : 'Verify My Account'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default VerifyPrivado;
