'use client';
import React, { useEffect } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import { redirect } from 'next/navigation';
import DashboardIndex from '@/components/DonarDashboard/DashboardIndex';
import { ConnectModal } from '@/components/ConnectModal';
import { isProductReleased } from '@/config/configuration';
import Routes from '@/lib/constants/Routes';

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    if (isConnected) {
      switchChain({ chainId: 137 });
    }
  }, [isConnected]);

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
      <DashboardIndex />
    </div>
  ) : (
    redirect(Routes.KycLanding)
  );
};

export default Dashboard;
