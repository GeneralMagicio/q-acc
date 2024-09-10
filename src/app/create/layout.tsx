'use client';
import { useAccount } from 'wagmi';
import { ConnectModal } from '@/components/ConnectModal';
import { CreateProvider } from '@/components/Create/CreateContext';

export default function CreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <CreateProvider>
      <section>{children}</section>
    </CreateProvider>
  );
}
