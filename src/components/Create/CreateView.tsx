'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';

import { Banner } from '@/components/Banner/Banner';
import { Button, ButtonColor, ButtonStyle } from '@/components/Button';
import Collaborator from '@/components/Collaborator';
import { HelpSection } from '@/components/HelpSection';
import InfoSection from '@/components/InfoSection';
import Routes from '@/lib/constants/Routes';
import { HoldModal } from '../Modals/HoldModal';
import { useAddressWhitelist } from '@/hooks/useAddressWhitelist';
import { useFetchUser } from '@/hooks/useFetchUser';
import { useFetchProjectsCountByUserId } from '@/hooks/useFetchProjectsCountByUserId';

export const CreateView = () => {
  const [showHoldModal, setShowHoldModal] = useState(false);
  const router = useRouter();

  const { address, isConnected } = useAccount();
  const { data: addrWhitelist, isPending } = useAddressWhitelist();
  const { data: user } = useFetchUser();

  const { data: userProjectsCount, isFetched: isProjectsCountFetched } =
    useFetchProjectsCountByUserId(parseInt(user?.id ?? ''));

  useEffect(() => {
    setShowHoldModal(!!address && !isPending && !addrWhitelist);
  }, [address, addrWhitelist, isPending]);

  return (
    <main className='flex flex-col gap-4'>
      <Banner />
      <InfoSection title='Congratulations, and welcome to q/acc on Giveth.'>
        <p>
          Now you need to create your Giveth q/acc project page in preparation
          for q/acc round.
        </p>
        {/* <p>
          The Giveth platform is hosting this first q/acc Season. This is where
          your supporters will be able to contribute to your project during the
          Early Access Window and the subsequent q/acc round. As well, they will
          create their own profile, verify their eligibility via zkID,
          contribute to projects, see their tokens, and claim them once they
          begin to unlock.
        </p>
*/}
        {isConnected && (userProjectsCount || 0 > 0) ? (
          <Button
            className='mx-auto !py-6 !px-10 mt-20'
            color={ButtonColor.Pink}
            styleType={ButtonStyle.Solid}
            disabled
          >
            You have already created a project
          </Button>
        ) : (
          <Link href={Routes.CreateProject}>
            <Button
              className='mx-auto !py-6 !px-10 mt-20'
              color={ButtonColor.Pink}
              styleType={ButtonStyle.Solid}
            >
              Create Project
            </Button>
          </Link>
        )}
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
