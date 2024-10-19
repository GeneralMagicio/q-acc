import { cookieStorage, createStorage } from 'wagmi';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import config from './configuration';

// Your WalletConnect Cloud project ID
export const projectId = '92d26d6f099b694e1df95f1dfdaf5914';

// Create a metadata object
export const metadata = {
  name: 'qacc',
  description: 'AppKit Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
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
