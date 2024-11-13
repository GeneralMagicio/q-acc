import { type FC } from 'react';
import Modal, { BaseModalProps } from '../Modal';
import { usePrivado } from '@/hooks/usePrivado';
import { Button } from '../Button';
import { IconInfo } from '../Icons/IconInfo';

interface ConnectModalProps extends BaseModalProps {
  showCloseButton?: boolean;
}

export const PrivadoVerificationModal: FC<ConnectModalProps> = ({
  ...props
}) => {
  const { verifyAccount, isLoading, isPrivadoLoading } = usePrivado();

  return (
    <Modal {...props} title='Account Verication'>
      <div className='flex flex-col gap-5 '>
        <p>
          All project owners and donors are required to verify their identity
          with our identity solution provider, Privado. You only need to do it
          once, and it shouldn't take long.
        </p>
        <div className='flex flex-col gap-10 lg:flex-row justify-between '>
          <div
            className={`flex p-4 border w-full rounded-lg gap-4 bg-[#F6F3FF] border-[#8668FC] items-center`}
          >
            <IconInfo size={17} color='#8668FC' />
            <span className='text-[#8668FC] font-redHatText text-sm'>
              Identity credentials are required.
            </span>
          </div>
        </div>
        <div className='font-redHatText flex justify-center'>
          <Button
            type='button'
            loading={isLoading || isPrivadoLoading}
            onClick={verifyAccount}
            className='p-4 rounded-full shadow-baseShadow text-sm font-bold w-[200px] justify-center'
          >
            {isLoading ? 'Loading' : <>Go to Privado ID</>}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
