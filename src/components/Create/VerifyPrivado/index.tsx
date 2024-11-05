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
    <form
      onSubmit={handleSubmit}
      className=' mb-[60px] md:mb-[200px] mt-[60px]'
    >
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
        <div className='flex flex-col gap-4'>
          <div className='font-redHatText'>
            <p className='text-[#1D1E1F] text-xl'>
              Before you can support projects in q/acc, you need to complete a
              quick, privacy-first identity verification through Privado ID.
            </p>
          </div>
          {!verified.isVerified && !isLoading && (
            <>
              <div className='font-redHatText text-xl'>
                <p className='text-gray-900'>
                  Here’s why the q/acc partnered with Privado ID:
                </p>
                <br />
                <ul className='list-disc px-10 leading-loose '>
                  <li className='font-normal'>
                    <strong className='font-bold'>
                      Zero-knowledge technology:{' '}
                    </strong>
                    Zero-knowledge proofs mean you can prove your eligibility
                    without sharing any underlying personal data.
                  </li>
                  <li className='font-normal'>
                    <strong className='font-bold'>Data protection: </strong> You
                    are always in control of your data. Privado ID doesn’t store
                    your personal information, so the risk of data leaks is
                    eliminated.
                  </li>
                  <li className='font-normal'>
                    <strong className='font-bold'>Simplified UX: </strong>
                    With Privado ID’s web wallet and mobile app, you can collect
                    credentials like proof of humanity and proof of residency
                    easily.
                  </li>
                  <li className='font-normal'>
                    <strong className='font-bold'>
                      Reusable credentials:{' '}
                    </strong>
                    Once you complete zkID verification, your credentials are
                    reusable across other apps, chains and devices. This means
                    that you only need to complete the process once, and your
                    wallet will be whitelisted for future initiatives. More on
                    credentials reusability in this{' '}
                    <a
                      href='https://www.privado.id/blog/reusable-ekyc---the-fintech-white-whale'
                      target='_blank'
                      className='font-bold text-pink-500'
                    >
                      article
                    </a>
                    .
                  </li>
                </ul>
                <br />
                <p>
                  Read more about the partnership &nbsp;
                  <a
                    href='https://www.privado.id/blog/get-ready-for-q-acc-decentralized-funding'
                    target='_blank'
                    className='font-bold text-pink-500'
                  >
                    here
                  </a>
                  .
                </p>
              </div>
              <br />

              <h2 className='font-bold text-xl'>What’s next?</h2>
              <div className='bg-[#F7F7F9] flex flex-col p-6 rounded-2xl'>
                <div className='flex flex-col gap-4'>
                  <h6 className='text-[#1D1E1F] font-bold text-lg'>
                    1. Click the “Go to Privado ID” button and complete the
                    steps.
                  </h6>
                  <p className='text-[#4F576A] text-xl font-normal'>
                    We’ve put together a simple{' '}
                    <a
                      href='https://giveth.notion.site/Complete-zkID-via-Privado-ID-1223ab28d48c80458699d18cb0f54494'
                      target='_blank'
                      className='font-bold text-pink-500'
                    >
                      step-by-step guide
                    </a>{' '}
                    to walk you through the process.
                  </p>
                </div>
              </div>
              <div className='bg-[#F7F7F9] flex flex-col  p-6 rounded-2xl'>
                <div className='flex flex-col gap-4'>
                  <h6 className='text-[#1D1E1F] font-bold text-lg'>
                    2. After submitting, come back to this site in approximately
                    24 hours and click “Check status with Privado ID”.
                  </h6>
                </div>
              </div>
              <div className='bg-[#F7F7F9] flex flex-col  p-6 rounded-2xl'>
                <div className='flex flex-col gap-4'>
                  <h6 className='text-[#1D1E1F] font-bold text-lg'>
                    3. Claim your credentials.
                  </h6>
                </div>
              </div>
              <div className='bg-[#F7F7F9] flex flex-col  p-6 rounded-2xl'>
                <div className='flex flex-col gap-4'>
                  <h6 className='text-[#1D1E1F] font-bold text-lg'>
                    4. Once verified, your profile will display a “Verified”
                    status.
                  </h6>
                </div>
              </div>
              <br />
              <p className='font-redHatText text-xl'>
                Got stuck somewhere in the process? If you’re having trouble or
                received an error, don’t hesitate to contact us at{' '}
                <a
                  href='https://t.me/qaccsupport'
                  target='_blank'
                  className='font-bold text-pink-500'
                >
                  q/acc Support Telegram channel{' '}
                </a>
                or send an email to qacc@giveth.io We’ll help you get back on
                track!
              </p>

              <hr />
            </>
          )}
          <div className='flex flex-col gap-10 lg:flex-row justify-between mt-8'>
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
                      validated your credentials with PrivadoID.
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
                      Go to Privado ID
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
