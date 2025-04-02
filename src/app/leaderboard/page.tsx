'use client';
import React from 'react';
import { useAccount } from 'wagmi';
import { redirect } from 'next/navigation';
import { ConnectModal } from '@/components/ConnectModal';
import { isProductReleased } from '@/config/configuration';

import Routes from '@/lib/constants/Routes';
import { LeaderBoardView } from '@/components/LeaderBoard/LeaderBoardView';

const LeaderBoardPage = () => {
  const { address, isConnected } = useAccount();
  if (!isConnected) {
    return (
      <>
        <ConnectModal
          isOpen={true}
          onClose={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </>
    );
  }
  return isProductReleased ? (
    <div>
      <LeaderBoardView />
    </div>
  ) : (
    redirect(Routes.KycLanding)
  );
};

export default LeaderBoardPage;
