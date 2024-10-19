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
  GRAPHQL_ENDPOINT: string;
  AUTH_BASE_ROUTE: string;
  SCAN_URL: string;
  GIVETH_GQL_ENDPOINT: string;
  NETWORK_RPC_ADDRESS: string;
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
};
