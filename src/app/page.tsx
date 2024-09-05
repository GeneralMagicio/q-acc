'use client';
import Link from 'next/link';
import { Banner } from '@/components/Banner';
import Collaborator from '@/components/Collaborator';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import About from '@/components/About';
import InfoSection from '@/components/InfoSection';
import { Button, ButtonColor } from '@/components/Button';

export default function Home() {
  return (
    <main className='flex flex-col gap-4'>
      <Banner
        title1='the future of'
        title2='tokenization'
        subTitle='q/acc = QF*ABC'
      />
      <InfoSection title='Welcome to q/acc Season 1'>
        <div className='flex flex-col gap-4'>
          <p className='leading-9'>
            The q/acc protocol provides a community-first, fair launch for
            projects ready to tokenize and share their value creation with their
            community of supporters. We believe in a future where
            community-owned protocols are abundant and mainstream.
          </p>
          <p>The future of tokenization starts here.</p>
          <p>
            If you’ve been invited by a project to their early access period,
            you’re in the right place. Here’s what you need to know:
          </p>
          <p>Here’s what you need to know:</p>
        </div>

        <div className='flex  flex-col p-6 gap-4 bg-[#F7F7F9] rounded-2xl container'>
          <h1 className='text-[#1D1E1F] text-[25px] font-bold'>
            🔐 Private Chat
          </h1>
          <p className='text-[24px]'>
            You already have access to the project’s token-gated chat using the
            early access NFT sent to your wallet address by the project. Drop by
            to meet the team.
          </p>
        </div>

        <div className='flex  flex-col p-6 gap-4 bg-[#F7F7F9] rounded-2xl container'>
          <h1 className='text-[#1D1E1F] text-[25px] font-bold'>
            📅 Early Access Mint Rounds
          </h1>
          <p>
            You also have access to acquire project tokens during the mint
            rounds of the early access period. These happen{' '}
            <span className='text-[#4F576A] font-semibold'>twice a week</span>{' '}
            for
            <span className='text-[#4F576A] font-semibold'>
              four (4) weeks.
            </span>
          </p>
          <p>
            To ensure a fair distribution to the wider community, each address
            can hold{' '}
            <span className='text-[#4F576A] font-semibold'>up to ~2%</span> of
            the project’s total token supply for the initialization phase. This
            cap is respected during mint rounds and you will see the max amount
            you may send to reach that cap on the project’s page. At any time,
            you may view your token holdings, see the unlock schedule and claim
            these tokens right here on Giveth by logging into your q/acc
            profile.
          </p>
        </div>

        <div className='flex  flex-col p-6 gap-4 bg-[#F7F7F9] rounded-2xl container '>
          <h1 className='text-[#1D1E1F] text-[25px] font-bold'>🪪 KYC</h1>
          <p>
            You will be asked to complete a zero knowledge KYC before you
            support a project during the mint rounds. This step mitigates Sybil
            attacks and prevents prohibited actors from participating. It is
            fast and easy: find the step-by-step instructions on how to complete
            KYC in our{' '}
            <a
              className='text-[#E1458D] font-semibold'
              target='_blank'
              href='https://giveth.notion.site/Quadratic-Acceleration-q-acc-Knowledge-Hub-4752f35fee2a47fe9e29556dbcfe6883'
            >
              Knowledge Hub.
            </a>
          </p>
        </div>

        <div className='p-6 text-[32px] text-[#4F576A] font-bold text-center'>
          All that’s left to do is click go!
        </div>

        <div className='p-6 text-[32px] text-[#4F576A] font-bold flex justify-center'>
          <Link href={'/projects'}>
            <Button color={ButtonColor.Pink} className='p-[24px] '>
              Support q/acc Projects
            </Button>
          </Link>
        </div>
      </InfoSection>

      <About />
      <FeaturedProjects />
      <Collaborator />
    </main>
  );
}
