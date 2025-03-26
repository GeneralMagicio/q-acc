import { cookieStorage, createStorage } from 'wagmi';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import config from '@/config/configuration';

// Your WalletConnect Cloud project ID
export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID as string;
// Create a metadata object
export const metadata = {
  name: 'qacc',
  description:
    'The Quadratic Accelerator is pioneering a novel tokenization protocol that combines the best features of Quadratic Funding (QF) and Augmented Bonding Curves (ABCs).',
  url: 'https://q-acc.giveth.io', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export const networks = config.SUPPORTED_CHAINS;

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  networks,
  projectId,
  ssr: true,
});
