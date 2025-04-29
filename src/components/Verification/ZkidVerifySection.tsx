import React, { useState } from 'react';
import { Button, ButtonColor, ButtonStyle } from '@/components/Button';
import { IconArrowRight } from '@/components/Icons/IconArrowRight';
import { usePrivado } from '@/hooks/usePrivado';
import { PrivadoModal } from '@/components/Modals/PrivadoModal';
import {
  EligibilityBadge,
  EligibilityBadgeStatus,
} from '@/components/EligibilityBadge';
import { useFetchAllRound } from '@/hooks/useFetchAllRound';
import { IQfRound } from '@/types/round.type';
import { usePrivadoUrl } from '@/hooks/usePrivadoUrl';

export const ZkidVerifySection = () => {
  const [showPrivadoModal, setShowPrivadoModal] = useState(false);
  const { isVerified, error, isLoading } = usePrivado();

  const { data: allRounds } = useFetchAllRound();
  const { url, isLoading: isPrivadoLoading } = usePrivadoUrl();

  const qaccRound: IQfRound | undefined = allRounds?.filter(
    round => round.__typename === 'QfRound',
  )[0];

  let high_cap;

  if (qaccRound) {
    if ('roundPOLCapPerUserPerProject' in qaccRound) {
      high_cap = qaccRound?.roundPOLCapPerUserPerProject || 15000;
    }
  }

  return isVerified ? (
    <section className='bg-gray-50 rounded-2xl p-6 flex gap-4 justify-between'>
      <div>
        <h1 className='text-lg font-bold'>Privado zkID</h1>
        <p>
          Your verification allows you to spend up to approximately $25,000.
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
        This verification would allow you to spend up to approximately $25,000.
      </p>
      {/* <Button
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
      </Button> */}

      <Button
        styleType={ButtonStyle.Solid}
        color={ButtonColor.Base}
        loading={isPrivadoLoading}
        className='mr-auto px-16 shadow-baseShadow'
        disabled={isPrivadoLoading || !url}
        onClick={() => {
          // Open the Wallet URL to start the verification process
          url && window.open(url, '_blank');
        }}
      >
        Go to Privado ID
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
