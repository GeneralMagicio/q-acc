'use client';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Banner } from '@/components/Banner';
import Collaborator from '@/components/Collaborator';
import { isProductReleased } from '@/config/configuration';
import Routes from '@/lib/constants/Routes';

import Rules from '@/components/Rules';
import { RoundStatusBanner } from '@/components/RoundInfoBanner/RoundStatusBanner';
import { OnBoardButton } from '@/components/OnBoardButton';
import { Support } from '@/components/Support';
import { QaccProjectsCard } from '@/components/QaccProjectsCard';
import QaccRoundEndBanner from '@/components/QaccRoundEndBanner';
import { useFetchActiveRoundDetails } from '@/hooks/useFetchActiveRoundDetails';
import { useFetchMostRecentEndRound } from '@/components/ProjectDetail/usefetchMostRecentEndRound';

export default function Home() {
  const { data: activeRoundDetails } = useFetchActiveRoundDetails();

  const isQaccRoundEnded = useFetchMostRecentEndRound(activeRoundDetails);
  return isProductReleased ? (
    <main className='flex flex-col '>
      <Banner
        title1='the future of'
        title2='tokenization'
        subTitle='q/acc = QF*ABC'
      />
      <div className='bg-white relative overflow-hidden'>
        <Image
          src='/images/bg/round1.png'
          alt='round'
          width={500}
          height={500}
          style={{ position: 'absolute', top: '0', right: '0', opacity: 0.3 }}
        />
        <div className='container flex flex-col gap-10 pt-4 pb-20 font-light text-2xl text-gray-600'>
          {!activeRoundDetails ? <QaccRoundEndBanner /> : <RoundStatusBanner />}

          <div className='flex flex-col gap-6 mx-auto w-[80%]'>
            <h1 className='text-4xl text-gray-900 font-bold mt-10'>
              Welcome to Quadratic Acceleration
            </h1>
            <div className='leading-9 text-[#4F576A]'>
              <p>
                The Web3 frontier is advancing rapidly, led by innovators
                rewriting the rules of the digital world. Among them, the
                <b className='font-extrabold'>
                  {' '}
                  Season 1 Quadratic Accelerator Cohort{' '}
                </b>
                stands out—featuring startups with visionary founders, real
                token utility, and product market fit. These are the
                trailblazers of tomorrow, building the foundation for Web3’s
                inevitable mainstream adoption.
              </p>
              <br />
              <p>
                Inaccessible opportunities dominated by insiders, costly
                exchange listings, and token allocations that favor a select few
                is still the dominant playbook. These barriers make it difficult
                for everyday supporters to participate meaningfully. Quadratic
                Acceleration challenges this status quo.
              </p>
              <br />
              <p>
                This is your chance to support these rising stars from the
                ground floor—at the very start of their token economies. It
                empowers you to align with bold, forward-thinking startups at
                the critical early stage, where your support can make the
                greatest impact. 
              </p>
              <br />
              <p>
                Step into the future with Quadratic Accelerator and seize your
                opportunity to support Web3’s most innovative projects.
              </p>
            </div>
          </div>
          <div className='flex justify-center rounded-md  mx-auto w-[80%] sm:h-[300px] md:h-[500px] lg:h-[720px]'>
            <iframe
              className='w-full'
              src='https://www.youtube.com/embed/m30ElzaR--4'
              title='Quadratic Acceleration (q/acc): The Future of Tokenization'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen={true}
            ></iframe>
          </div>
        </div>
      </div>
      <div className='w-full h-8 bg-orange-300'></div>
      <QaccProjectsCard />
      <br></br>
      <Rules />
      <div className='flex flex-col gap-6 md:flex-row justify-center items-center  bg-white'>
        <OnBoardButton />
      </div>
      <Support />
      <div className='w-full h-8 bg-orange-300'></div>
      <Collaborator />
    </main>
  ) : (
    redirect(Routes.KycLanding)
  );
}
