import {
  arbitrum,
  avalanche,
  base,
  blast,
  celo,
  fantom,
  filecoin,
  fraxtal,
  immutableZkEvm,
  kava,
  linea,
  mainnet,
  mantle,
  moonbeam,
  optimism,
  polygon,
  scroll,
} from 'wagmi/chains';
import { EnvConfig } from '@/types/config.type';
import { PrivadoContractMethodV2 } from '@/lib/constants/privado';

const config: EnvConfig = {
  SUPPORTED_CHAINS: [
    polygon,
    mainnet,
    arbitrum,
    avalanche,
    optimism,
    base,
    linea,
    celo,
    mantle,
    moonbeam,
    fantom,
    scroll,
    kava,
    filecoin,
    blast,
    fraxtal,
    immutableZkEvm,
  ] as const,
  ERC_TOKEN_ADDRESS: '0xc20CAf8deE81059ec0c8E5971b2AF7347eC131f4',
  ERC_TOKEN_SYMBOL: 'TPOL',
  SCAN_URL: 'https://polygonscan.com/',
  GRAPHQL_ENDPOINT:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    'https://staging.qacc-be.generalmagic.io/graphql',
  AUTH_BASE_ROUTE:
    process.env.NEXT_PUBLIC_AUTH_BASE_ROUTE ||
    'https://auth.serve.giveth.io/v1',
  GIVETH_GQL_ENDPOINT: 'https://impact-graph.serve.giveth.io/graphql',
  NETWORK_RPC_ADDRESS: 'https://polygon.llamarpc.com',
  INDEXER_GRAPHQL_URL: 'https://dev.indexer.inverter.network/v1/graphql',
  privadoConfig: {
    chain: polygon,
    chainName: 'polygon',
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
  MINIMUM_DONATION_AMOUNT: 1,
  MATCHING_FUND_ADDRESS: [],
  SQUID_INTEGRATOR_ID: 'test-project-4ba94915-f432-4d42-89df-53c6de4dd93e',
};

export default config;
