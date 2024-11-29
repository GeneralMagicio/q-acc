'use client';
import React from 'react';
import Image from 'next/image';
import { Banner } from '@/components/Banner';
import About from '@/components/About';
import Collaborator from '@/components/Collaborator';
import { KycLandingButton } from '@/components/KycLandingButton';
import { KycCompleteBox } from '@/components/KycCompleteBox';
import { usePrivado } from '@/hooks/usePrivado';
import links from '@/lib/constants/links';
import { PrivadoHoldUp } from '@/components/PrivadoHoldUp';

const ZkidLanding = () => {
  const { isVerified } = usePrivado();
  return (
    <div className='flex flex-col gap-4'>
      <Banner
        title1='the future of'
        title2='tokenization'
        subTitle='q/acc = QF*ABC'
      />
      <div className='bg-white relative overflow-hidden pt-20'>
        <Image
          src='/images/bg/round1.png'
          alt='round'
          width={500}
          height={500}
          style={{ position: 'absolute', top: '0', right: '0', opacity: 0.2 }}
        />
        <div className='container flex flex-col gap-10 pt-4 pb-20 font-light text-2xl text-gray-600'>
          {isVerified && <KycCompleteBox />}
          <div>
            <h1 className='text-5xl text-gray-900 font-bold mb-6'>
              Get ready for Season 1
            </h1>
            <p>
              The q/acc protocol uses Privado ID zero knowledge system to
              maintain integrity and ensure privacy. Participants receive their
              KYC credential from the Synaps identity verification provider.
              Whether you have an existing Giveth profile or are creating a new
              one, you’ll need to complete your{' '}
              <strong className='font-bold'>
                zero-knowledge identity verification (zkID)
              </strong>{' '}
              .
            </p>
            <br />
            <p>The process is simple:</p>
            <br />
            <ul className='list-disc px-10'>
              <li>
                <strong className='font-bold'>Liveness Check:</strong> This step
                confirms you’re a real human.
              </li>
              <li>
                <strong className='font-bold'>Documentation Check:</strong> This
                step ensures you are not a minor and prevents AML-listed
                countries from participating, as well as those from the US or UK
                for regulatory reasons.
              </li>
            </ul>
            <br />
            <p>
              Once verified, your wallet will hold your{' '}
              <strong className='font-bold'>KYC credential</strong>, which will
              allow you to participate without sharing personal data. This easy
              process protects against Sybil attacks and strengthens regulatory
              compliance.
            </p>
          </div>

          <div className='flex flex-col p-6 gap-6 rounded-2xl bg-gray-100'>
            <h1 className='text-gray-800 text-2xl font-bold'>
              Add zkID credential to your account
            </h1>
            <p>
              If you don’t have an account, you will be prompted to create one.
            </p>
            <ol className='list-decimal pl-6'>
              <li className='mb-8'>
                Click the “Get started” button to create your profile first.
              </li>
              <li className='mb-8'>
                On the identity verification page, click the “Go to Privado ID”
                button.
                <p>
                  A new tab will open where you can complete the verification.
                  Read this{' '}
                  <a
                    href={links.PRIVADO_GUIDE_LINK}
                    target='_blank'
                    className='font-bold text-pink-500'
                  >
                    guide
                  </a>{' '}
                  for the step-by-step process.
                </p>
              </li>
              <li className='mb-8'>
                <strong className='font-bold'>
                  THIS MAY TAKE UP TO 24 hours, but it is usually done quickly.
                </strong>
                <p>
                  <strong className='font-bold'>
                    You can come back here to this site to check the status.
                  </strong>
                </p>
                <p>
                  Once you have passed zkID verification and claimed your
                  credentials, your “Verified” status will be displayed on your
                  profile page.
                </p>
              </li>
            </ol>
          </div>
          <div className='flex flex-col p-6 gap-6 rounded-2xl bg-gray-100'>
            <h1 className='font-bold'>🛂 Hold Up!</h1>
            <p className='mt-4 mb-4'>
              Before proceeding, you should know that:
            </p>
            <PrivadoHoldUp />
          </div>
          <p>
            Got stuck somewhere in the process? If you’re having trouble or
            received an error, contact the{' '}
            <a
              href={links.TELEGRAM_SUPPORT}
              target='_blank'
              className='font-bold text-pink-500'
            >
              q/acc Support Telegram channel
            </a>{' '}
            or send an email to qacc@giveth.io. We’ll help you get back on
            track!
          </p>
          {!isVerified && (
            <div>
              <KycLandingButton />
            </div>
          )}
        </div>
      </div>
      <About />
      <Collaborator />
    </div>
  );
};

export default ZkidLanding;
