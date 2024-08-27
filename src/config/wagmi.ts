import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

import { cookieStorage, createStorage } from 'wagmi';
import config from './configuration';

// Your WalletConnect Cloud project ID
export const projectId = 'cea85f2edebb693e0443973f37e23153';

// Create a metadata object
const metadata = {
	name: 'qacc',
	description: 'AppKit Example',
	url: 'https://web3modal.com', // origin must match your domain & subdomain
	icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

// Create wagmiConfig
export const wagmiConfig = defaultWagmiConfig({
	chains: config.SUPPORTED_CHAINS,
	projectId,
	metadata,
	ssr: true,
	storage: createStorage({
		storage: cookieStorage,
	}),
});
