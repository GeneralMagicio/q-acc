'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CreateNavbar from '../CreateNavbar';
import Routes from '@/lib/constants/Routes';
import { GitcoinVerifySection } from '@/components/Verification/GitcoinVerifySection';
import { ZkidVerifySection } from '@/components/Verification/ZkidVerifySection';
import links from '@/lib/constants/links';
import { useUpdateSkipVerification } from '@/hooks/useUpdateSkipVerification';
import { Button, ButtonColor, ButtonStyle } from '@/components/Button';
import { useFetchUser } from '@/hooks/useFetchUser';

const GetVerified = () => {
  const router = useRouter();
  const { data: user } = useFetchUser();
  const searchParams = useSearchParams();

  const showBackButton = searchParams.get('b');

  const { mutate: updateSkipVerification, isPending } =
    useUpdateSkipVerification(() => {
      console.log('Skip verification updated successfully!');
    });

  return (
    <>
      <CreateNavbar
        title=''
        submitLabel='Close'
        onBack={
          showBackButton
            ? e => {
                e.preventDefault();
                router.push(Routes.CreateProfile);
              }
            : undefined
        }
        onSubmit={() => {
          router.push(Routes.AllProjects);
        }}
      />
      <div className='w-full bg-white flex flex-col p-8 gap-10 rounded-2xl  text-lg font-redHatText leading-9 mb-14 md:mb-48 mt-14'>
        {/* <CountryRegulatory /> */}
        {/* <QaccCappDesc /> */}
        <p>
          The q/acc protocol prohibits citizens of the{' '}
          <b className='font-bold'>United States and United Kingdom</b> from
          participating due to regulatory reasons.
        </p>
        <div>
          <p>
            You must verify in order to use the q/acc protocol. You may verify
            using Human Passport or Privado zkID for verification.
          </p>
          <p>
            The spending cap for Human Passport is up to approx. $1,000 and the
            spending cap for zkID is approx. $25,000.
          </p>
          <p className='border-gray-100 border-b-2 pb-4'>
            The spending caps are set in $POL at the start of the round but may
            be updated periodically based on significant fluctuation in the
            POL-USD exchange rate.
          </p>
        </div>
        <GitcoinVerifySection />
        <ZkidVerifySection />
        <Button
          styleType={ButtonStyle.Solid}
          color={ButtonColor.Base}
          className='mr-auto px-16 shadow-baseShadow mx-3'
          loading={isPending}
          disabled={user?.skipVerification}
          onClick={() => updateSkipVerification(true)}
        >
          {user?.skipVerification
            ? 'Verification Skipped '
            : 'Skip Verification'}
        </Button>
        <div className='text-lg border-gray-100 border-t-2 pt-4'>
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
            href='mailto:info@qacc.xyz'
            target='_blank'
            className='font-bold text-pink-500'
            referrerPolicy='no-referrer'
          >
            info@qacc.xyz.
          </a>
        </div>
      </div>
    </>
  );
};

export default GetVerified;
