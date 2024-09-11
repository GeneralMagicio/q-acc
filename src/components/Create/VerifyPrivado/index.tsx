'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import CreateNavbar from '../CreateNavbar';
import { Button, ButtonColor } from '@/components/Button';
import Routes from '@/lib/constants/Routes';
import { IconError } from '@/components/Icons/IconError';
import { IconInfo } from '@/components/Icons/IconInfo';
import { usePrivado } from '@/hooks/usePrivado';
import { IconVerifiedFilled } from '@/components/Icons/IconVerifiedFilled';
import { IconVerified } from '@/components/Icons/IconVerified';
import { IconArrowRight } from '@/components/Icons/IconArrowRight';

interface IVerified {
  isVerified: boolean;
  error: boolean;
}
const VerifyPrivado = () => {
  const router = useRouter();
  const { verifyAccount, isVerified, error, isLoading } = usePrivado();

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
        <div className='flex flex-col gap-8'>
          <div className='font-redHatText'>
            <p className='text-[#1D1E1F] text-xl'>
              We use zero knowledge ID to maintain the integrity of quadratic
              acceleration. All participants are required to validate their
              credentials with out identity partner, Privado.
            </p>
          </div>
          {!verified.isVerified && !isLoading && (
            <>
              <div className='font-redHatText'>
                <p className='text-gray-900 font-medium'>
                  Here is how it works:
                </p>
              </div>
              <div className='bg-[#F7F7F9] flex flex-col gap-6 p-6 rounded-2xl'>
                <div className='flex flex-col gap-4'>
                  <h6 className='text-gray-900 font-bold'>
                    1. Click the button below to go to Privado.
                  </h6>
                  <p className='text-gray-800 font-normal'>
                    A new tab will open where you can complete the verification
                    steps.
                  </p>
                </div>
              </div>
              <div className='bg-[#F7F7F9] flex flex-col gap-6 p-6 rounded-2xl'>
                <div className='flex flex-col gap-4'>
                  <h6 className='text-gray-900 font-bold'>
                    2. Verification may take up to 24 hours.
                  </h6>
                  <p className='text-gray-800 font-normal'>
                    Once your credentials are validated, we will show the
                    success status on your q/acc profile page.
                  </p>
                </div>
              </div>
            </>
          )}
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
                    <IconVerifiedFilled />
                    <span className='text-[#1B8C82] font-redHatText text-sm'>
                      You account has been successfully verified.
                    </span>
                  </>
                ) : (
                  <>
                    <IconInfo size={17} color='#8668FC' />
                    <span className='text-[#8668FC] font-redHatText text-sm'>
                      You are not able to participate in q/acc until you have
                      validated your credentials with Privado.
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
                  <IconVerified size={16} />
                </Button>
              ) : (
                <Button
                  type='button'
                  loading={isLoading}
                  onClick={verifyAccount}
                  className='p-4 rounded-full shadow-baseShadow text-sm font-bold min-w-[200px] justify-center'
                >
                  {isLoading ? (
                    'Loading'
                  ) : (
                    <>
                      Go to Privado
                      <IconArrowRight size={16} />
                    </>
                  )}
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
