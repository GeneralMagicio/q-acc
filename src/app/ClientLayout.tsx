'use client'; // Ensure this component is a Client Component
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Web3ModalProvider from '@/context/wagmi';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { UserController } from '@/components/Controllers/UserController';
import { GeoController } from '@/components/Controllers/GeoController';

// Import usePathname

export default function ClientLayout({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState: any;
}) {
  const pathname = usePathname(); // Get the current route

  // Conditionally render the Header based on the route
  const showHeader = !pathname.startsWith('/support');
  const ErudaProvider = dynamic(
    () => import('../components/Eruda').then(c => c.ErudaProvider),
    {
      ssr: false,
    },
  );

  return (
    <ErudaProvider>
      <Web3ModalProvider initialState={initialState}>
        {showHeader && <Header />}
        <UserController />
        <GeoController />
        <div className='flex-1'>{children}</div>
        <Footer />
      </Web3ModalProvider>
    </ErudaProvider>
  );
}
