'use client';

import { redirect } from 'next/navigation';
import { useAccount } from 'wagmi';
import CreateProjectForm from '@/components/Create/CreateProjectForm';
import { isProductReleased } from '@/config/configuration';
import Routes from '@/lib/constants/Routes';
import { ConnectModal } from '@/components/ConnectModal';

export default function CreateProjectPage() {
  const { isConnected } = useAccount();

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
    <div className='container'>
      <CreateProjectForm />
    </div>
  ) : (
    redirect(Routes.KycLanding)
  );
}
