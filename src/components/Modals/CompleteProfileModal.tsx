import { type FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Modal, { BaseModalProps } from '../Modal';
import { Button, ButtonColor, ButtonStyle } from '../Button';
import { IconArrowRight } from '../Icons/IconArrowRight';
import Routes from '@/lib/constants/Routes';
import { useIsUserWhiteListed } from '@/hooks/useIsUserWhiteListed';

interface CompleteProfileModalProps extends BaseModalProps {}

export const CompleteProfileModal: FC<CompleteProfileModalProps> = props => {
  const { data: userWhitelisted } = useIsUserWhiteListed();

  const modalTitle = userWhitelisted
    ? 'Before you continue'
    : 'Before you contribute';

  return (
    <Modal {...props}>
      <div className='p-10'>
        <h1 className='font-bold text-xl'>{modalTitle}</h1>
        <p className='mt-4 mb-10'>Set up your public profile to get started.</p>
        <Link href={Routes.CreateProfile}>
          <Button
            styleType={ButtonStyle.Solid}
            color={ButtonColor.Pink}
            onClick={() => props.onClose()}
          >
            <div className='flex items-center gap-1'>
              <span>Complete Profile</span>
              <IconArrowRight size={16} />
            </div>
          </Button>
        </Link>
        <Image
          src='/images/particles/arc-p.svg'
          alt='arc'
          width={171}
          height={188}
          className='absolute top-0 right-0'
        />
        <Image
          src='/images/particles/trazado-v-b.svg'
          alt='trazado'
          width={31}
          height={82}
          className='absolute bottom-0 right-1/2'
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
