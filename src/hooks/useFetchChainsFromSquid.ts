import { useQuery } from '@tanstack/react-query';
import config from '@/config/configuration';

const headers = {
  'x-integrator-id': config.SQUID_INTEGRATOR_ID,
};

export interface ISquidChain {
  id: string;
  chainId: string;
  networkIdentifier: string;
  chainName: string;
  axelarChainName: string;
  type: string;
  networkName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
    icon: string;
  };
  chainIconURI: string;
  blockExplorerUrls: string[];
  swapAmountForGas: string;
  sameChainSwapsSupported: boolean;
  squidContracts: {
    squidRouter: string;
    defaultCrosschainToken: string;
    squidMulticall: string;
    squidFeeCollector: string;
  };
  compliance: {
    trmIdentifier: string;
  };
  boostSupported: boolean;
  enableBoostByDefault: boolean;
  bridges: {
    axelar: {
      gateway: string;
      itsService: string;
      gasService: string;
    };
    cctp: {
      cctpDomain: string;
      tokenMessenger: string;
      messageTransmitter: string;
    };
    chainflip: {
      vault: string;
    };
    immutable: {
      bridgeProxy: string;
      adaptorProxy: string;
    };
  };
  rpcList: string[];
  axelarFeeMultiplier: number;
  visible: boolean;
  chainNativeContracts: {
    wrappedNativeToken: string;
    ensRegistry: string;
    multicall: string;
    usdcToken: string;
  };
  feeCurrencies: any[];
  currencies: any[];
  features: any[];
  enabled: boolean;
  rpc: string;
  chainType: string;
}
interface ISquidChainResponse {
  chains: ISquidChain[];
}

export const useFetchChainsFromSquid = () => {
  return useQuery({
    queryKey: ['activeRoundDetails'],
    queryFn: async () => {
      const chainsResponse = await fetch(
        'https://apiplus.squidrouter.com/v2/chains',
        {
          headers: headers,
        },
      );

      return (await chainsResponse.json()) as ISquidChainResponse;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
