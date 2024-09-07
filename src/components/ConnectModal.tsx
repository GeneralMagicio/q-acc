import { type FC } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import Modal, { BaseModalProps } from './Modal';
import { Button } from './Button';

interface ConnectModalProps extends BaseModalProps {}

export const ConnectModal: FC<ConnectModalProps> = props => {
  const { onClose } = props;
  const { open } = useWeb3Modal();

  return (
    <Modal {...props} title='Please connect your wallet'>
      <div className='flex flex-col gap-10 '>
        <p>You need to connect your wallet to continue!</p>
        <div className='flex justify-end'>
          <Button onClick={() => open()} className='mt-4 shadow-baseShadow'>
            Connect Wallet
          </Button>
        </div>
      </div>
    </Modal>
  );
};
