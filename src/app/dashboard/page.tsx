'use client';
import React from 'react';
import { useAccount } from 'wagmi';
import DashboardIndex from '@/components/DonarDashboard/DashboardIndex';
import { ConnectModal } from '@/components/ConnectModal';

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
  return (
    <div>
      <DashboardIndex />
    </div>
  );
};

export default Dashboard;
