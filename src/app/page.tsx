'use client';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Banner } from '@/components/Banner';
import Collaborator from '@/components/Collaborator';
import { isProductReleased } from '@/config/configuration';
import Routes from '@/lib/constants/Routes';

import Rules from '@/components/Rules';
import { OnBoardButton } from '@/components/OnBoardButton';
import { Support } from '@/components/Support';
import { QaccProjectsCard } from '@/components/QaccProjectsCard';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { useFetchMostRecentEndRound } from '@/components/ProjectDetail/usefetchMostRecentEndRound';

export default function Home() {
  const { data: activeRoundDetails, isLoading } = useFetchActiveRoundDetails();

  const isQaccRoundEnded = useFetchMostRecentEndRound(activeRoundDetails);
  return isProductReleased ? (
    <main className='flex flex-col '>
      <Banner />
      <div className='bg-white relative overflow-hidden'>
        <Image
          src='/images/bg/round1.png'
          alt='round'
          width={500}
          height={500}
          style={{ position: 'absolute', top: '0', right: '0', opacity: 0.3 }}
        />
        <div className='container flex flex-col gap-10 pt-4 pb-20 font-light text-2xl text-gray-600'>
          {/* Qacc Banner Stats */}
          {/* {isLoading ? (
            ''
          ) : !activeRoundDetails ? (
            <QaccRoundEndBanner />
          ) : (
            <RoundStatusBanner />
          )} */}

          <div className='flex flex-col gap-6 mx-auto w-[80%]'>
            <h1 className='text-4xl text-gray-900 font-bold mt-10'>
              Quadratic Acceleration (q/acc): The Future of Trust in
              Tokenization
            </h1>
            <div className='leading-9 text-[#4F576A]'>
              <p>
                Web3 is the future, but let’s be honest—it’s chaotic. Scams, rug
                pulls, and hype-driven speculation make it nearly impossible for
                many to separate real innovation from noise; q/acc changes that.
              </p>
              <br />
              <p>
                The most promising Web3 startups are hand-picked to launch their
                tokens in a way that’s secure, transparent, and rug-proof. No
                more guessing games. No more losing to bad actors. Just pure,
                accelerated innovation
              </p>
              <br />
            </div>
          </div>
        </div>
      </div>
      {/* <div className='w-full h-8 bg-orange-300'></div> */}
      <QaccProjectsCard />

      <br></br>
      <Rules />
      <div className='flex flex-col gap-6 md:flex-row justify-center items-center  bg-white'>
        <OnBoardButton />
      </div>
      <Support />
      <div className='flex justify-center rounded-md  mx-auto my-5 w-[80%] sm:h-[300px] md:h-[500px] lg:h-[720px] '>
        <iframe
          className='w-full rounded-lg'
          src='https://www.youtube.com/embed/m30ElzaR--4'
          title='Quadratic Acceleration (q/acc): The Future of Tokenization'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen={true}
        ></iframe>
      </div>
      {/* <div className='w-full h-8 bg-orange-300'></div> */}
      <Collaborator />
    </main>
  ) : (
    redirect(Routes.KycLanding)
  );
}
