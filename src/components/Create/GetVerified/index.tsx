'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { GitcoinVerifySection } from '@/components/Verification/GitcoinVerifySection';
import { ZkidVerifySection } from '@/components/Verification/ZkidVerifySection';
import links from '@/lib/constants/links';
import SkipVerification from '@/components/Verification/SkipVerification';
import { Button, ButtonColor } from '@/components/Button';
import { useFetchUser } from '@/hooks/useFetchUser';
import {
  GitcoinVerificationStatus,
  useGitcoinScore,
} from '@/hooks/useGitcoinScore';
import { usePrivado } from '@/hooks/usePrivado';

const GetVerified = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const showBackButton = searchParams.get('b');
  const { data: user } = useFetchUser();
  const { status } = useGitcoinScore();
  const { isVerified } = usePrivado();

  return (
    <>
      {/* <CreateNavbar
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
      /> */}
      <div className='w-full bg-white flex flex-col p-8 gap-10 rounded-2xl  text-lg font-redHatText leading-9 mb-14 md:mb-48 mt-14'>
        {/* <CountryRegulatory /> */}
        {/* <QaccCappDesc /> */}
        {/* <p>
          The q/acc protocol prohibits citizens of the{' '}
          <b className='font-bold'>United States and United Kingdom</b> from
          participating due to regulatory reasons.
        </p> */}
        <div>
          <p>
            You must verify using Human Passport or Privado zkID to allocate the
            Matching Pool in the q/acc protocol.
          </p>
          <p>
            The spending cap for Human Passport and no verification is approx.
            $1,000 and the spending cap for zkID is approx. $25,000.
          </p>
          <p className='border-gray-100 border-b-2 pb-4'>
            The spending caps are set in $POL and may be updated based on the
            fluctuation in the POL-USD rate.
          </p>
        </div>
        <GitcoinVerifySection />
        <ZkidVerifySection />

        {/* skip verification */}

        <SkipVerification />

        {(isVerified ||
          user?.skipVerification ||
          status === GitcoinVerificationStatus.ANALYSIS_PASS ||
          status === GitcoinVerificationStatus.SCORER_PASS) && (
          <Link href={'/projects'}>
            <Button
              className='p-4 shadow-2xl rounded-full text-xs md:text-md min-w-[150px] justify-center'
              color={ButtonColor.Pink}
              type='submit'
            >
              See Projects
            </Button>
          </Link>
        )}

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
