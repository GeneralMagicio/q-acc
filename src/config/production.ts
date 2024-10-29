import { polygonZkEvm } from '@reown/appkit/networks';
import { polygonZkEvm as viemPolygonZkEvm } from 'wagmi/chains';

import { EnvConfig } from '@/types/config.type';
import { PrivadoContractMethodV2 } from '@/lib/constants/privado';

const config: EnvConfig = {
  SUPPORTED_CHAINS: [polygonZkEvm] as const,
  SCAN_URL: 'https://zkevm.polygonscan.com/',
  ERC_TOKEN_ADDRESS: '0x9Cc1c42e4525ba4116d7948741ccA9C7446596b2',
  ERC_TOKEN_SYMBOL: 'POL',
  GRAPHQL_ENDPOINT:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    'https://qacc-be.generalmagic.io/graphql',
  AUTH_BASE_ROUTE:
    process.env.NEXT_PUBLIC_AUTH_BASE_ROUTE || 'https://auth.giveth.io/v1',
  GIVETH_GQL_ENDPOINT: 'https://mainnet.serve.giveth.io/graphql',
  NETWORK_RPC_ADDRESS: 'https://zkevm-rpc.com',
  INDEXER_GRAPHQL_URL: 'https://indexer.bigdevenergy.link/a414bf3/v1/graphql',
  privadoConfig: {
    chain: viemPolygonZkEvm,
    chainName: 'zkevm',
    contractAddress: '0xfcc86A79fCb057A8e55C6B853dff9479C3cf607c',
    allowedIssuers: [
      'did:iden3:privado:main:2ScrbEuw9jLXMapW3DELXBbDco5EURzJZRN1tYj7L7',
    ],
    requestId: 12,
    webWalletBaseUrl: 'https://wallet-quadratic.privado.id',
    verifierDid:
      'did:iden3:polygon:amoy:x6x5sor7zpyefHwZu9RE4xiuRWBkq9xAEHxrKbKWb',
    method: PrivadoContractMethodV2,
  },
};

export default config;
