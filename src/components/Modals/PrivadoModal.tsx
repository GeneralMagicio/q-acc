import { useState, type FC } from 'react';
import Image from 'next/image';
import Modal, { BaseModalProps } from '../Modal';
import { Button } from '../Button';
import { IconArrowRight } from '../Icons/IconArrowRight';
import { PrivadoHoldUp } from '../PrivadoHoldUp';
import { usePrivadoUrl } from '@/hooks/usePrivadoUrl';

interface PrivadoModalProps extends BaseModalProps {}

export const PrivadoModal: FC<PrivadoModalProps> = props => {
  const { url, isLoading: isPrivadoLoading } = usePrivadoUrl();
  const [understood, setUnderstood] = useState(false);

  const handleUnderstood = (_event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = _event.target.checked;
    setUnderstood(isChecked);
  };

  return (
    <Modal
      {...props}
      title='🛂 Hold Up!'
      showCloseButton
      className='md:max-w-3xl pb-24 md:pb-6'
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
      <p className='mb-4'>Before proceeding, you should know that:</p>
      <div className=''>
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
