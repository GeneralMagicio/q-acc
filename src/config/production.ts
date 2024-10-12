import { polygonZkEvm } from 'wagmi/chains';
import { EnvConfig } from '@/types/config.type';

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
  privadoConfig: {
    chain: polygonZkEvm,
    chainName: 'zkevm',
    contractAddress: '0xB752Eec418f178ac8B48f15962B55c37F8D4748d',
    allowedIssuers: [
      'did:iden3:privado:main:2ScrbEuw9jLXMapW3DELXBbDco5EURzJZRN1tYj7L7',
    ],
    requestId: 10,
    webWalletBaseUrl: 'https://wallet-quadratic.privado.id',
    verifierDid:
      'did:iden3:polygon:amoy:x6x5sor7zpyWUUVJNZLzuDgMmeZfR2thKN2uMui8J',
  },
};

export default config;
