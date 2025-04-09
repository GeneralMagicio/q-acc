'use client';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Inter } from 'next/font/google';
import { Banner } from '@/components/Banner/Banner';
import Collaborator from '@/components/Collaborator';
import { isProductReleased } from '@/config/configuration';
import Routes from '@/lib/constants/Routes';

import Rules from '@/components/Rules';
import { OnBoardButton } from '@/components/OnBoardButton';
import { Support } from '@/components/Support';
import { QaccProjectsCard } from '@/components/QaccProjectsCard';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return isProductReleased ? (
    <main className='flex flex-col '>
      <Banner />
      <div className='bg-white relative overflow-hidden'>
        <Image
          src='/images/bg/section1.svg'
          alt='round'
          width={700}
          height={700}
          className='absolute z-50 opacity-20 right-0 top-0'
        />
        <div className='container relative flex flex-col gap-10 pt-4 pb-4 font-light text-2xl text-gray-600'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div>
              <h1
                className={`text-3xl text-gray-900 font-bold mt-10 ${inter.className} mb-6`}
              >
                Quadratic Acceleration (q/acc): The Future of Trust in
                Tokenization
              </h1>
              <div className='text-2xl leading-9 text-gray-600'>
                <p>
                  Web3 is the future, but let’s be honest—it’s chaotic. Scams,
                  rug pulls, and hype-driven speculation make it nearly
                  impossible for many to separate real innovation from noise;
                  q/acc changes that.
                </p>
                <br />
                <p>
                  The most promising Web3 startups are hand-picked to launch
                  their tokens in a way that’s secure, transparent, and
                  rug-proof. No more guessing games. No more losing to bad
                  actors. Just pure, accelerated innovation
                </p>
                <br />
              </div>
            </div>
            <div className='p-10 flex justify-center items-center'>
              <iframe
                className='w-full rounded-lg h-auto my-6 aspect-video'
                src='https://www.youtube.com/embed/m30ElzaR--4'
                title='Quadratic Acceleration (q/acc): The Future of Tokenization'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen={true}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <QaccProjectsCard />

      <br></br>
      <Rules />
      <div className='flex flex-col gap-6 md:flex-row justify-center items-center  bg-white'>
        <OnBoardButton />
      </div>
      <Support />
      {/* <div className='w-full h-8 bg-orange-300'></div> */}
      <Collaborator />
    </main>
  ) : (
    redirect(Routes.KycLanding)
  );
}
