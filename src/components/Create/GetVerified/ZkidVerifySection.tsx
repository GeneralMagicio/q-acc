import React, { useState } from 'react';
import links from '@/lib/constants/links';
import { Button, ButtonColor, ButtonStyle } from '@/components/Button';
import { IconArrowRight } from '@/components/Icons/IconArrowRight';
import { usePrivado } from '@/hooks/usePrivado';
import { PrivadoModal } from '@/components/Modals/PrivadoModal';
import {
  EligibilityBadge,
  EligibilityBadgeStatus,
} from '@/components/EligibilityBadge';

export const ZkidVerifySection = () => {
  const [showPrivadoModal, setShowPrivadoModal] = useState(false);
  const { isVerified, error, isLoading } = usePrivado();
  return isVerified ? (
    <section className='bg-gray-50 rounded-2xl p-6 flex gap-4 justify-between'>
      <h1 className='text-lg font-bold'>Privado zkID</h1>
      <EligibilityBadge status={EligibilityBadgeStatus.ELIGIBLE} />
    </section>
  ) : (
    <section className='bg-gray-50 rounded-2xl p-6 flex flex-col gap-4'>
      <h1 className='text-lg font-bold'>Privado zkID</h1>
      <p>
        Get your credentials and check your status. Read the&nbsp;
        <a
          href={links.PRIVADO_GUIDE_LINK}
          target='_blank'
          className='font-bold text-pink-500'
          referrerPolicy='no-referrer'
        >
          Privado zkID guide
        </a>
        &nbsp;first.
      </p>
      <Button
        styleType={ButtonStyle.Solid}
        color={ButtonColor.Base}
        className='mr-auto px-16'
        loading={isLoading}
        onClick={() => {
          setShowPrivadoModal(true);
        }}
      >
        {!!error ? 'retry' : 'Go to Privado'}
        <IconArrowRight size={16} />
      </Button>
      {showPrivadoModal && (
        <PrivadoModal
          isOpen={showPrivadoModal}
          onClose={() => {
            setShowPrivadoModal(false);
          }}
        />
      )}
    </section>
  );
};
