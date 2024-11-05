'use client';
import React from 'react';
import { useAccount } from 'wagmi';
import { redirect } from 'next/navigation';
import DashboardIndex from '@/components/DonarDashboard/DashboardIndex';
import { ConnectModal } from '@/components/ConnectModal';
import { isEarlyAccessBranch, isProductReleased } from '@/config/configuration';
import Routes from '@/lib/constants/Routes';

const Dashboard = () => {
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
      <DashboardIndex />
    </div>
  ) : (
    redirect(Routes.KycLanding)
  );
};

export default Dashboard;
