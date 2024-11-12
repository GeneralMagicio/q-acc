import { polygonZkEvm, polygonZkEvmCardona } from 'wagmi/chains';
import { EnvConfig } from '@/types/config.type';
import { PrivadoContractMethodV1 } from '@/lib/constants/privado';

const config: EnvConfig = {
  SUPPORTED_CHAINS: [polygonZkEvm] as const,
  ERC_TOKEN_ADDRESS: '0x961bB3932A7efAa9aDcc7409e1fea090479E8312',
  ERC_TOKEN_SYMBOL: 'TPOL',
  SCAN_URL: 'https://zkevm.polygonscan.com/',
  GRAPHQL_ENDPOINT:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    'https://staging.qacc-be.generalmagic.io/graphql',
  AUTH_BASE_ROUTE:
    process.env.NEXT_PUBLIC_AUTH_BASE_ROUTE ||
    'https://auth.serve.giveth.io/v1',
  GIVETH_GQL_ENDPOINT: 'https://impact-graph.serve.giveth.io/graphql',
  NETWORK_RPC_ADDRESS: 'https://zkevm-rpc.com	',
  INDEXER_GRAPHQL_URL: 'https://indexer.bigdevenergy.link/a414bf3/v1/graphql',
  privadoConfig: {
    chain: polygonZkEvmCardona,
    chainName: 'zkevm_cardona',
    allowedIssuers: [
      'did:iden3:privado:main:2SdUfDwHK3koyaH5WzhvPhpcjFfdem2xD625aymTNc',
    ],
    contractAddress: '0xdE9eBC446d69EF9a876a377e3E3cEe91d08fE2A0',
    requestId: 34,
    webWalletBaseUrl: 'https://wallet-dev.privado.id',
    verifierDid:
      'did:iden3:polygon:amoy:x6x5sor7zpyWUUVJNZLzuDgMmeZfR2thKN2uMui8J',
    method: PrivadoContractMethodV1,
  },
};

export default config;
