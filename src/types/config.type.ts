import { Address, Chain as viemChain } from 'viem';
import { Chain } from '@reown/appkit/networks';
import {
  PrivadoContractMethodV1,
  PrivadoContractMethodV2,
} from '@/lib/constants/privado';

export type EnvConfig = {
  SUPPORTED_CHAINS: [Chain, ...Chain[]];
  ERC_TOKEN_ADDRESS: string;
  ERC_TOKEN_SYMBOL: string;
  WPOL_TOKEN_ADDRESS: string;
  GRAPHQL_ENDPOINT: string;
  AUTH_BASE_ROUTE: string;
  SCAN_URL: string;
  GIVETH_GQL_ENDPOINT: string;
  INDEXER_GRAPHQL_URL: string;
  privadoConfig: {
    chain: viemChain;
    chainName: string;
    contractAddress: Address;
    requestId: number;
    allowedIssuers: string[];
    webWalletBaseUrl: string;
    verifierDid: string;
    method: typeof PrivadoContractMethodV1 | typeof PrivadoContractMethodV2;
  };
  GP_ANALYSIS_SCORE_THRESHOLD: number;
  GP_SCORER_SCORE_THRESHOLD: number;
  MINIMUM_DONATION_AMOUNT: number;
  MATCHING_FUND_ADDRESS: string[];
  SQUID_INTEGRATOR_ID: string;
  PROXY_CONTRACT_ADDRESS: string;
};
