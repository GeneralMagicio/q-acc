'use client';
import { useAccount } from 'wagmi';
import { ConnectModal } from '@/components/ConnectModal';
import CreateProfileForm from '@/components/Create/CreateProfileForm';

export default function CreateProfilePage() {
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
  return (
    <div className='container'>
      <CreateProfileForm />
    </div>
  );
}
