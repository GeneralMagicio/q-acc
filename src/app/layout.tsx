import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import { cookieToInitialState } from 'wagmi';
import { headers } from 'next/headers';
import Web3ModalProvider from '@/context/wagmi';
import { wagmiConfig } from '@/config/wagmi';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { UserController } from '@/components/Controllers/UserController';
import type { Metadata } from 'next';

const nunito = Nunito_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get('cookie'),
  );
  return (
    <html lang='en'>
      <body className={nunito.className}>
        <div className='min-h-screen flex flex-col relative overflow-x-hidden'>
          <Web3ModalProvider initialState={initialState}>
            <UserController />
            <Header />
            <div className='flex-1'>{children}</div>
            <Footer />
          </Web3ModalProvider>
        </div>
      </body>
    </html>
  );
}
