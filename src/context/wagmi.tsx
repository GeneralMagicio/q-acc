'use client';

import { createAppKit } from '@reown/appkit/react';
import { baseSepolia } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Config, State, WagmiProvider } from 'wagmi';
import { projectId, wagmiAdapter, metadata } from '@/config/wagmi';

const queryClient = new QueryClient();

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [baseSepolia],
  defaultNetwork: baseSepolia,
  metadata,
  features: {
    analytics: true,
    email: false,
    socials: [],
    onramp: false,
    swaps: false,
  },
});

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
