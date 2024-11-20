import { type FC } from 'react';
import Image from 'next/image';
import Modal, { BaseModalProps } from '../Modal';

interface RestrictModalProps extends BaseModalProps {}

export const RestrictModal: FC<RestrictModalProps> = props => {
  return (
    <Modal {...props} title='🛂 Access Restricted' closeable={false}>
      <div className=' '>
        <p className='mt-4 mb-10'>
          Access to this website is not available in your region.
        </p>
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
          width={60}
          height={20}
          className='top-2 left-0 absolute'
        />
        <Image
          src='/images/particles/trazado1.png'
          alt='Illustration'
          width={35}
          height={100}
          className='bottom-0 right-2 absolute'
        />
      </div>
    </Modal>
  );
};
