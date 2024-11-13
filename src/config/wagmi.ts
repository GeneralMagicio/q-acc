import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

import { cookieStorage, createStorage } from 'wagmi';
import config from './configuration';

// Your WalletConnect Cloud project ID
export const projectId = 'cea85f2edebb693e0443973f37e23153';

// Create a metadata object
const metadata = {
  name: 'qacc',
  description:
    'The Quadratic Accelerator is pioneering a novel tokenization protocol that combines the best features of Quadratic Funding (QF) and Augmented Bonding Curves (ABCs).',
  url: 'https://q-acc.giveth.io', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export const networks = config.SUPPORTED_CHAINS;

// Create wagmiConfig
export const wagmiConfig = defaultWagmiConfig({
  chains: config.SUPPORTED_CHAINS,
  projectId,
  metadata,
  ssr: true,
  auth: {
    email: false,
    socials: [],
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
});
