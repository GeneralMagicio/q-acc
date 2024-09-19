import { baseSepolia, polygonZkEvmCardona } from 'wagmi/chains';
import { EnvConfig } from '@/types/config.type';

const config: EnvConfig = {
  SUPPORTED_CHAINS: [baseSepolia] as const,
  ERC_TOKEN_ADDRESS: '0x065775C7aB4E60ad1776A30DCfB15325d231Ce4F',
  ERC_TOKEN_SYMBOL: 'iUSD',
  SCAN_URL: 'https://sepolia.basescan.org',
  GRAPHQL_ENDPOINT:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    'https://staging.qacc-be.generalmagic.io/graphql',
  AUTH_BASE_ROUTE:
    process.env.NEXT_PUBLIC_AUTH_BASE_ROUTE ||
    'https://auth.serve.giveth.io/v1',
  GIVETH_GQL_ENDPOINT: 'https://impact-graph.serve.giveth.io/graphql',
  NETWORK_RPC_ADDRESS: 'https://sepolia.base.org',
  privadoConfig: {
    chain: polygonZkEvmCardona,
    contractAddress: '0xdE9eBC446d69EF9a876a377e3E3cEe91d08fE2A0',
    requestId: 34,
  },
};

export default config;
