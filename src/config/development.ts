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
} from '@reown/appkit/networks';
import { polygonAmoy as viemPolygonAmoy } from 'wagmi/chains';

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
  ERC_TOKEN_ADDRESS: '0x0000000000000000000000000000000000000000',
  ERC_TOKEN_SYMBOL: 'POL',
  SCAN_URL: 'https://polygonscan.com/',
  WPOL_TOKEN_ADDRESS: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  GRAPHQL_ENDPOINT:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    'https://staging.qacc-be.generalmagic.io/graphql',
  AUTH_BASE_ROUTE:
    process.env.NEXT_PUBLIC_AUTH_BASE_ROUTE ||
    'https://auth.serve.giveth.io/v1',
  GIVETH_GQL_ENDPOINT: 'https://impact-graph.serve.giveth.io/graphql',
  INDEXER_GRAPHQL_URL: 'https://dev.indexer.inverter.network/v1/graphql',
  privadoConfig: {
    chain: viemPolygonAmoy,
    chainName: 'amoy',
    contractAddress: '0xfcc86A79fCb057A8e55C6B853dff9479C3cf607c',
    allowedIssuers: [
      'did:iden3:privado:main:2SfreFymXBFkp8GqF8DXegUHVrEYNdsqgmkZ9YjbKs',
    ],
    requestId: 11,
    webWalletBaseUrl: 'https://wallet-dev.privado.id',
    verifierDid:
      'did:iden3:polygon:amoy:x6x5sor7zpyefHwZu9RE4xiuRWBkq9xAEHxrKbKWb',
    method: PrivadoContractMethodV2,
  },
  GP_ANALYSIS_SCORE_THRESHOLD: 50,
  GP_SCORER_SCORE_THRESHOLD: 15,
  MINIMUM_DONATION_AMOUNT: 1,
  MATCHING_FUND_ADDRESS: [],
  SQUID_INTEGRATOR_ID: 'test-project-4ba94915-f432-4d42-89df-53c6de4dd93e',
  PROXY_CONTRACT_ADDRESS:
    process.env.PROXY_CONTRACT_ADDRESS ||
    '0xf8EFA36A3C6F1233a4144F5fcA614a28b1fBADEC',
  BONDING_CURVE_COLLATERAL_TOKEN:
    process.env.BONDING_CURVE_COLLATERAL_TOKEN ||
    '0x806B448d6C5b507727AD715425B744f038E475bc', // test WMATIC
};

export default config;
