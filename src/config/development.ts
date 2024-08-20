import { polygonZkEvmCardona } from "wagmi/chains";

const config = {
  SUPPORTED_CHAINS: [polygonZkEvmCardona] as const,
  GRAPHQL_ENDPOINT:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    "https://impact-graph.serve.giveth.io/graphql",
  AUTH_BASE_ROUTE:
    process.env.NEXT_PUBLIC_AUTH_BASE_ROUTE ||
    "https://auth.serve.giveth.io/v1",
};

export default config;
