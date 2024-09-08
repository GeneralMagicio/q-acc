import { Address, Chain } from 'viem';

export type EnvConfig = {
  SUPPORTED_CHAINS: readonly [Chain, ...Chain[]];
  GRAPHQL_ENDPOINT: string;
  AUTH_BASE_ROUTE: string;
  SCAN_URL: string;
  GIVETH_GQL_ENDPOINT: string;
  NETWORK_RPC_ADDRESS: string;
  privadoConfig: {
    chain: Chain;
    contractAddress: Address;
    requestId: number;
  };
};
