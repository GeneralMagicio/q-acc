// This is the layout file that works as a Server Component
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import { cookieToInitialState } from 'wagmi';
import { headers } from 'next/headers';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { wagmiConfig } from '@/config/wagmi';
import ClientLayout from './ClientLayout';

import { GA_ID, GTM_ID } from '@/config/configuration';
import type { Metadata } from 'next';

const nunito = Nunito_Sans({ subsets: ['latin'] });

const title = 'Quadratic Acceleration';
const description =
  'The Quadratic Accelerator is pioneering a novel tokenization protocol that combines the best features of Quadratic Funding (QF) and Augmented Bonding Curves (ABCs).';
const image = '/images/intro.jpg';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [
      {
        url: image,
        alt: title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [image],
  },
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
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      <head>
        <link rel='icon' href='/favicon.ico' />
        <link rel='manifest' href='/site.webmanifest' />
      </head>
      <body className={nunito.className}>
        <div className='min-h-screen flex flex-col relative overflow-x-hidden'>
          <ClientLayout initialState={initialState}>{children}</ClientLayout>
        </div>
      </body>
    </html>
  );
}
