'use client';
import React from 'react';
import DashboardIndex from '@/components/DonarDashboard/DashboardIndex';
import { ConnectModal } from '@/components/ConnectModal';
import { useAccount } from 'wagmi';

const page = () => {
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
  return (
    <div>
      <DashboardIndex />
    </div>
  );
};

export default page;
