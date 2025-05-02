import { type FC } from 'react';
import Link from 'next/link';
import Modal, { BaseModalProps } from '../Modal';

import { IconTelegram } from '../Icons/IconTelegram';
import { removeHttpsAndWwwFromUrl } from '../ProjectDetail/ProjectSocials';
import { IconEmail } from '../Icons/IconEmail';

interface SupportModal extends BaseModalProps {}

export const SupportModal: FC<SupportModal> = props => {
  return (
    <Modal {...props} title='Support' showCloseButton>
      <div className=''>
        {/* <p className='mt-4 mb-10 text-xl'>
          The amount you want to submit requires Privado zkID credentials.
        </p> */}
        <div className='flex gap-4 justify-center'>
          <div
            className={`flex px-6 py-4 items-center gap-2 rounded-full  bg-white shadow-tabShadow  font-redHatText font-medium `}
            style={{ color: '#FF5700' }}
          >
            <IconEmail color={'#FF5700'} size={16} />
            <Link href={'mailto:info@qacc.xyz'} target='_blank'>
              {removeHttpsAndWwwFromUrl('info@qacc.xyz')}
            </Link>
          </div>

          <div
            className={`flex px-6 py-4 items-center gap-2 rounded-full  bg-white shadow-tabShadow  font-redHatText font-medium `}
            style={{ color: '#229ED9' }}
          >
            <IconTelegram color={'#229ED9'} size={16} />
            <Link href={'https://t.me/qaccsupport'} target='_blank'>
              {removeHttpsAndWwwFromUrl('https://t.me/qaccsupport')}
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};
