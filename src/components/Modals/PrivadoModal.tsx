import { useEffect, useState, type FC } from 'react';
import Image from 'next/image';
import Modal, { BaseModalProps } from '../Modal';
import { Button } from '../Button';
import { IconArrowRight } from '../Icons/IconArrowRight';
import { generatePrivadoShortenedUrl } from '@/services/privado.service';

interface PrivadoModalProps extends BaseModalProps {}

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
        const url = await generatePrivadoShortenedUrl();
        if (url) setUrl(url);
      } catch (error) {
        console.error(error);
      } finally {
        setIsPrivadoLoading(false);
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
      <Image
        src='/images/particles/trazado1.png'
        alt='Illustration'
        width={20}
        height={100}
        className='bottom-0 right-1/2 absolute'
      />
      <Image
        src='/images/particles/cominho1.png'
        alt='Illustration'
        width={100}
        height={100}
        className='top-0 right-0 absolute'
      />
      <Image
        src='/images/particles/trazado2.png'
        alt='Illustration'
        width={50}
        height={10}
        className='top-5 left-0 absolute'
      />
      <p className='mt-4 mb-4'>Before proceeding, you should know that:</p>
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
            We encourage you{' '}
            <span className='text-gray-800 font-bold'>
              {' '}
              not to use the Privado mobile app{' '}
            </span>{' '}
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
