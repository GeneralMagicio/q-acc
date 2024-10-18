'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Banner } from '@/components/Banner';
import { Button, ButtonColor, ButtonStyle } from '@/components/Button';
import Collaborator from '@/components/Collaborator';
import { HelpSection } from '@/components/HelpSection';
import InfoSection from '@/components/InfoSection';
import Routes from '@/lib/constants/Routes';
import { HoldModal } from '../Modals/HoldModal';
import { useAddressWhitelist } from '@/hooks/useAddressWhitelist';

export const CreateView = () => {
  const [showHoldModal, setShowHoldModal] = useState(false);
  const { address } = useAccount();
  const { data: addrWhitelist, isPending } = useAddressWhitelist();

  useEffect(() => {
    setShowHoldModal(!!address && !isPending && !addrWhitelist);
  }, [address, addrWhitelist, isPending]);

  return (
    <main className='flex flex-col gap-4'>
      <Banner
        title1='Welcome to'
        title2='Season one'
        subTitle='q/acc = QF*ABC'
      />
      <InfoSection title='Congratulations on making it to Season 1!'>
        <p>
          We are thrilled to have you in the program! You were accepted into
          this season because your project has shown significant potential, and
          we are confident that you will contribute meaningfully to Polygon’s
          ecosystem.
        </p>
        <p>
          Are you eager to launch your token via an Augmented Bonding Curve? We
          thought so—and we&apos;re just as excited! In preparation, one of the
          first things to do is create your project’s profile page here, in the
          q/acc section of Giveth’s platform. 
        </p>
        <p>This project page is where:</p>
        <ul className='list-disc pl-8'>
          <li>
            your invited early access participants will make their contributions
            to your project. 
          </li>
          <li>
            your public donors will make their contributions during the q/acc
            rounds.
          </li>
        </ul>
        <p>
          This is also the platform where you have a project dashboard to check
          the status of contributions, token supply, token distribution and
          more. It is also where your community will create profiles to
          participate in the early access window and all q/acc rounds.
        </p>
        <Link href={Routes.CreateProject}>
          <Button
            className='mx-auto !py-6 !px-10 mt-20'
            color={ButtonColor.Pink}
            styleType={ButtonStyle.Solid}
          >
            Create Project
          </Button>
        </Link>
      </InfoSection>
      <HelpSection />
      <Collaborator />
      {showHoldModal && (
        <HoldModal
          onClose={() => setShowHoldModal(false)}
          isOpen={showHoldModal}
        />
      )}
    </main>
  );
};
