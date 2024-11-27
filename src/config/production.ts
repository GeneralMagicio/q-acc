import { polygonZkEvm } from 'wagmi/chains';

import { EnvConfig } from '@/types/config.type';
import { PrivadoContractMethodV2 } from '@/lib/constants/privado';

const config: EnvConfig = {
  SUPPORTED_CHAINS: [polygonZkEvm] as const,
  SCAN_URL: 'https://zkevm.polygonscan.com/',
  ERC_TOKEN_ADDRESS: '0x22B21BedDef74FE62F031D2c5c8F7a9F8a4b304D',
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
    chain: polygonZkEvm,
    chainName: 'zkevm',
    contractAddress: '0xfcc86A79fCb057A8e55C6B853dff9479C3cf607c',
    allowedIssuers: [
      'did:iden3:privado:main:2ScrbEuw9jLXMapW3DELXBbDco5EURzJZRN1tYj7L7',
    ],
    requestId: 12,
    webWalletBaseUrl: 'https://wallet.privado.id',
    verifierDid:
      'did:iden3:polygon:amoy:x6x5sor7zpyefHwZu9RE4xiuRWBkq9xAEHxrKbKWb',
    method: PrivadoContractMethodV2,
  },
  GP_ANALYSIS_SCORE_THRESHOLD: 50,
  GP_SCORER_SCORE_THRESHOLD: 15,
};

export default config;
