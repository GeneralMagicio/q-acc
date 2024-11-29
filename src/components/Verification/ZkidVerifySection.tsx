import React, { useState } from 'react';
import { Button, ButtonColor, ButtonStyle } from '@/components/Button';
import { IconArrowRight } from '@/components/Icons/IconArrowRight';
import { usePrivado } from '@/hooks/usePrivado';
import { PrivadoModal } from '@/components/Modals/PrivadoModal';
import {
  EligibilityBadge,
  EligibilityBadgeStatus,
} from '@/components/EligibilityBadge';
import config from '@/config/configuration';

export const ZkidVerifySection = () => {
  const [showPrivadoModal, setShowPrivadoModal] = useState(false);
  const { isVerified, error, isLoading } = usePrivado();
  return isVerified ? (
    <section className='bg-gray-50 rounded-2xl p-6 flex gap-4 justify-between'>
      <div>
        <h1 className='text-lg font-bold'>Privado zkID</h1>
        <p>
          You are eligible to support each project with up to{' '}
          {config.HIGH_CAP_TEXT}.
        </p>
      </div>
      <div>
        <EligibilityBadge status={EligibilityBadgeStatus.ELIGIBLE} />
      </div>
    </section>
  ) : (
    <section className='bg-gray-50 rounded-2xl p-6 flex flex-col gap-4'>
      <h1 className='text-lg font-bold'>Privado zkID</h1>
      <p>
        Get your credentials with Privado zkID to support each project with up
        to {config.HIGH_CAP_TEXT}.
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
