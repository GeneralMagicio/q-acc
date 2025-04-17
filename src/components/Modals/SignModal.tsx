import Image from 'next/image';
import Modal, { BaseModalProps } from '../Modal';
import { Button, ButtonColor, ButtonStyle } from '../Button';
import { IconArrowRight } from '../Icons/IconArrowRight';
import { useSignUser } from '@/hooks/useSignUser';
import { IUser } from '@/types/user.type';
import type { FC } from 'react';

interface SignModalProps extends BaseModalProps {
  onSign?: (user: IUser) => void;
}

export const SignModal: FC<SignModalProps> = props => {
  const { refetch, isFetching } = useSignUser(props.onSign, props.onClose);

  return (
    <Modal {...props} className='max-w-xl' closeable={false}>
      <div className='p-10'>
        <h1 className='font-bold text-xl'>Connecting wallet</h1>
        <p className='mt-4 mb-10'>
          Please sign the login message with your wallet to continue.
        </p>
        <Button
          styleType={ButtonStyle.Solid}
          color={ButtonColor.Pink}
          onClick={() => refetch()}
          loading={isFetching}
        >
          <div className='flex items-center gap-1'>
            <span>Authenticate Wallet</span>
            <IconArrowRight size={16} />
          </div>
        </Button>
        <Image
          src='/images/particles/trazado-v-b.svg'
          alt='trazado'
          width={31}
          height={82}
          className='absolute bottom-0 left-3/4'
        />
        <Image
          src='/images/particles/trazado-h-g.svg'
          alt='trazado'
          width={52}
          height={14}
          className='absolute top-6 left-0'
        />
      </div>
    </Modal>
  );
};
