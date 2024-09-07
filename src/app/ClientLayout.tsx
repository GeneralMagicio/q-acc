'use client'; // Ensure this component is a Client Component
import { usePathname } from 'next/navigation';
import Web3ModalProvider from '@/context/wagmi';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { UserController } from '@/components/Controllers/UserController';
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
  const showHeader = !pathname.startsWith('/donate');

  return (
    <Web3ModalProvider initialState={initialState}>
      {showHeader && <Header />}
      <UserController />
      <div className='flex-1'>{children}</div>
      <Footer />
    </Web3ModalProvider>
  );
}
