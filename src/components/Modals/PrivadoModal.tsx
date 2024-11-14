import { useEffect, useState, type FC } from 'react';
import Image from 'next/image';
import Modal, { BaseModalProps } from '../Modal';
import { Button } from '../Button';
import { IconArrowRight } from '../Icons/IconArrowRight';
import { generatePrivadoShortenedUrl } from '@/services/privado.service';
import { PrivadoHoldUp } from '../PrivadoHoldUp';

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
        className='top-0 right-0 absolute z-0'
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
        <PrivadoHoldUp />
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
