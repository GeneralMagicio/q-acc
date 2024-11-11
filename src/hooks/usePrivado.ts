import { createPublicClient, http } from 'viem';
import { useAccount } from 'wagmi';
import { useQuery } from '@tanstack/react-query';
import config from '@/config/configuration';
import { requestGraphQL } from '@/helpers/request';
import { CHECK_USER_PRIVADO_VERIFIED_STATE } from '@/queries/project.query';
import { useFetchUser } from './useFetchUser';
import { KYC_EXCLUDED_COUNTRIES } from '@/lib/constants/privado';

const {
  chain,
  contractAddress,
  requestId,
  chainName,
  allowedIssuers,
  webWalletBaseUrl,
  verifierDid,
} = config.privadoConfig;

export const usePrivadoChainStatus = ({ disable }: { disable: boolean }) => {
  const { address } = useAccount();
  const publicClient = createPublicClient({
    chain: chain,
    transport: http(),
  });
  return useQuery({
    queryKey: ['isPrivadoVerified', address],
    enabled: !disable && !!address,
    queryFn: async () => {
      console.log('get privado state onchain');
      const abi = [
        {
          inputs: [
            { internalType: 'address', name: 'sender', type: 'address' },
            { internalType: 'uint64', name: 'requestId', type: 'uint64' },
          ],
          name: 'isProofVerified',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'view',
          type: 'function',
        },
      ];

      return await publicClient.readContract({
        address: contractAddress,
        abi,
        functionName: 'isProofVerified',
        args: [address, requestId],
      });
    },
    staleTime: 10 * 1000, // Refetch every 10 seconds
  });
};

// Triggers backend to check the user's privado status
export const useTriggerUserPrivadoStatusCheck = ({
  trigger,
}: {
  trigger: boolean;
}) => {
  const { address } = useAccount();
  return useQuery({
    gcTime: Infinity,
    enabled: trigger && !!address,
    queryKey: ['triggerUserPrivadoStatusCheck', address],
    queryFn: async () => {
      if (!address) return;
      console.log('calling checkUserPrivadoVerifiedState for user:', address);
      const res = await requestGraphQL<{
        checkUserPrivadoVerifiedState: boolean;
      }>(
        CHECK_USER_PRIVADO_VERIFIED_STATE,
        {},
        {
          auth: true,
        },
      );
      return { [address]: res?.checkUserPrivadoVerifiedState };
    },
  });
};

const verifyAccount = () => {
  // Define the verification request
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const excludedCountryCodes = Object.values(KYC_EXCLUDED_COUNTRIES).sort(
    (a, b) => a - b,
  );
  const verificationRequest = {
    logoUrl: `${baseUrl}/images/icons/logomark-dark.svg`,
    name: 'QAcc',
    zkQueries: [
      {
        circuitId: 'credentialAtomicQueryV3OnChain-beta.1',
        id: config.privadoConfig.requestId,
        query: {
          allowedIssuers: allowedIssuers,
          context:
            'https://raw.githubusercontent.com/anima-protocol/claims-polygonid/main/schemas/json-ld/poi-v2.json-ld',
          type: 'AnimaProofOfIdentity',
          credentialSubject: {
            document_country_code: {
              $nin: excludedCountryCodes,
            },
          },
        },
        params: {
          nullifierSessionId: config.privadoConfig.requestId.toString(),
        },
      },
    ],
    verifierDid,
    transactionData: {
      contractAddress,
      functionName: config.privadoConfig.method.functionName,
      methodId: config.privadoConfig.method.methodId,
      chainId: chain.id,
      network: chainName,
    },
  };

  const request = {
    from: 'did:iden3:privado:main:2SdUfDwHK3koyaH5WzhvPhpcjFfdem2xD625aymTNh',
    id: '0d02b9e1-0113-422f-b91b-02618a178bfc',
    thid: '0d02b9e1-0113-422f-b91b-02618a178bfc',
    typ: 'application/iden3comm-plain-json',
    type: 'https://iden3-communication.io/authorization/1.0/request',
    body: {
      callbackUrl: 'https://my-app.org/api/callback',
      reason: 'demo flow',
      scope: [
        {
          circuitId: 'credentialAtomicQuerySigV2',
          id: 1,
          query: {
            allowedIssuers: [
              'did:iden3:privado:main:2SdUfDwHK3koyaH5WzhvPhpcjFfdem2xD625aymTNc',
            ],
            context:
              'https://raw.githubusercontent.com/anima-protocol/claims-polygonid/main/schemas/json-ld/pol-v1.json-ld',
            type: 'AnimaProofOfLife',
            credentialSubject: {
              human: {
                $eq: true,
              },
            },
          },
        },
      ],
    },
  };

  console.log('verificationRequest', verificationRequest);

  // Define the URLs for redirection
  const backUrl = encodeURIComponent(`${baseUrl}/create/verify-privado`);
  const finishUrl = encodeURIComponent(`${baseUrl}/create/verify-privado`);

  // Base64 encode the verification request
  const base64EncodedRequest = btoa(JSON.stringify(request));

  // Configure the Wallet URL (universal link)
  const walletUrlWithMessage = `https://wallet.privado.id/#i_m=${base64EncodedRequest}&back_url=${backUrl}&finish_url=${finishUrl}`;

  // Open the Wallet URL to start the verification process
  window.open(walletUrlWithMessage);
};
export const usePrivado = () => {
  const userFetch = useFetchUser();

  const privadaoChainStatus = usePrivadoChainStatus({
    disable: userFetch.isPending || !!userFetch.data?.privadoVerified,
  });

  useTriggerUserPrivadoStatusCheck({
    trigger:
      userFetch.data?.privadoVerified === false &&
      privadaoChainStatus.data === true,
  });
  const error = privadaoChainStatus.error || userFetch.error;
  const isVerified =
    userFetch.data?.privadoVerified || (privadaoChainStatus.data as boolean);

  const isLoading = privadaoChainStatus.isLoading || userFetch.isPending;
  return { isVerified, isLoading, error, verifyAccount };
};
