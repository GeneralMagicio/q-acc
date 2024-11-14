import { useEffect, useState, type FC } from 'react';
// eslint-disable-next-line import/named
import { v4 as uuidv4 } from 'uuid';
import Modal, { BaseModalProps } from '../Modal';
import { Button } from '../Button';
import { IconArrowRight } from '../Icons/IconArrowRight';
// eslint-disable-next-line import/named
import config from '@/config/configuration';
import { KYC_EXCLUDED_COUNTRIES } from '@/lib/constants/privado';
import { generatePrivadoUuid } from '@/app/actions/generate-privado-uuid';
interface PrivadoModalProps extends BaseModalProps {}

const {
  chain,
  contractAddress,
  chainName,
  allowedIssuers,
  webWalletBaseUrl,
  verifierDid,
} = config.privadoConfig;

export const PrivadoModal: FC<PrivadoModalProps> = props => {
  const [isPrivadoLoading, setIsPrivadoLoading] = useState(false);
  const [understood, setUnderstood] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  const handleUnderstood = (_event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = _event.target.checked;
    setUnderstood(isChecked);
  };

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        setIsPrivadoLoading(true);
        // Define the verification request
        const baseUrl =
          typeof window !== 'undefined' ? window.location.origin : '';
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
        const finishUrl = encodeURIComponent(
          `${baseUrl}/create/verify-privado`,
        );

        // Configure the Wallet URL (universal link)
        const walletUrlWithMessage = `${webWalletBaseUrl}/#request_uri=${shortenedUrl}&back_url=${backUrl}&finish_url=${finishUrl}`;
        setIsPrivadoLoading(false);

        console.log('walletUrlWithMessage', walletUrlWithMessage);

        setUrl(walletUrlWithMessage);
      } catch (error) {
        setIsPrivadoLoading(false);
        console.error('Error in verifyAccount:', error);
      }
    };
    verifyAccount();
  }, []);

  return (
    <Modal
      {...props}
      title='🛂 Hold Up!'
      showCloseButton
      className='max-w-2xl mt-12'
    >
      <p className='mt-4 mb-4'>
        Before proceeding, make sure you’ve read and understand the following:
      </p>
      <div className='max-h-[100vh] md:max-h-[50vh] overflow-y-auto'>
        <ul className='flex flex-col gap-4 list-disc px-10'>
          <li>
            The q/acc protocol prohibits persons from the{' '}
            <span className='text-gray-800 font-bold'>
              United States and the United Kingdom
            </span>{' '}
            from participating due to regulatory restrictions.
          </li>
          <li>
            Additionally, to comply with AML requirements, the q/acc protocol
            restricts participation from individuals in the following countries:
            <span className='text-gray-800 font-bold'>
              Afghanistan, American Samoa, Anguilla, Antigua and Barbuda,
              Belarus, Bosnia Herzegovina, Central African Republic, Cuba, DR
              Congo, Ethiopia, Fiji, Guam, Hong Kong, Iran, Iraq, Kosovo,
              Lebanon, Libya, Mali, Montenegro, Myanmar, Nicaragua, North Korea,
              North Macedonia, Palau, Panama, Russia, Samoa, Serbia, Somalia,
              South Sudan, Sudan, Syria, Ukraine, US Virgin Islands, Vanuatu,
              Venezuela, Yemen. 
            </span>{' '}
          </li>
          <li>
            These are the four document types accepted:{' '}
            <span className='text-gray-800 font-bold'>
              Passport, National ID, Driver’s License, or Resident Permit
            </span>
            . Documents must include your date of birth or verification will
            fail. Have your document ready!
          </li>
          <li>
            <span className='text-gray-800 font-bold'>
              We strongly encourage you to use MetaMask at this time.
            </span>{' '}
            We have had issues reported from those using WalletConnect. 
          </li>
          <li>
            We encourage you not to use the{' '}
            <span className='text-gray-800 font-bold'>Privado mobile app</span>{' '}
            at this time. You will see an option to  “Continue via app” during
            verification. Do not select that.
          </li>
        </ul>
      </div>
      <div className='flex gap-2 my-6'>
        <input
          type='checkbox'
          checked={understood}
          name='understood'
          id='understood'
          onChange={event => handleUnderstood(event)}
        />
        <label htmlFor='understood'>I’ve read and understood the above.</label>
      </div>
      <div>
        <Button
          type='button'
          loading={isPrivadoLoading}
          className='p-4 rounded-full shadow-baseShadow text-sm font-bold min-w-[200px] justify-center'
          disabled={!understood || isPrivadoLoading || !url}
          onClick={() => {
            // Open the Wallet URL to start the verification process
            url && window.open(url, '_blank');
          }}
        >
          Go to Privado ID
          <IconArrowRight size={16} />
        </Button>
      </div>
    </Modal>
  );
};
