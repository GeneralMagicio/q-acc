import { polygonZkEvm } from 'wagmi/chains';
import { EnvConfig } from '@/types/config.type';

const config: EnvConfig = {
  SUPPORTED_CHAINS: [polygonZkEvm] as const,
  SCAN_URL: 'https://basescan.org/',
  ERC_TOKEN_ADDRESS: '0x9Cc1c42e4525ba4116d7948741ccA9C7446596b2',
  ERC_TOKEN_SYMBOL: 'POL',
  GRAPHQL_ENDPOINT:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    'https://qacc-be.generalmagic.io/graphql',
  AUTH_BASE_ROUTE:
    process.env.NEXT_PUBLIC_AUTH_BASE_ROUTE || 'https://auth.giveth.io/v1',
  GIVETH_GQL_ENDPOINT: 'https://mainnet.serve.giveth.io/graphql',
  NETWORK_RPC_ADDRESS: 'https://mainnet.base.org',
  privadoConfig: {
    chain: polygonZkEvm,
    contractAddress: '0x',
    requestId: 1,
  },
};

export default config;
