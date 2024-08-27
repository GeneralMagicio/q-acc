import { polygonZkEvm } from 'wagmi/chains';

const config = {
	SUPPORTED_CHAINS: [polygonZkEvm] as const,
	GRAPHQL_ENDPOINT:
		process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
		'https://qacc-be.generalmagic.io/graphql',
	AUTH_BASE_ROUTE:
		process.env.NEXT_PUBLIC_AUTH_BASE_ROUTE || 'https://auth.giveth.io/v1',
	GIVETH_GQL_ENDPOINT: 'https://mainnet.serve.giveth.io/graphql',
};

export default config;
