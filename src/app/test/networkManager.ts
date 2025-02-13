import {
  base,
  polygonZkEvm,
  polygonZkEvmCardona,
  baseSepolia,
  polygon,
  arbitrumSepolia,
  optimismSepolia,
  sepolia,
} from 'wagmi/chains';

const MAINNET_NETWORK_NUMBER = sepolia.id; // sepolia
const POLYGON_NETWORK_NUMBER = polygon.id;
const OPTIMISM_NETWORK_NUMBER = optimismSepolia.id;
const ARBITRUM_NETWORK_NUMBER = arbitrumSepolia.id;
const BASE_NETWORK_NUMBER = baseSepolia.id;
const ZKEVM_NETWORK_NUMBER = polygonZkEvmCardona.id;
