import { polygonZkEvmCardona } from 'wagmi/chains';
import { EnvConfig } from '@/types/config.type';

const config: EnvConfig = {
  SUPPORTED_CHAINS: [polygonZkEvmCardona] as const,
  SCAN_URL: 'https://cardona-zkevm.polygonscan.com/',
  GRAPHQL_ENDPOINT:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    'https://staging.qacc-be.generalmagic.io/graphql',
  AUTH_BASE_ROUTE:
    process.env.NEXT_PUBLIC_AUTH_BASE_ROUTE ||
    'https://auth.serve.giveth.io/v1',
  GIVETH_GQL_ENDPOINT: 'https://impact-graph.serve.giveth.io/graphql',
  NETWORK_RPC_ADDRESS: 'https://rpc.ankr.com/polygon_zkevm_cardona',
  privadoConfig: {
    chain: polygonZkEvmCardona,
    contractAddress: '0xdE9eBC446d69EF9a876a377e3E3cEe91d08fE2A0',
    requestId: 33,
  },
};

export default config;
