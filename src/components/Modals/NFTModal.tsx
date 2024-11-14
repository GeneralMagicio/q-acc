import { type FC } from 'react';
import Link from 'next/link';
import Modal, { BaseModalProps } from '../Modal';

interface ConnectModalProps extends BaseModalProps {
  showCloseButton?: boolean;
}

export const NFTModal: FC<ConnectModalProps> = ({ ...props }) => {
  return (
    <Modal {...props} title='Uh-oh!'>
      <div className='flex flex-col gap-5 '>
        <h1 className='text-[#1D1E1F] font-bold text-[25px]'>
          Missing Required NFT
        </h1>
        <p>
          You’re logged in with an address that does not have the early-access
          NFT for this q/acc project. Early access is invite-only, and you need
          to be invited directly by the project team.
        </p>
        <div className=''>
          If you think this is a mistake, please check with the project team or
          you can reach out to us at
          <Link href={`mailto:qacc@giveth.io`}>
            <span className='text-pink-500 font-semibold font-redHatText'>
              {' '}
              qacc@giveth.io{' '}
            </span>
          </Link>
          for support.
        </div>
      </div>
    </Modal>
  );
};
