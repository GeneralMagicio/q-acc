// eslint-disable-next-line import/named
import { v4 as uuidv4 } from 'uuid';
import config from '@/config/configuration';
import { KYC_EXCLUDED_COUNTRIES } from '@/lib/constants/privado';
import { generatePrivadoUuid } from '@/app/actions/generate-privado-uuid';

const {
  chain,
  contractAddress,
  chainName,
  allowedIssuers,
  webWalletBaseUrl,
  verifierDid,
} = config.privadoConfig;

export const generatePrivadoShortenedUrl = async () => {
  try {
    // Define the verification request
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const excludedCountryCodes = Object.values(KYC_EXCLUDED_COUNTRIES).sort(
      (a, b) => a - b,
    );

    const generatedUuid = uuidv4(); // Generate a unique UUID
    const generatedThreadUuid = uuidv4(); // Generate another UUID for thid

    const verificationRequest = {
      id: generatedUuid,
      typ: 'application/iden3comm-plain-json',
      type: 'https://iden3-communication.io/proofs/1.0/contract-invoke-request',
      thid: generatedThreadUuid,
      from: verifierDid,
      body: {
        scope: [
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
        transaction_data: {
          contract_address: contractAddress,
          method_id: config.privadoConfig.method.methodId,
          chain_id: chain.id,
          network: chainName,
        },
      },
    };

    const shortenedUrlUuid = await generatePrivadoUuid(verificationRequest);
    const shortenedUrl = encodeURIComponent(
      `${baseUrl}/api/link-store?id=${shortenedUrlUuid}`,
    );

    console.log('verificationRequest', verificationRequest);

    // Define the URLs for redirection
    const backUrl = encodeURIComponent(`${baseUrl}/create/verify-privado`);
    const finishUrl = encodeURIComponent(`${baseUrl}/create/verify-privado`);

    // Configure the Wallet URL (universal link)
    const walletUrlWithMessage = `${webWalletBaseUrl}/#request_uri=${shortenedUrl}&back_url=${backUrl}&finish_url=${finishUrl}`;
    console.log('walletUrlWithMessage', walletUrlWithMessage);
    return walletUrlWithMessage;
  } catch (error) {
    console.error('Error in verifyAccount:', error);
  }
};
